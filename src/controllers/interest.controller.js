import createHttpError from 'http-errors'
import { exploreActivities, getUserInterest, getUserSuggestedActivitiesByInterest } from '../services/interest.service.js'

export async function getUserInterestCtrl(req, res, next) {
    const { id } = req.result

    const userInterests = await getUserInterest(id)

    if (!userInterests) {
        return next(createHttpError[404]('User has no interest'))
    }

    res.json({
        message: "Get all uesr interests successfully",
        interests: userInterests
    })
}

export async function exploreActivityCtrl(req, res, next) {
    const { id } = req.result

    const suggestsAct = await exploreActivities(id)

    if (!suggestsAct) {
        return next(createHttpError[404]('User has no interest'))
    }

    res.json({
        message: "Get all uesr interests successfully",
        suggests: suggestsAct
    })
}


export async function suggestActivityByYourInterestCtrl(req, res, next) {
    const { id } = req.result

    const userInterests = await getUserInterest(id)
    if (!userInterests) {
        return next(createHttpError[404]('User has no interest'))
    }
    // console.log('userInterests', userInterests)


    const INTEREST_MAP = {
        foodie: 'FOOD', cafe_hopping: 'FOOD', street_food: 'FOOD', fine_dining: 'FOOD', cooking_baking: 'FOOD', drinks_nightout: 'FOOD',
        slowlife: 'HEALTH', health: 'HEALTH', sport: 'HEALTH', camping: 'HEALTH', gym_workout: 'HEALTH', yoga_pilates: 'HEALTH', running: 'HEALTH', mental_wellness: 'HEALTH', team_sports: 'HEALTH',
        art: 'ART', museum_gallery: 'ART', photography: 'ART', crafting_diy: 'ART', live_music: 'ART', book_club: 'ART',
        gaming: 'ENTERTAINMENT', movies_cinema: 'ENTERTAINMENT', board_games: 'ENTERTAINMENT', video_games: 'ENTERTAINMENT', karaoke: 'ENTERTAINMENT', concerts_festivals: 'ENTERTAINMENT',
        travel: 'TRAVEL', volunteer: 'TRAVEL', backpacking: 'TRAVEL', road_trip: 'TRAVEL', beach_vibes: 'TRAVEL', hiking_trekking: 'TRAVEL', sightseeing: 'TRAVEL'
    };


    const userInterestCategories = [
        ...new Set(userInterests.map(interest => INTEREST_MAP[interest.category]))
    ]
    // console.log('userInterestCategories', userInterestCategories)

    const suggestActivities = await getUserSuggestedActivitiesByInterest(id, userInterestCategories)
    // console.log('suggestActivities', suggestActivities)
    if (!suggestActivities) {
        return next(createHttpError[404]('There\'s no suggest activities'))
    }


    res.json({
        message: "Get sugested activities successfully",
        suggests: suggestActivities
    })
}