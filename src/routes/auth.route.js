import express from 'express'
import { addInterestCtrl, addProfileCtrl, loginCtrl, registerCtrl, registerOrLoginCtrl } from '../controllers/auth.controller.js'

const authRoute = express.Router();

authRoute.post('/registerOrLogin', registerOrLoginCtrl)

authRoute.post('/register', registerCtrl)
authRoute.post('/login', loginCtrl)
 
//add profile && interests
authRoute.patch('/register/profile/:id', addProfileCtrl)
authRoute.post('/register/interests/:id', addInterestCtrl)

export default authRoute
