import express from 'express'
import { cancelActivityStatusCtrl, changeActivityStatusCtrl, createActivityCtrl, deleteActivityByIdCtrl, editActivityByIdCtrl, getActivityByCategoryCtrl, getActivityByIdCtrl, getAllActivitiesCreatedByThisAccountCtrl, getAllActivitiesCtrl, getAllActivitiesJoinedByThisAccountCtrl, getAllCurrentActivitiesCtrl, getAllFinishedActivitiesOnThisAccountCtrl } from '../controllers/activity.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'
import uploads from '../middlewares/upload.middleware.js'

const activityRoute = express.Router()

activityRoute.get('/',getAllCurrentActivitiesCtrl)
activityRoute.get('/all',getAllActivitiesCtrl)
activityRoute.get('/my-memories',authCheckUser ,getAllFinishedActivitiesOnThisAccountCtrl)
activityRoute.get('/my-created-activities',authCheckUser ,getAllActivitiesCreatedByThisAccountCtrl)
activityRoute.get('/my-joined-activities',authCheckUser ,getAllActivitiesJoinedByThisAccountCtrl)
activityRoute.patch('/cancel/:activityid',authCheckUser ,cancelActivityStatusCtrl)
activityRoute.patch('/status/:activityid',authCheckUser ,changeActivityStatusCtrl)
activityRoute.get('/category/:category',getActivityByCategoryCtrl)
activityRoute.get('/:activityid',getActivityByIdCtrl)
activityRoute.post('/',authCheckUser ,uploads.single("coverPhoto") ,createActivityCtrl)
activityRoute.patch('/:activityid',authCheckUser ,uploads.single("coverPhoto") ,editActivityByIdCtrl)
activityRoute.delete('/:activityid',authCheckUser ,deleteActivityByIdCtrl)


export default activityRoute
