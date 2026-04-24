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


  if (activity.maxParticipants && activity._count.joinRequests >= activity.maxParticipants) {
    throw new Error("This activity is already full");
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
