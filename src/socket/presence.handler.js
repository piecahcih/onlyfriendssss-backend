// เก็บข้อมูล user ที่ออนไลน์อยู่
// คีย์: userId, ค่า: Set ของ socketId (เพราะ 1 user อาจเปิดหลายหน้าจอ)
const onlineUsers = new Map();

export const registerPresenceHandlers = (io, socket) => {
  const userId = socket.user.id;

  // 1. เพิ่ม User เข้าไปในรายการ Online
  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, new Set());
  }
  onlineUsers.get(userId).add(socket.id);

  // แจ้งคนอื่นว่าฉันออนไลน์ (ถ้าต้องการแบบ Real-time)
  // io.emit("user_status", { userId, status: "online" });
  console.log(`Presence: User ${userId} is online (${onlineUsers.get(userId).size} connections)`);

  // 2. เมื่อหลุดการเชื่อมต่อ
  socket.on("disconnect", () => {
    const userConnections = onlineUsers.get(userId);
    if (userConnections) {
      userConnections.delete(socket.id);
      
      // ถ้าไม่มีการเชื่อมต่อเหลืออยู่เลย แสดงว่าออฟไลน์จริง
      if (userConnections.size === 0) {
        onlineUsers.delete(userId);
        // io.emit("user_status", { userId, status: "offline" });
        console.log(`Presence: User ${userId} is offline`);
      }
    }
  });

  // 3. (Optional) ดึงรายการคนออนไลน์ทั้งหมด
  socket.on("get_online_users", (callback) => {
    if (callback) callback(Array.from(onlineUsers.keys()));
  });
};

export { onlineUsers };
