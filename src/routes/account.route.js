import express from 'express'
import { deleteMe, getMe, updateMe } from '../controllers/account.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'


const accountRoute = express.Router()

accountRoute.get('/api/account/profile',authCheckUser ,getMe)
accountRoute.patch('/api/account/profile',authCheckUser, upload.single('profileImg'),updateMe)
accountRoute.delete('/api/account/profile',authCheckUser,deleteMe)

export default accountRoute