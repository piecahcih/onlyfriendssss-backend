import { prisma } from "../lib/prisma.js";

export const registerChatHandlers = (io, socket) => {

  const joinRoom = async (data) => {
    const { roomId } = data;
    try {
      if (!roomId) return;

      const membership = await prisma.chatMember.findUnique({
        where: {
          roomId_userId: {
            roomId: parseInt(roomId),
            userId: socket.user.id
          }
        }
      });

      if (!membership) {
        return socket.emit("chat_error", { message: "Access denied: Not a member of this room" });
      }

      socket.join(`room_${roomId}`);
      console.log(`User ${socket.user.username} joined room_${roomId}`);
    } catch (error) {
      console.error("Join Room Error:", error);
      socket.emit("chat_error", { message: "Failed to join room" });
    }
  };

  const sendMessage = async (data, callback) => {
    const { roomId, content, type = 'TEXT', clientMessageId } = data;

    try {
      if (!roomId || !content) {
        return callback?.({ success: false, message: "Missing required fields" });
      }

      const newMessage = await prisma.message.create({
        data: {
          roomId: parseInt(roomId),
          senderId: socket.user.id,
          content,
          type,
          clientMessageId
        },
        include: {
          sender: {
            select: { id: true, username: true, profileImg: true }
          }
        }
      });

      // ✅ ส่งให้ทุกคนในห้องแชท
      io.to(`room_${roomId}`).emit("new_message", newMessage);

      // ✅ ส่ง notify เฉพาะคนที่ไม่ได้อยู่ในห้องนี้
      const members = await prisma.chatMember.findMany({
        where: { roomId: parseInt(roomId) },
        select: { userId: true }
      });

      for (const { userId } of members) {
        if (userId !== socket.user.id) {
          const userSockets = await io.in(`user:${userId}`).fetchSockets();
          const alreadyInRoom = userSockets.some(s => s.rooms.has(`room_${roomId}`));

          if (!alreadyInRoom) {
            io.to(`user:${userId}`).emit("new_message", newMessage);
          }
        }
      }

      if (callback) callback({ success: true, data: newMessage });

    } catch (error) {
      console.error("Chat Error:", error);
      if (callback) callback({ success: false, message: "Server error: Failed to send message" });
    }
  };

  const typing = (data) => {
    const { roomId, isTyping } = data;
    socket.to(`room_${roomId}`).emit("user_typing", {
      userId: socket.user.id,
      username: socket.user.username,
      isTyping
    });
  };

  socket.on("join_room", joinRoom);
  socket.on("send_message", sendMessage);
  socket.on("typing", typing);
};