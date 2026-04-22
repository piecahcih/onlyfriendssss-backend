import { Server } from "socket.io";
import { socketAuth } from "./auth.middleware.js";
import { registerChatHandlers } from "./chat.handler.js";
import { registerPresenceHandlers } from "./presence.handler.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true
    }
  });

  // ใช้ Middleware ตรวจสอบ Token (Security)
  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log(`🔌 New connection: ${socket.user.username} (${socket.id})`);

    //  Chat Handlers (Send/Join/Typing)
    registerChatHandlers(io, socket);

    // Presence Handlers (Online/Offline)
    registerPresenceHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log(`❌ Disconnected: ${socket.id}`);
    });
  });

  return io;
};
