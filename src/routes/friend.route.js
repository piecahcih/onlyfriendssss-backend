import express from "express";
import { authCheckUser } from "../middlewares/authenticate.js";
import {
  acceptRequestCtrl,
  getFriendActivitiesCtrl,
  getFriendListCtrl,
  sendRequestCtrl,
  unfriendCtrl,
} from "../controllers/friend.controller.js";

const friendRoute = express.Router();

friendRoute.get("/list", authCheckUser, getFriendListCtrl);
friendRoute.get("/activities", authCheckUser, getFriendActivitiesCtrl);
friendRoute.post("/request/:id", authCheckUser, sendRequestCtrl);
friendRoute.patch("/accept/:id", authCheckUser, acceptRequestCtrl);
friendRoute.delete("/unfriend/:id", authCheckUser, unfriendCtrl);

export default friendRoute;
