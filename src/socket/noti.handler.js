import { prisma } from "../lib/prisma.js";

export function registerNotificationHandlers(io, socket) {
    socket.on("notification:read", async (notificationId) => {
        await prisma.notification.update({
            where: { id: Number(notificationId) },
            data: { isRead: true },
        });
    });
}

export function sendNotification(io, { userId, type, message, senderId, refId }) {
    console.log(`📢 Sending notification to user:${userId}`, type)
    const room = io.sockets.adapter.rooms.get(`user:${userId}`)
    console.log(`📢 Room user:${userId} has`, room ? room.size : 0, 'sockets')
    io.to(`user:${userId}`).emit("notification", {
        id: Date.now(),
        userId,
        type,
        message,
        senderId,
        refId,
        isRead: false,
        createdAt: new Date(),
    });
}