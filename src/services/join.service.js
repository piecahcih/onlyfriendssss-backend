import { prisma } from "../lib/prisma.js";
import { sendNotification } from "../socket/noti.handler.js";
import { createNoti } from "./notification.service.js";


export async function requestToJoin(io, userId, activityId) {
  const activity = await prisma.activity.findUnique({
    where: { id: Number(activityId) },
    include: {
      host: { select: { id: true, username: true } },
      _count: {
        select: {
          joinRequests: { where: { status: 'APPROVED' } }
        }
      }
    }
  });

  if (!activity) throw new Error("Activity not found");

  // 1. ห้ามเจ้าของกิจกรรมกดเข้าร่วมกิจกรรมตัวเอง
  if (activity.hostId === userId) {
    throw new Error("You are the host of this activity");
  }

  // 2. ตรวจสอบสถานะกิจกรรม
  if (activity.status === 'CANCELLED' || activity.status === 'FINISHED') {
    throw new Error("This activity is no longer available");
  }

  // 3. ตรวจสอบว่ากิจกรรมเริ่มไปแล้วหรือยัง
  if (new Date(activity.eventStartTime) < new Date()) {
    throw new Error("This activity has already started or passed");
  }

  // 4. ตรวจสอบจำนวนคนเต็ม
  if (activity.maxParticipants && activity._count.joinRequests >= activity.maxParticipants) {
    throw new Error("This activity is already full");
  }

  // 5. ตรวจสอบว่าเคยขอเข้าร่วมไปแล้วหรือยัง
  const existingRequest = await prisma.joinRequest.findUnique({
    where: { userId_activityId: { userId, activityId: Number(activityId) } }
  });

  if (existingRequest) {
    if (existingRequest.status === 'APPROVED') throw new Error("You are already a participant");
    if (existingRequest.status === 'PENDING') throw new Error("Your request is still pending");
    // หากเคยโดนปฏิเสธหรือยกเลิกไปแล้ว ให้ลบของเก่าออกเพื่อสร้างใหม่
    await prisma.joinRequest.delete({ where: { id: existingRequest.id } });
  }

  // 6. ตรวจสอบเวลาทับซ้อน (Time Overlap) + Buffer 30 นาที
  const BUFFER_MS = 30 * 60 * 1000; // 30 mins
  const DEFAULT_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours

  const newStart = new Date(activity.eventStartTime).getTime();
  const newEnd = activity.eventEndTime 
    ? new Date(activity.eventEndTime).getTime() 
    : newStart + DEFAULT_DURATION_MS;

  // ดึงกิจกรรมที่ User เป็น Host หรือ เข้าร่วมอยู่ (เฉพาะที่ยังไม่จบ/ไม่ยกเลิก)
  const userActivities = await prisma.activity.findMany({
    where: {
      OR: [
        { hostId: userId },
        { joinRequests: { some: { userId: userId, status: 'APPROVED' } } }
      ],
      status: { notIn: ['CANCELLED', 'FINISHED'] },
      eventStartTime: { gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000) } // เช็คย้อนหลัง 1 วันถึงอนาคต
    }
  });

  for (const act of userActivities) {
    const actStart = new Date(act.eventStartTime).getTime();
    const actEnd = act.eventEndTime 
      ? new Date(act.eventEndTime).getTime() 
      : actStart + DEFAULT_DURATION_MS;

    // สูตรเช็ค Overlap: (StartA < EndB + Buffer) && (EndA + Buffer > StartB)
    if (newStart < (actEnd + BUFFER_MS) && (newEnd + BUFFER_MS) > actStart) {
      throw new Error(`Time conflict: You have another activity "${act.title}" around this time (including 30-min travel/rest buffer).`);
    }
  }

  const targetStatus = activity.isPublic ? 'APPROVED' : 'PENDING';

  const request = await prisma.joinRequest.create({
    data: {
      userId: userId,
      activityId: Number(activityId),
      status: targetStatus
    },
    include: {
      user: { select: { username: true } }
    }
  });

  //เพิ่มของ Chat : ถ้าเป็นกิจกรรม Public และสถานะเป็น APPROVED ทันที ให้ดึงเข้าห้องแชทเลย
  if (targetStatus === 'APPROVED') {
    const chatRoom = await prisma.chatRoom.findUnique({ where: { activityId: Number(activityId) } });
    if (chatRoom) {
      await prisma.chatMember.upsert({
        where: { roomId_userId: { roomId: chatRoom.id, userId: userId } },
        update: {},
        create: { roomId: chatRoom.id, userId: userId }
      });
    }
  } else if (targetStatus === 'PENDING') {
    // แจ้งเตือน Host เมื่อมีคนขอจอย (เฉพาะห้องส่วนตัว)
    await createNoti({
      userId: activity.hostId,
      senderId: userId,
      type: "JOIN_REQUEST",
      message: `${request.user.username} Request to join the activity "${activity.title}"`,
      refId: Number(activityId),
    });

    sendNotification(io, {
      userId: activity.hostId,
      senderId: userId,
      type: "JOIN_REQUEST",
      message: `${request.user.username} Request to join the activity "${activity.title}"`,
      refId: Number(activityId),
    });
  }

  return request;
}


