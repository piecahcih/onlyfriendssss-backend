import express from 'express'
import { changeActivityStatusCtrl, createActivitiesCtrl, getActivityByIdCtrl, getAllActivitiesCtrl } from '../controllers/activity.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'

const activityRoute = express.Router()

activityRoute.get('/',getAllActivitiesCtrl)
activityRoute.post('/',authCheckUser ,createActivitiesCtrl)
activityRoute.get('/:id',getActivityByIdCtrl)
activityRoute.put('/:id',(req,res)=>{res.json("editactivitybyid")})
activityRoute.patch('/:id',changeActivityStatusCtrl)
//delete activity

export default activityRoute