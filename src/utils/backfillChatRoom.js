import { prisma } from "../lib/prisma.js";

export async function backfillChatRooms() {
    console.log("🚀 Starting Chat Backfill...");

    const activities = await prisma.activity.findMany({
        where: { chatRoom: null },
        include: {
            joinRequests: { where: { status: "APPROVED" } },
        },
    });

    for (const activity of activities) {
        const allMemberIds = [
            activity.hostId,
            ...activity.joinRequests.map((req) => req.userId),
        ];

        const uniqueMemberIds = [...new Set(allMemberIds)];

        await prisma.chatRoom.create({
            data: {
                type: "ACTIVITY",
                activityId: activity.id,
                members: {
                    create: uniqueMemberIds.map((userId) => ({ userId })),
                },
            },
        });
    }

    const friendships = await prisma.friendShip.findMany({
        where: { status: "ACCEPTED" },
    });

    for (const fs of friendships) {
        const ids = [fs.senderId, fs.receiverId].sort((a, b) => a - b);
        const pairKey = `${ids[0]}_${ids[1]}`;

        await prisma.chatRoom.upsert({
            where: { pairKey },
            update: {},
            create: {
                type: "PRIVATE",
                pairKey,
                members: {
                    create: [
                        { userId: fs.senderId },
                        { userId: fs.receiverId },
                    ],
                },
            },
        });
    }

    console.log("✨ Backfill completed!");
}