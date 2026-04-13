import express from 'express'
import { changeActivityStatusCtrl, createActivitiesCtrl, deleteActivityByIdCtrl, editActivityByIdCtrl, getActivityByCategoryCtrl, getActivityByIdCtrl, getAllActivitiesCreatedByThisAccountCtrl, getAllActivitiesCtrl } from '../controllers/activity.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'

const activityRoute = express.Router()

activityRoute.get('/',getAllActivitiesCtrl)
activityRoute.get('/my-activities',authCheckUser ,getAllActivitiesCreatedByThisAccountCtrl)
activityRoute.get('/:activityid',getActivityByIdCtrl)
activityRoute.get('/category/:category',getActivityByCategoryCtrl)
activityRoute.post('/',authCheckUser ,createActivitiesCtrl)
activityRoute.put('/:activityid',authCheckUser ,editActivityByIdCtrl)
activityRoute.patch('/:activityid',changeActivityStatusCtrl)
activityRoute.delete('/:activityid',authCheckUser ,deleteActivityByIdCtrl)


export default activityRoute
