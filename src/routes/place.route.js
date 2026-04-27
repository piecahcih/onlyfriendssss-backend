import express from 'express'
import { getAllPlaceCtrl } from '../controllers/place.controller.js'

const placeRoute = express.Router()

placeRoute.get('/',getAllPlaceCtrl)

export default placeRoute