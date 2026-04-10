import express from "express";
import { authCheckUser } from "../middlewares/authenticate.js";
import friendController from "../controllers/friend.controller.js";

const friendRoute = express.Router();

friendRoute.post("/request/:id", authCheckUser, friendController);
friendRoute.patch("/accept/:id", authCheckUser, friendController);
friendRoute.delete("/accept/:id", authCheckUser, friendController);
friendRoute.get("/list", authCheckUser, friendController);
