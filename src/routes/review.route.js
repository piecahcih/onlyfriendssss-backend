import express from 'express'
import { reviewActivityCtrl, reviewUserCtrl } from '../controllers/review.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'

const reviewRouter = express.Router()

reviewRouter.post('/activity/:activityId', authCheckUser, reviewActivityCtrl)
reviewRouter.post('/user/:receiverId/:activityId', authCheckUser, reviewUserCtrl)


export default reviewRouter