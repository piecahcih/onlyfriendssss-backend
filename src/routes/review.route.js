import express from 'express'
import { getUserCtrl, getActivityReviewsCtrl, getActivityReviewsByLocationCtrl, getSpecificReviewCtrl, reviewActivityCtrl, reviewUserCtrl, getAllActivitiessReviewsCtrl, getAllUsersReviewsCtrl, getAllReviewsMeCtrl, getPlaceRatingsCtrl, getUserRatingsCtrl, getActivityRatingsCtrl } from '../controllers/review.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'
import uploads from '../middlewares/upload.middleware.js'

const reviewRouter = express.Router()

reviewRouter.get("/activity-scores", authCheckUser,getActivityRatingsCtrl);
reviewRouter.get("/user-scores", authCheckUser,getUserRatingsCtrl);
reviewRouter.get("/place-scores", authCheckUser,getPlaceRatingsCtrl);

reviewRouter.get('/users', getAllUsersReviewsCtrl)

reviewRouter.get('/who-reviews-me', authCheckUser, getAllReviewsMeCtrl)
reviewRouter.get('/activities', getAllActivitiessReviewsCtrl)
reviewRouter.get('/activity/:activityId', getActivityReviewsCtrl)
reviewRouter.get('/place/:placeid', getActivityReviewsByLocationCtrl)
reviewRouter.get('/:reviewid', getSpecificReviewCtrl)

reviewRouter.post('/activity/:activityId', authCheckUser, uploads.array('images', 5), reviewActivityCtrl)
reviewRouter.post('/user/:activityId/:receiverId', authCheckUser, reviewUserCtrl)

reviewRouter.get('/user/:userId', authCheckUser, getUserCtrl)

export default reviewRouter
