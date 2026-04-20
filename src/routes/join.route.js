import express from 'express'
import { joinActivityCtrl, leaveActivityCtrl, manageJoinRequestCtrl } from '../controllers/join.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'


const joinRouter = express.Router()

joinRouter.post('/', authCheckUser, joinActivityCtrl)
joinRouter.patch('/manage-request', authCheckUser, manageJoinRequestCtrl)
joinRouter.delete('/leave/:activityId', authCheckUser, leaveActivityCtrl)

export default joinRouter