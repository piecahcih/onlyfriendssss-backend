import { changeActivityStatus, createActivities, getActivityById, getAllActivities } from "../services/activity.service.js";

export async function getAllActivitiesCtrl (req,res,next) {
    const foundActivities = await getAllActivities()
    res.json({ activities: foundActivities })
}

export async function createActivitiesCtrl (req,res,next) {
    const { id } = req.result
    const { category,title,description,eventStartTime,hostId,placeId } = req.body
    const Adata = { category,title,description,eventStartTime,hostId,placeId } 
    
    const createActivity = await createActivities(id,Adata)
    res.json({ activities: createActivity })
}

export async function getActivityByIdCtrl (req,res,next) {
    const { id } = req.params

    const foundActivity = await getActivityById(Number(id))
    res.json({ activities: foundActivity })
}

export async function editActivityByIdCtrl (req,res,next) {
    const { id } = req.params

    const editActivity = await getAllActivities(Number(id))
    res.json({ activities: editActivity })
}

export async function changeActivityStatusCtrl (req,res,next) {
    const { id } = req.params
    const { status } = req.body

    const statusActivity = await changeActivityStatus(Number(id), status)
    res.json({ activities: statusActivity })
}