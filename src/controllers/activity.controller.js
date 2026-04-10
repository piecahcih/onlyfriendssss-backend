import { createActivities, getAllActivities } from "../services/activity.service.js";

export async function getAllActivitiesCtrl (req,res,next) {
    const foundActivity = await getAllActivities()
    res.json({ activities: foundActivity })
}

export async function createActivitiesCtrl (req,res,next) {
    const { id } = req.result
    const { category,title,description,eventStartTime,hostId,placeId } = req.body
    const Adata = { category,title,description,eventStartTime,hostId,placeId } 

    const createActivity = await createActivities(id,Adata)
    res.json({ activities: createActivity })
}