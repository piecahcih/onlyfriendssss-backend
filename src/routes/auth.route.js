import express from 'express'
import { loginCtrl, registerCtrl, registerOrLoginCtrl } from '../controllers/auth.controller.js'

const authRoute = express.Router();

authRoute.post('/registerOrLogin', registerOrLoginCtrl)

authRoute.post('/register', registerCtrl)
authRoute.post('/login', loginCtrl)


export default authRoute
