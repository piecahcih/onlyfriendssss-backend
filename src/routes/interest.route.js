import express from 'express'
import { authCheckUser } from '../middlewares/authenticate.js'
import { getUserInterestCtrl } from '../controllers/interest.controller.js'

const interestRoute = express.Router()

interestRoute.get('/',authCheckUser ,getUserInterestCtrl)


export default interestRoute