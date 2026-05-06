import createHttpError from 'http-errors'
import { getPlaceData } from '../services/place.service.js'

export async function getAllPlaceCtrl(req, res, next) {
    const { query } = req.query

    const queryPlaceData = await getPlaceData(query)

    res.json({
        message: "Get place data from query",
        places: queryPlaceData
    })
}