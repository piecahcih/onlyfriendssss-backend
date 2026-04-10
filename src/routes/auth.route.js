import express from "express";
import { registerOrLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/registerOrLogin", registerOrLogin);
