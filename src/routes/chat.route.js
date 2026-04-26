import express from "express";
import { getRoomsCtrl, getMessagesCtrl, markAsReadCtrl, getOrCreatePrivateRoomCtrl } from "../controllers/chat.controller.js";
import { authCheckUser } from "../middlewares/authenticate.js";

const chatRoute = express.Router();

chatRoute.get("/rooms", authCheckUser, getRoomsCtrl);
chatRoute.post("/rooms/private", authCheckUser, getOrCreatePrivateRoomCtrl);
chatRoute.get("/messages/:roomId/", authCheckUser, getMessagesCtrl);
chatRoute.patch("/rooms/:roomId/read", authCheckUser, markAsReadCtrl);

export default chatRoute;