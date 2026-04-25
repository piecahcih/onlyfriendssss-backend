import { prisma } from "../lib/prisma.js";

async function backfill() {
    console.log("🚀 Starting Chat Backfill...");

    try {
        const activities = await prisma.activity.findMany({
            where: { chatRoom: null },
            include: {
                joinRequests: { where: { status: 'APPROVED' } }
            }
        });

        console.log(`🔍 Found ${activities.length} activities without chat rooms.`);

        for (const activity of activities) {
            // รวม ID และกรองค่าซ้ำออก
            const allMemberIds = [
                activity.hostId,
                ...activity.joinRequests.map(req => req.userId)
            ];

            // ใช้ Set เพื่อกรอง ID ที่ซ้ำกันออก (เช่น ถ้า Host อยู่ใน JoinRequest ด้วย)
            const uniqueMemberIds = [...new Set(allMemberIds)];

            await prisma.chatRoom.create({
                data: {
                    type: 'ACTIVITY',
                    activityId: activity.id,
                    members: {
                        create: uniqueMemberIds.map(userId => ({ userId }))
                    }
                }
            });
            console.log(`✅ Created ChatRoom for: ${activity.title} (ID: ${activity.id})`);
        }

        // ส่วนของเพื่อน (Private Chat)
        const friendships = await prisma.friendShip.findMany({
            where: { status: 'ACCEPTED' }
        });

        for (const fs of friendships) {
            const ids = [fs.senderId, fs.receiverId].sort((a, b) => a - b);
            const pairKey = `${ids[0]}_${ids[1]}`;

            await prisma.chatRoom.upsert({
                where: { pairKey },
                update: {},
                create: {
                    type: 'PRIVATE',
                    pairKey,
                    members: {
                        create: [
                            { userId: fs.senderId },
                            { userId: fs.receiverId }
                        ]
                    }
                }
            });
        }

        console.log("✨ Backfill completed successfully!");
    } catch (error) {
        console.error("❌ Error during backfill:", error);
    } finally {
        await prisma.$disconnect();
    }
}

backfill();