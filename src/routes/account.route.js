import express from 'express'
import { deleteMe, getMe, updateMe } from '../controllers/account.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'
import upload from '../middlewares/upload.middleware.js'


const accountRoute = express.Router()

accountRoute.get('/profile',authCheckUser ,getMe)
accountRoute.patch('/profile',authCheckUser, upload.single('profileImg'),updateMe)
accountRoute.delete('/profile',authCheckUser,deleteMe)

export default accountRoute