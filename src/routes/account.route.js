import express from "express";
import {
  deleteMeCtrl,
  getMeCtrl,
  getUserProfileCtrl,
  updateMeCtrl,
} from "../controllers/account.controller.js";
import { authCheckUser } from "../middlewares/authenticate.js";
import uploads from "../middlewares/upload.middleware.js";

const accountRoute = express.Router();

accountRoute.get("/profile", authCheckUser, getMeCtrl);
accountRoute.patch(
  "/profile",
  authCheckUser,
  uploads.single("profileImg"),
  updateMeCtrl,
);
accountRoute.delete("/profile", authCheckUser, deleteMeCtrl);
accountRoute.get("/profile/:userId", authCheckUser, getUserProfileCtrl);

export default accountRoute;
