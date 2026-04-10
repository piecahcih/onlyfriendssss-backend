import { createActivities, getAllActivities } from "../services/activity.service.js";

export async function getAllActivitiesCtrl (req,res,next) {
    const foundActivity = await getAllActivities()
    res.json({ activities: foundActivity })
}

export async function createActivitiesCtrl (req,res,next) {
    const {id} = req.user

    const createActivity = await createActivities(userid,Adata)
    res.json({ activities: createActivity })
}