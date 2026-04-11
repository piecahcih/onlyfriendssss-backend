import express from "express";
import { authCheckUser } from "../middlewares/authenticate.js";
import {
  acceptRequestCtrl,
  getFriendListCtrl,
  sendRequestCtrl,
  unfriendCtrl,
} from "../controllers/friend.controller.js";

const friendRoute = express.Router();

friendRoute.get("/list", authCheckUser, getFriendListCtrl);
friendRoute.post("/request/:id", authCheckUser, sendRequestCtrl);
friendRoute.patch("/accept/:id", authCheckUser, acceptRequestCtrl);
friendRoute.delete("/accept/:id", authCheckUser, unfriendCtrl);

export default friendRoute;
