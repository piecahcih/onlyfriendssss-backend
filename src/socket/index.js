import { Server } from "socket.io";
import { socketAuth } from "./auth.middleware.js";
import { registerChatHandlers } from "./chat.handler.js";
import { registerPresenceHandlers } from "./presence.handler.js";
import { registerNotificationHandlers } from "./noti.handler.js";


export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true
    }
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    socket.join(`user:${socket.user.id}`);
    console.log(` New connection: ${socket.user.username} (${socket.id})`);

    registerChatHandlers(io, socket);
    registerPresenceHandlers(io, socket);
    registerNotificationHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log(`❌ Disconnected: ${socket.id}`);
    });
  });

  return io;
};