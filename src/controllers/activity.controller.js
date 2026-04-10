import { getAllActivities } from "../services/activity.service.js";

export async function getAllActivitiesCtrl (req,res,next) {
    const foundActivity = await getAllActivities()
    res.json({ activities: foundActivity })
}