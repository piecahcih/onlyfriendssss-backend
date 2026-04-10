import express from "express";
import { registerOrLogin } from "../controllers/auth.controller.js";
import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import {registerOrLogin} from '../controllers/auth.controller.js'

const router = express.Router();

authRoute.post('/registerOrLogin', registerOrLogin)

authRoute.post('/register', register)
authRoute.post('/login', login)


export default authRoute
