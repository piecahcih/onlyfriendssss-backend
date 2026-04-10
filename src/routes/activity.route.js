import express from 'express'

const activityRoute = express.Router()

activityRoute.get('/',(req,res)=>{res.json("getactivity")})
activityRoute.post('/',(req,res)=>{res.json("getactivity")})
activityRoute.get('/:id',(req,res)=>{res.json("getactivitybyid")})
activityRoute.put('/:id',(req,res)=>{res.json("getactivitybyid")})
activityRoute.patch('/:id',(req,res)=>{res.json("changeactivitystatus")})

export default activityRoute