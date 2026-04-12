import { changeActivityStatus, createActivities, deleteActivityById, editActivityById, getActivityById, getAllActivities } from "../services/activity.service.js";

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
    const { activityid } = req.params

    const foundActivity = await getActivityById(Number(activityid))
    res.json({ activities: foundActivity })
}

export async function editActivityByIdCtrl (req,res,next) {
    const { id } = req.result
    const { activityid } = req.params
    const { peach } = req.body

    const Editdata = { peach }
    
    const editActivity = await editActivityById(id, Number(activityid), Editdata)
    res.json({ 
        message: "Activity has been edited",
        activities: editActivity
     })
}

export async function changeActivityStatusCtrl (req,res,next) {
    const { activityid } = req.params
    const { status } = req.body
    
    const statusActivity = await changeActivityStatus(Number(activityid), status)
    res.json({ 
        message: "Activity Status changed successfully",
        activities: statusActivity
     })
}

export async function deleteActivityByIdCtrl (req,res,next) {
    const { id } = req.result
    const { activityid } = req.params
    console.log('id', id)
    console.log('activityid', activityid)

    const deletedActivity = await deleteActivityById(id, Number(activityid))
    res.json({ 
        message: "Activity deleted successfully",
        activities: deletedActivity
     })
}