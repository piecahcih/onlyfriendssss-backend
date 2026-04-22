import express from 'express'
import { getActivityReviewDetails, getAllActivitiesWithRating, getUser, reviewActivityCtrl, reviewUserCtrl } from '../controllers/review.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'

const reviewRouter = express.Router()

reviewRouter.get('/activity', authCheckUser, getAllActivitiesWithRating)
reviewRouter.get('/activities/:activityId/reviews', authCheckUser, getActivityReviewDetails)
reviewRouter.get('/:userId', authCheckUser, getUser)

reviewRouter.post('/activity/:activityId', authCheckUser, reviewActivityCtrl)
reviewRouter.post('/user/:activityId/:receiverId', authCheckUser, reviewUserCtrl)


export default reviewRouter