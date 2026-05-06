import { Server } from "socket.io";
import { socketAuth } from "./auth.middleware.js";
import { registerChatHandlers } from "./chat.handler.js";
import { registerPresenceHandlers } from "./presence.handler.js";
import { registerNotificationHandlers } from "./noti.handler.js";


export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
     origin: [
        "http://localhost:5173/",
        "https://neon-news-sociology-instead.trycloudflare.com/"
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true
    },
    transports: ['websocket', 'polling']
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