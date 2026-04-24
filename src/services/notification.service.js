import { prisma } from "../lib/prisma.js"

export async function createNoti({ userId, senderId, type, message, refId }) {
    return await prisma.notification.create({
        data: { userId, senderId, type, message, refId }
    })

}

export async function getNoti({ userId }) {
    return await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 30,
        include: {
            sender: {
                select: { id: true, username: true, profileImg: true, firstName: true }
            }
        }
    })

}

export async function markAsRead({ notificationId, userId }) {
    const noti = await prisma.notification.findUnique({
        where: { id: Number(notificationId) },
    });
    if (!noti || noti.userId !== userId) {
        const error = new Error("Notification not found");
        error.statusCode = 404;
        throw error;
    }
    return await prisma.notification.update({
        where: { id: Number(notificationId) },
        data: { isRead: true },
    });
}

export async function markAllAsRead(userId) {
    return await prisma.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true },
    });
}
