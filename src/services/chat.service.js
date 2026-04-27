
import { prisma } from "../lib/prisma.js";


export async function getRooms(userId) {
    const rooms = await prisma.chatRoom.findMany({
        where: {
            members: {
                some: { userId: userId }
            }
        },

        include: {
            activity: {
                select: {
                    id: true,
                    title: true,
                    coverPhoto: true,
                    status: true
                }

            },

            members: {
                // where: { userId: { not: userId } }, // ไม่กรองตัวเองออกแล้ว เพราะต้องการดู lastReadAt
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            profileImg: true,
                            firstName: true
                        }
                    }
                }
            },
            // 3. ดึงข้อความล่าสุด 1 ข้อความ เพื่อมาโชว์ใน Chat List
            messages: {
                take: 1,
                orderBy: { createdAt: 'desc' },
                include: {
                    sender: { select: { username: true } }
                }
            }
        },
        orderBy: {
            // เรียงตามห้องที่มีข้อความใหม่ล่าสุดขึ้นก่อน
            createdAt: 'desc'
        }
    });

    // ปรับโครงสร้างข้อมูล (Format) ให้ Frontend ใช้ง่ายขึ้น
    const result = await Promise.all(rooms.map(async (room) => {
        const lastMessage = room.messages[0] || null;
        const isPrivate = room.type === 'PRIVATE';

        // หาข้อมูลของตัวเองในห้องนี้
        const myMemberInfo = room.members.find(m => m.userId === userId);
        const lastReadAt = myMemberInfo?.lastReadAt || new Date(0);

        // นับจำนวนข้อความที่ยังไม่ได้อ่าน
        const unreadCount = await prisma.message.count({
            where: {
                roomId: room.id,
                createdAt: { gt: lastReadAt },
                senderId: { not: userId } // ไม่นับข้อความที่ตัวเองส่ง
            }
        });

        // ข้อมูลเพื่อน (กรณี Private)
        const peer = room.members.find(m => m.userId !== userId);

        return {
            id: room.id,
            type: room.type,
            // ชื่อห้อง: ถ้าเป็นกลุ่มใช้ชื่อกิจกรรม ถ้าส่วนตัวใช้ชื่อเพื่อน
            name: isPrivate ? (peer?.user?.username || 'Unknown User') : room.activity?.title,
            image: isPrivate ? peer?.user?.profileImg : room.activity?.coverPhoto,
            lastMessage: lastMessage ? {
                content: lastMessage.content,
                sender: lastMessage.sender.username,
                createdAt: lastMessage.createdAt
            } : null,
            unreadCount: unreadCount,
            activityId: room.activityId,
            peerId: isPrivate ? peer?.userId : null
        };
    }));

    return result;
}

/**
 * ดึงประวัติข้อความย้อนหลังในห้องแชท
 */
export async function getMessages(roomId, userId, limit = 50) {
    // 1. Security Check: เช็คก่อนว่าคนขอดูเป็นสมาชิกในห้องไหม
    const membership = await prisma.chatMember.findUnique({
        where: {
            roomId_userId: {
                roomId: parseInt(roomId),
                userId: userId
            }
        }
    });
    console.log(membership)

    if (!membership) {
        throw new Error("คุณไม่มีสิทธิ์เข้าถึงห้องแชทนี้");
    }

    // 2. ดึงข้อความ
    return await prisma.message.findMany({
        where: { roomId: parseInt(roomId) },
        take: limit,
        orderBy: { createdAt: 'asc' }, // เรียงจากเก่าไปใหม่ เพื่อให้แชทไหลลงล่าง
        include: {
            sender: {
                select: {
                    id: true,
                    username: true,
                    profileImg: true
                }
            }
        }
    });
}

/**
 * ทำเครื่องหมายว่าอ่านข้อความทั้งหมดในห้องแชทแล้ว
 */
export async function markAsRead(roomId, userId) {
    // ดึงข้อความล่าสุดในห้อง
    const lastMessage = await prisma.message.findFirst({
        where: { roomId: parseInt(roomId) },
        orderBy: { createdAt: 'desc' },
        select: { id: true }
    });

    return await prisma.chatMember.update({
        where: {
            roomId_userId: {
                roomId: parseInt(roomId),
                userId: userId
            }
        },
        data: {
            lastReadAt: new Date(),
            lastReadMessageId: lastMessage ? lastMessage.id : null
        }
    });
}

export async function getOrCreatePrivateRoom(myId, friendId) {
    const sortedIds = [parseInt(myId), parseInt(friendId)].sort((a, b) => a - b);
    const pairKey = `private_${sortedIds[0]}_${sortedIds[1]}`;
    let room = await prisma.chatRoom.findFirst({
        where: {
            type: 'PRIVATE',
            AND: [
                { members: { some: { userId: myId } } },
                { members: { some: { userId: friendId } } }
            ]
        }
    });

    // 2. ถ้ายังไม่มีห้อง ให้สร้างใหม่
    if (!room) {
        room = await prisma.chatRoom.create({
            data: {
                type: 'PRIVATE',
                members: {
                    create: [
                        { userId: myId },
                        { userId: friendId }
                    ]
                }
            }
        });
    }

    return room;
}