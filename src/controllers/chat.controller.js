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
        const messages = await chatService.getMessages(roomId, userId);
        res.json(messages);
    } catch (error) {
        next(error);
    }
}