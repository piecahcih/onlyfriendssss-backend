import express from 'express'
import { authCheckUser } from '../middlewares/authenticate.js'
import { getUserInterestCtrl, suggestActivityByYourInterestCtrl } from '../controllers/interest.controller.js'

const interestRoute = express.Router()

interestRoute.get('/',authCheckUser ,getUserInterestCtrl)
interestRoute.get('/suggested',authCheckUser ,suggestActivityByYourInterestCtrl)


export default interestRoute