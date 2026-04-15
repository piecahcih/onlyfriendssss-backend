import { changeActivityStatus, createActivity, deleteActivityById, editActivityById, getActivitiesJoinedByThisAccount, getActivitiesOnThisAccount, getActivityByCategory, getActivityById, getAllActivities, getAllCurrentActivities } from "../services/activity.service.js";
import createHttpError from 'http-errors'

//function for updating activity status to FINISHED jaa
const applyFinishedStatus = (activities) => {
    return activities.map(activity => {
        if (activity.eventEndTime && new Date(activity.eventEndTime) < new Date()) {
            return { ...activity, status: 'FINISHED' }
        }
        return activity;
    })
}




export async function getAllActivitiesCtrl (req,res,next) {
    const foundActivities = await getAllActivities()

    res.json({ 
        message: "Get all activities successfully",        
        activities: applyFinishedStatus(foundActivities)
    })
}

export async function getAllCurrentActivitiesCtrl (req,res,next) {
    const foundActivities = await getAllCurrentActivities()
    res.json({ 
        message: "Get all current activities successfully",        
        activities: foundActivities 
    })
}

export async function getAllActivitiesCreatedByThisAccountCtrl (req,res,next) {
    const { id } = req.result

    const foundMyActivities = await getActivitiesOnThisAccount(id)
    res.json({ 
        message: "Successfully get all activities created by this profile",        
        activities: applyFinishedStatus(foundMyActivities) 
    })
}

export async function getAllActivitiesJoinedByThisAccountCtrl (req,res,next) {
    const { id } = req.result

    const foundMyActivities = await getActivitiesJoinedByThisAccount(id)
    res.json({ 
        message: "Successfully get all activities joined by this profile",        
        activities: applyFinishedStatus(foundMyActivities) 
    })
}

export async function getActivityByIdCtrl (req,res,next) {
    const { activityid } = req.params

    const foundActivity = await getActivityById(Number(activityid))

    if(!foundActivity) {
        return next(createHttpError[404]('Activity Not Found'))
    }

    res.json({ 
        message: "Get specific activity successfully",        
        activities: foundActivity 
    })
}

export async function getActivityByCategoryCtrl (req,res,next) {
    const { category } = req.params

    const foundActivityByCategory = await getActivityByCategory(category.toUpperCase())
    res.json({ 
        message: "Get specific activity successfully",        
        activities: foundActivityByCategory 
    })
}




export async function createActivityCtrl (req,res,next) {
    const { id } = req.result
    const { isPublic,coverPhoto,category,title,description,eventStartTime,eventEndTime,placeId } = req.body
    const eventStTime = new Date(eventStartTime)

    if(eventStTime < new Date()){
        return next(createHttpError[400]('Event start time cannot be in the past.'))
    }

    if(eventEndTime){
        const eventETime = new Date(eventEndTime)

        if(eventETime < new Date() ){
            return next(createHttpError[400]('Event end time cannot be in the past.'))
        }

        if(eventStTime>=eventETime){
            return next(createHttpError[400]('Event start time must be before event end time.'))
        }
    }
    
    const Adata = { isPublic,coverPhoto,category,title,description,placeId,
        hostId: id ,
        eventStartTime: new Date(eventStartTime),
    } 

    if(eventEndTime){
        Adata.eventEndTime = new Date(eventEndTime)
    }
    
    const createdActivity = await createActivity(Adata)
    res.json({
        message: "Activity created successfully",
        activities: createdActivity 
    })
}

export async function editActivityByIdCtrl (req,res,next) {
    const { id } = req.result
    const { activityid } = req.params
    const { isPublic,coverPhoto,category,title,description,eventStartTime,eventEndTime,placeId } = req.body
    const eventStTime = new Date(eventStartTime)

    if(eventStTime < new Date()){
        return next(createHttpError[400]('Event start time cannot be in the past.'))
    }

    if(eventEndTime){
        const eventETime = new Date(eventEndTime)

        if(eventETime < new Date() ){
            return next(createHttpError[400]('Event end time cannot be in the past.'))
        }

        if(eventStTime>=eventETime){
            return next(createHttpError[400]('Event start time must be before event end time.'))
        }
    }
    
    const Editdata = { hostId: id } 

    if(isPublic !== undefined ){
        Editdata.isPublic = isPublic
    }
    if(coverPhoto){
        Editdata.coverPhoto = coverPhoto
    }
    if(placeId){
        Editdata.placeId = placeId
    }
    if(category){
        Editdata.category = category
    }
    if(title){
        Editdata.title = title
    }
    if(description){
        Editdata.description = description
    }
    if(eventStartTime){
        Editdata.eventStartTime = new Date(eventStartTime)
    }
    if(eventEndTime){
        Editdata.eventEndTime = new Date(eventEndTime)
    }
    
    const editActivity = await editActivityById(id, Number(activityid), Editdata)
    res.json({ 
        message: "Activity has been edited",
        activities: editActivity
     })
}

export async function changeActivityStatusCtrl (req,res,next) {
    const { id } = req.result
    const { activityid } = req.params
    const { status } = req.body

    const activity = await getActivityById(Number(activityid))
    if (!activity) return next(createHttpError[404]('Activity not found'))
    if (activity.hostId !== id) {
        return next(createHttpError[403]('Only the host can cancel this activity!')) 
    }

    const statusActivity = await changeActivityStatus(Number(activityid), status)
    res.json({ 
        message: "Activity Status changed successfully",
        activities: statusActivity
     })
}

export async function deleteActivityByIdCtrl (req,res,next) {
    const { id } = req.result
    const { activityid } = req.params
    // console.log('id', id)
    // console.log('activityid', activityid)

    const deletedActivity = await deleteActivityById(id, Number(activityid))
    res.json({ 
        message: "Activity deleted successfully",
        activities: deletedActivity
     })
}