import { prisma } from "../lib/prisma.js";

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

export async function sendFriendRequest(senderId, receiverId) {
  const targetId = Number(receiverId);
  //ห้ามแอดตัวเอง
  if (senderId === targetId) {
    const error = new Error("คุณไม่สามารถเพิ่มตัวเองเป็นเพื่อนได้");
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
      "คุณและผู้ใช้นี้เป็นเพื่อนกันอยู่แล้วหรือมีคำขอที่ค้างอยู่",
    );
    error.statusCode = 400;
    throw error;
  }

  return await prisma.friendShip.create({
    data: {
      senderId: senderId,
      receiverId: targetId,
      status: "PENDING",
    },
  });
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

export async function acceptFriendRequest(userId, friendshipId) {
  const fId = Number(friendshipId);
  const uId = Number(userId);

  const request = await prisma.friendShip.findUnique({
    where: { id: fId },
  });

  if (!request) {
    const error = new Error("ไม่พบคำขอเป็นเพื่อนนี้");
    error.statusCode = 404;
    throw error;
  }
  // กันมากดรับเอง
  if (request.receiverId !== uId) {
    const error = new Error("คุณไม่มีสิทธิ์ตอบรับคำขอนี้");
    error.statusCode = 403;
    throw error;
  }
  // 2. อัปเดตสถานะเป็น ACCEPTED
  return await prisma.friendShip.update({
    where: { id: fId },
    data: { status: "ACCEPTED" },
  });
}

//ลบเพื่อน
export async function unfriend(userId, friendshipId) {
  const fId = Number(friendshipId);
  const uId = Number(userId);

  const friendship = await prisma.friendShip.findUnique({
    where: { id: fId },
  });
  if (!friendship) {
    const error = new Error("ไม่พบข้อมูลความสัมพันะ์เพื่อนคนนี้");
    error.statusCode = 404;
    throw error;
  }

  if (friendship.senderId !== uId && friendship.receiverId !== uId) {
    const error = new Error("คุณไม่มีสิทธิ์ลบความสัมพันะ์เพื่อนคนนี้");
    error.statusCode = 403;
    throw error;
  }
  return await prisma.friendShip.delete({
    where: { id: fId },
  });
}
