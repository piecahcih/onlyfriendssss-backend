import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import {registerOrLogin} from '../controllers/auth.controller.js'

const authRoute = express.Router()

authRoute.post('/registerOrLogin', registerOrLogin)

authRoute.post('/register', register)
authRoute.post('/login', login)


export default authRoute