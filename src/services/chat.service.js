
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
                where: { userId: { not: userId } }, // กรองตัวเองออก เหลือแค่ข้อมูลเพื่อน
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
    return rooms.map(room => {
        const lastMessage = room.messages[0] || null;
        const isPrivate = room.type === 'PRIVATE';

        return {
            id: room.id,
            type: room.type,
            // ชื่อห้อง: ถ้าเป็นกลุ่มใช้ชื่อกิจกรรม ถ้าส่วนตัวใช้ชื่อเพื่อน
            name: isPrivate ? (room.members[0]?.user?.username || 'Unknown User') : room.activity?.title,
            image: isPrivate ? room.members[0]?.user?.profileImg : room.activity?.coverPhoto,
            lastMessage: lastMessage ? {
                content: lastMessage.content,
                sender: lastMessage.sender.username,
                createdAt: lastMessage.createdAt
            } : null,
            activityId: room.activityId,
            peerId: isPrivate ? room.members[0]?.userId : null
        };
    });
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
