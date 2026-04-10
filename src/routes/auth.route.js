import express from 'express'
import {registerOrLogin} from '../controllers/auth.controller.js'

const authRoute = express.Router()

router.post('/registerOrLogin', registerOrLogin)

export default authRoute