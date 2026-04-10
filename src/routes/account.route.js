import express from 'express'
import { deleteMe, getMe, updateMe } from '../controllers/account.controller.js'


const accountRoute = express.Router()

accountRoute.get('/api/account/profile',getMe)
accountRoute.patch('/api/account/profile', upload.single('profileImg'),updateMe)
accountRoute.delete('/api/account/profile',deleteMe)

export default accountRoute