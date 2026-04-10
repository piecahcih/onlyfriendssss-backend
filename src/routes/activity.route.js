import express from 'express'
import { getAllActivitiesCtrl } from '../controllers/activity.controller.js'

const activityRoute = express.Router()

activityRoute.get('/',getAllActivitiesCtrl)
activityRoute.post('/',(req,res)=>{res.json("addactivity")})
activityRoute.get('/:id',(req,res)=>{res.json("getactivitybyid")})
activityRoute.put('/:id',(req,res)=>{res.json("editactivitybyid")})
activityRoute.patch('/:id',(req,res)=>{res.json("changeactivitystatus")})

export default activityRoute