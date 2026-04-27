import { prisma } from "../lib/prisma.js";
import { sendNotification } from "../socket/noti.handler.js";
import { createNoti } from "./notification.service.js";

export async function getFriendList(userId) {
  const friends = await prisma.friendShip.findMany({
    where: {
      status: "ACCEPTED",
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    include: {
      sender: {
        select: { id: true, username: true, profileImg: true, firstName: true },
      },
      receiver: {
        select: { id: true, username: true, profileImg: true, firstName: true },
      },
    },
  });
  return friends.map((f) => {
    const friendInfo = f.senderId === userId ? f.receiver : f.sender;
    return {
      ...friendInfo,
      friendshipId: f.id,
    };
  });
}

export async function sendFriendRequest(io, senderId, receiverId) {
  const targetId = Number(receiverId);
  //ห้ามแอดตัวเอง
  if (senderId === targetId) {
    const error = new Error("You cannot add yourself as a friend");
    error.statusCode = 400;
    throw error;
  }
  //เช็คว่าเคยขอกันหรือยัง
  const existingRelationship = await prisma.friendShip.findFirst({
    where: {
      OR: [
        { senderId: senderId, receiverId: targetId },
        { senderId: targetId, receiverId: senderId },
      ],
    },
  });
  if (existingRelationship) {
    const error = new Error(
      "You are already friends with this user or have a pending request",
    );
    error.statusCode = 400;
    throw error;
  }

  const friendship = await prisma.friendShip.create({
    data: {
      senderId: senderId,
      receiverId: targetId,
      status: "PENDING",
    },
    include: {
      sender: { select: { username: true } }
    }
  });

  // ส่งแจ้งเตือน
  await createNoti({
    userId: targetId,
    senderId: senderId,
    type: "FRIEND_REQUEST",
    message: `${friendship.sender.username} sent you a friend request.`,
    refId: friendship.id,
  });

  sendNotification(io, {
    userId: targetId,
    senderId: senderId,
    type: "FRIEND_REQUEST",
    message: `${friendship.sender.username} sent you a friend request.`,
    refId: friendship.id,
  });

  return friendship;
}

export async function getPendingRequests(userId) {
  return await prisma.friendShip.findMany({
    where: {
      status: "PENDING",
      receiverId: userId,
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          profileImg: true,
        },
      },
    },
  });
}

export async function acceptFriendRequest(io, userId, friendshipId) {
  const fId = Number(friendshipId);
  const uId = Number(userId);

  const request = await prisma.friendShip.findUnique({
    where: { id: fId },
    include: {
      receiver: { select: { username: true } }
    }
  });

  if (!request) throw new Error("Friend request not found");
  if (request.receiverId !== uId) throw new Error("You are not authorized to accept this request.");

  // อัปเดตสถานะเป็น ACCEPTED
  const friendship = await prisma.friendShip.update({
    where: { id: fId },
    data: { status: "ACCEPTED" },
  });

  //เพิ่มของChat : สร้างห้องแชทส่วนตัว (Private Chat)
  //สร้าง pairKey โดยเรียง ID น้อยไปมาก 
  const userIds = [friendship.senderId, friendship.receiverId].sort((a, b) => a - b);
  const pairKey = `${userIds[0]}_${userIds[1]}`;

  await prisma.chatRoom.upsert({
    where: { pairKey: pairKey },
    update: {}, // ถ้ามีห้องอยู่แล้วไม่ต้องทำอะไร
    create: {
      type: 'PRIVATE',
      pairKey: pairKey,
      members: {
        create: [
          { userId: friendship.senderId },
          { userId: friendship.receiverId }
        ]
      }
    }
  });

  // ส่งแจ้งเตือนให้คนส่ง (Sender) ว่าตอบรับแล้ว
  await createNoti({
    userId: friendship.senderId,
    senderId: uId,
    type: "FRIEND_ACCEPTED",
    message: `${request.receiver.username} accepted your friend request.`,
    refId: friendship.id,
  });

  sendNotification(io, {
    userId: friendship.senderId,
    senderId: uId,
    type: "FRIEND_ACCEPTED",
    message: `${request.receiver.username} accepted your friend request.`,
    refId: friendship.id,
  });

  return friendship;
}

//ลบเพื่อน
export async function unfriend(userId, friendshipId) {
  const fId = Number(friendshipId);
  const uId = Number(userId);

  const friendship = await prisma.friendShip.findUnique({
    where: { id: fId },
  });
  if (!friendship) {
    const error = new Error("Friendship not found");
    error.statusCode = 404;
    throw error;
  }

  if (friendship.senderId !== uId && friendship.receiverId !== uId) {
    const error = new Error("You are not authorized to remove this friendship.");
    error.statusCode = 403;
    throw error;
  }
  return await prisma.friendShip.delete({
    where: { id: fId },
  });
}

export async function getSentRequests(userId) {
  return await prisma.friendShip.findMany({
    where: {
      status: "PENDING",
      senderId: userId,
    },
    include: {
      receiver: {
        select: {
          id: true,
          username: true,
          profileImg: true,
        },
      },
    },
  });
}
