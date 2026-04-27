import * as chatService from "../services/chat.service.js";

export async function getRoomsCtrl(req, res, next) {
    try {
        const userId = req.result.id;
        const rooms = await chatService.getRooms(userId);
        console.log('roomszzzz', rooms)
        res.json(rooms);
    } catch (error) {
        next(error);
    }
}

export async function getMessagesCtrl(req, res, next) {
    try {
        const { roomId } = req.params;
        const userId = req.result.id;
        const messages = await chatService.getMessages(roomId, userId)
        res.json(messages);
    } catch (error) {
        next(error);
    }
}

export async function markAsReadCtrl(req, res, next) {
    try {
        const { roomId } = req.params;
        const userId = req.result.id;
        await chatService.markAsRead(roomId, userId);
        res.json({ message: "Marked as read" });
    } catch (error) {
        next(error);
    }
}

export const getOrCreatePrivateRoomCtrl = async (req, res, next) => {
    try {
        const { friendId } = req.body;
        const myId = req.result.id;


        if (!friendId) {
            return res.status(400).json({ message: "friendId is required" });
        }

        const room = await chatService.getOrCreatePrivateRoom(myId, parseInt(friendId));

        res.json({
            success: true,
            roomId: room.id
        });
    } catch (error) {
        console.error("🔥 Error Detail:", error);
        next(error);
    }
};