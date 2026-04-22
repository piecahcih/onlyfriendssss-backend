import express from 'express'
import { getUserCtrl, getActivityReviewsCtrl, getActivityReviewsByLocationCtrl, getActivityRatingScoreCtrl, getSpecificReviewCtrl, reviewActivityCtrl, reviewUserCtrl, getAllActivitiessReviewsCtrl, getAllUsersReviewsCtrl } from '../controllers/review.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'

const reviewRouter = express.Router()

reviewRouter.get('/activity-score', authCheckUser, getActivityRatingScoreCtrl)
// reviewRouter.get('/user-score', authCheckUser, getActivityRatingScoreCtrl)
// reviewRouter.get('/location-score', authCheckUser, getActivityRatingScoreCtrl)
reviewRouter.get('/users', getAllUsersReviewsCtrl)
reviewRouter.get('/activities', getAllActivitiessReviewsCtrl)
reviewRouter.get('/activity/:activityId', getActivityReviewsCtrl)
reviewRouter.get('/:reviewid', getSpecificReviewCtrl)
reviewRouter.get('/place/:placeid', getActivityReviewsByLocationCtrl)
reviewRouter.get('/user/:userId', authCheckUser, getUserCtrl)

reviewRouter.post('/activity/:activityId', authCheckUser, reviewActivityCtrl)
reviewRouter.post('/user/:activityId/:receiverId', authCheckUser, reviewUserCtrl)


export default reviewRouter