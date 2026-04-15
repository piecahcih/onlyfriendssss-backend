import express from 'express'
import { changeActivityStatusCtrl, createActivityCtrl, deleteActivityByIdCtrl, editActivityByIdCtrl, getActivityByCategoryCtrl, getActivityByIdCtrl, getAllActivitiesCreatedByThisAccountCtrl, getAllActivitiesCtrl, getAllActivitiesJoinedByThisAccountCtrl, getAllCurrentActivitiesCtrl } from '../controllers/activity.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'

const activityRoute = express.Router()

activityRoute.get('/',getAllCurrentActivitiesCtrl)
activityRoute.get('/all',getAllActivitiesCtrl)
activityRoute.get('/my-activities',authCheckUser ,getAllActivitiesCreatedByThisAccountCtrl)
activityRoute.get('/my-joined-activities',authCheckUser ,getAllActivitiesJoinedByThisAccountCtrl)
activityRoute.patch('/status/:activityid',authCheckUser ,changeActivityStatusCtrl)
activityRoute.get('/category/:category',getActivityByCategoryCtrl)
activityRoute.get('/:activityid',getActivityByIdCtrl)
activityRoute.post('/',authCheckUser ,createActivityCtrl)
activityRoute.patch('/:activityid',authCheckUser ,editActivityByIdCtrl)
activityRoute.delete('/:activityid',authCheckUser ,deleteActivityByIdCtrl)


export default activityRoute
