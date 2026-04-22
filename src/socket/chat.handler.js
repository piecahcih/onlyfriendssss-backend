import { prisma } from "../lib/prisma.js";

export const registerChatHandlers = (io, socket) => {
  
  // 1. Event: เข้าร่วมห้องแชท (Join Room)
  const joinRoom = async (data) => {
    const { roomId } = data;
    try {
      if (!roomId) return;

      // ตรวจสอบความปลอดภัย: User เป็นสมาชิกของห้องนี้จริงไหม
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

      // ให้ Socket เข้าไปอยู่ในกลุ่ม (Room) ตาม ID ใน DB
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

      // ส่งข้อความไปหาทุกคนในห้อง (รวมถึงคนส่งด้วย)
      io.to(`room_${roomId}`).emit("new_message", newMessage);

      // ส่ง Callback ยืนยันกลับไปที่คนส่ง (สำหรับ Optimistic UI)
      if (callback) callback({ success: true, data: newMessage });

    } catch (error) {
      console.error("Chat Error:", error);
      if (callback) callback({ success: false, message: "Server error: Failed to send message" });
    }
  };

  // 3. Event: กำลังพิมพ์ (Typing Indicator)
  const typing = (data) => {
    const { roomId, isTyping } = data;
    // ส่งไปหาทุกคนในห้อง "ยกเว้นคนส่ง"
    socket.to(`room_${roomId}`).emit("user_typing", {
      userId: socket.user.id,
      username: socket.user.username,
      isTyping
    });
  };

  // ลงทะเบียน Events
  socket.on("join_room", joinRoom);
  socket.on("send_message", sendMessage);
  socket.on("typing", typing);
};
