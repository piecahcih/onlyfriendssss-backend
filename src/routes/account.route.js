import express from 'express'
import { getMe } from '../controller/account.controller.js'


const accountRoute = express.Router()

accountRoute.get('/api/account/profile',getMe)
// accountRoute.patch('/api/account/profile',)
// accountRoute.delete('/api/account/profile',)

export default accountRoute