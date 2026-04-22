import { verifyToken } from "../utils/jwt.js";
import { prisma } from "../lib/prisma.js";

export const socketAuth = async (socket, next) => {
    try {
        // ดึง token จาก handshake (ส่งมาจาก frontend: { auth: { token: '...' } })
        const token = socket.handshake.auth?.token;

        if (!token) {
            return next(new Error("Authentication error: Token missing"));
        }

        const payload = verifyToken(token);
        const user = await prisma.user.findUnique({
            where: { id: payload.id },
            select: { id: true, username: true, profileImg: true } // ดึงเฉพาะที่จำเป็น
        });

        if (!user) {
            return next(new Error("Authentication error: User not found"));
        }

        // เก็บข้อมูล user ไว้ใน socket object เพื่อใช้ใน handler อื่นๆ
        socket.user = user;
        next();
    } catch (err) {
        next(new Error("Authentication error: Invalid token"));
    }
};