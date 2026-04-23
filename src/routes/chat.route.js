import express from "express";
import { getRoomsCtrl, getMessagesCtrl } from "../controllers/chat.controller.js";
import { authCheckUser } from "../middlewares/authenticate.js";

const chatRoute = express.Router();

chatRoute.get("/rooms", authCheckUser, getRoomsCtrl);
chatRoute.get("/messages/:roomId/", authCheckUser, getMessagesCtrl);

export default chatRoute;