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
    io.to(`user:${userId}`).emit("notification", {
        type,
        message,
        senderId,
        refId,
        createdAt: new Date(),
    });
}