export async function updateRequestStatus(io, hostId, requestId, status) {
  const allowedStatuses = ['APPROVED', 'REJECTED'];
  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid status. Must be APPROVED or REJECTED");
  }

  const request = await prisma.joinRequest.findFirst({
    where: {
      id: Number(requestId),
      activity: { hostId: Number(hostId) }
    }
  });

  if (!request) {
    throw new Error("Request not found or you're not the host");
  }

  const updatedRequest = await prisma.joinRequest.update({
    where: { id: Number(requestId) },
    data: { status }
  });

  //เพิ่มของChat : เมื่อ Host กดอนุมัติ (APPROVED) ให้ดึง User เข้าห้องแชท
  if (status === 'APPROVED') {
    const chatRoom = await prisma.chatRoom.findUnique({ where: { activityId: updatedRequest.activityId } });
    if (chatRoom) {
      await prisma.chatMember.upsert({
        where: { roomId_userId: { roomId: chatRoom.id, userId: updatedRequest.userId } },
        update: {},
        create: { roomId: chatRoom.id, userId: updatedRequest.userId }
      });
    }
    // ดึงชื่อ Activity
    const activity = await prisma.activity.findUnique({
      where: { id: updatedRequest.activityId },
      select: { title: true },
    });
    // เพิ่ม notification
    await createNoti({
      userId: updatedRequest.userId,
      senderId: Number(hostId),
      type: "ACTIVITY_APPROVED",
      message: `Approved to join "${activity.title}"`,
      refId: updatedRequest.activityId,
    });
    sendNotification(io, {
      userId: updatedRequest.userId,
      senderId: Number(hostId),
      type: "ACTIVITY_APPROVED",
      message: `Approved to join "${activity.title}"`,
      refId: updatedRequest.activityId,
    });


  }

  return updatedRequest;
}

export async function leaveActivity(userId, activityId) {
  // เช็คก่อนว่าไม่ใช่ host
  const activity = await prisma.activity.findUnique({
    where: { id: Number(activityId) }
  })

  if (activity.hostId === userId) {
    throw new Error("Host cannot leave the activity. Please cancel the activity instead. ")
  }

  const existingRequest = await prisma.joinRequest.findUnique({
    where: { userId_activityId: { userId, activityId: Number(activityId) } }
  })

  if (!existingRequest) throw new Error("You are not part of this activity")

  const deletedRequest = await prisma.joinRequest.delete({
    where: { userId_activityId: { userId, activityId: Number(activityId) } }
  })

  // ลบออกจาก chatRoom เฉพาะถ้าได้รับการอนุมัติแล้ว
  if (existingRequest.status === 'APPROVED') {
    const chatRoom = await prisma.chatRoom.findUnique({
      where: { activityId: Number(activityId) }
    })
    if (chatRoom) {
      await prisma.chatMember.deleteMany({
        where: { roomId: chatRoom.id, userId }
      })
    }
  }

  return deletedRequest
}
