import express from 'express'
import { authCheckUser } from '../middlewares/authenticate.js'
import { exploreActivityCtrl, getUserInterestCtrl, suggestActivityByYourInterestCtrl } from '../controllers/interest.controller.js'

const interestRoute = express.Router()

interestRoute.get('/',authCheckUser ,getUserInterestCtrl)
interestRoute.get('/suggested',authCheckUser ,suggestActivityByYourInterestCtrl)
interestRoute.get('/suggested-all',authCheckUser ,exploreActivityCtrl)


export default interestRoute