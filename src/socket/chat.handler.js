import { prisma } from "../lib/prisma.js";

export const registerChatHandlers = (io, socket) => {

  // 1. Event: เข้าร่วมห้องแชท (Join Room)
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

  // 2. Event: ส่งข้อความ (Send Message)
  const sendMessage = async (data, callback) => {
    const { roomId, content, type = 'TEXT', clientMessageId } = data;

    try {
      if (!roomId || !content) {
        return callback?.({ success: false, message: "Missing required fields" });
      }

      // บันทึกลง Database
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

      // ✅ ส่ง new_message ให้คนที่อยู่ในห้อง (join_room แล้ว) — เพื่ออัปเดต chat UI
      io.to(`room_${roomId}`).emit("new_message", newMessage);

      // ✅ ดึง members ทุกคนในห้อง เพื่อ notify คนที่ไม่ได้เปิดห้องนี้อยู่
      const members = await prisma.chatMember.findMany({
        where: { roomId: parseInt(roomId) },
        select: { userId: true }
      });

      // ✅ ส่ง new_message ไปที่ personal room ของแต่ละคน (user_${userId})
      // คนที่อยู่หน้า Chat list หรือหน้าอื่น จะได้รับผ่าน channel นี้
      // แล้ว useChatEvents ฝั่ง frontend จะ handle ต่อ (addMessage + addNotification)
      members.forEach(({ userId }) => {
        // ✅ ใช้ user:${userId} ให้ตรงกับที่ initSocket ทำ socket.join(`user:${id}`)
        // ไม่ส่งซ้ำให้คนส่ง เพราะได้จาก room_${roomId} แล้ว
        if (userId !== socket.user.id) {
          io.to(`user:${userId}`).emit("new_message", newMessage);
        }
      });

      if (callback) callback({ success: true, data: newMessage });

    } catch (error) {
      console.error("Chat Error:", error);
      if (callback) callback({ success: false, message: "Server error: Failed to send message" });
    }
  };

  // 3. Event: กำลังพิมพ์ (Typing Indicator)
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