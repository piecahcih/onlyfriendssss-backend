import express from 'express'
import { createActivitiesCtrl, getAllActivitiesCtrl } from '../controllers/activity.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'

const activityRoute = express.Router()

activityRoute.get('/',getAllActivitiesCtrl)
activityRoute.post('/',authCheckUser ,createActivitiesCtrl)
activityRoute.get('/:id',(req,res)=>{res.json("getactivitybyidjaaa")})
activityRoute.put('/:id',(req,res)=>{res.json("editactivitybyid")})
activityRoute.patch('/:id',(req,res)=>{res.json("changeactivitystatus")})

export default activityRoute