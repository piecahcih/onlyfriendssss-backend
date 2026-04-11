import express from 'express'
import { changeActivityStatusCtrl, createActivitiesCtrl, deleteActivityByIdCtrl, editActivityByIdCtrl, getActivityByIdCtrl, getAllActivitiesCtrl } from '../controllers/activity.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'

const activityRoute = express.Router()

activityRoute.get('/',getAllActivitiesCtrl)
activityRoute.post('/',authCheckUser ,createActivitiesCtrl)
activityRoute.get('/:activityid',getActivityByIdCtrl)
activityRoute.put('/:activityid',editActivityByIdCtrl)
activityRoute.patch('/:activityid',changeActivityStatusCtrl)
activityRoute.delete('/:activityid',authCheckUser ,deleteActivityByIdCtrl)


export default activityRoute