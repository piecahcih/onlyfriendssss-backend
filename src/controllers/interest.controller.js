import createHttpError from 'http-errors'
import { getUserInterest } from '../services/interest.service.js'

export async function getUserInterestCtrl(req, res, next) {
    const {id} = req.result

    const userInterests = await getUserInterest(id)

    if (!userInterests) {
        return next(createHttpError[404]('User has no interest'))
    }

    res.json({
        message: "Get all uesr interests successfully",
        interests: userInterests
    })
}