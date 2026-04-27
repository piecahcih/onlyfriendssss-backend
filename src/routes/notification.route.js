import express from 'express'
import { authCheckUser } from "../middlewares/authenticate.js"
import { getNotiCtrl, markAllAsReadCtrl, markAsReadCtrl } from '../controllers/notification.controller.js'



const notiRoute = express.Router()

notiRoute.get('/', authCheckUser, getNotiCtrl)
notiRoute.patch('/:id/read', authCheckUser, markAsReadCtrl)
notiRoute.patch('/read-all', authCheckUser, markAllAsReadCtrl)

export default notiRoute