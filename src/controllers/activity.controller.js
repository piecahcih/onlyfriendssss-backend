import { changeActivityStatus, createActivity, deleteActivityById, editActivityById, getActivitiesCreatedByThisAccount, getActivitiesJoinedByThisAccount, getActivityByCategory, getActivityById, getAllActivities, getAllCurrentActivities, getFinishedActivitiesOnThisAccount, getOrAddPlaceId } from "../services/activity.service.js";
import createHttpError from 'http-errors'

export async function getAllActivitiesCtrl (req,res,next) {
    const foundActivities = await getAllActivities()

    res.json({ 
        message: "Get all activities successfully",        
        activities: foundActivities
    })
}

export async function getAllCurrentActivitiesCtrl (req,res,next) {
    const foundActivities = await getAllCurrentActivities()
    res.json({ 
        message: "Get all current activities successfully",        
        activities: foundActivities 
    })
}

export async function getAllFinishedActivitiesOnThisAccountCtrl (req,res,next) {
    const { id } = req.result

    const foundMyPastActivities = await getFinishedActivitiesOnThisAccount(id)
    res.json({ 
        message: "Successfully get all finished activities on this profile",        
        activities: foundMyPastActivities
    })
}

export async function getAllActivitiesCreatedByThisAccountCtrl (req,res,next) {
    const { id } = req.result

    const foundMyCreatedActivities = await getActivitiesCreatedByThisAccount(id)
    res.json({ 
        message: "Successfully get all activities created by this profile",        
        activities: foundMyCreatedActivities
    })
}

export async function getAllActivitiesJoinedByThisAccountCtrl (req,res,next) {
    const { id } = req.result

    const foundMyJoinedActivities = await getActivitiesJoinedByThisAccount(id)
    res.json({ 
        message: "Successfully get all activities joined by this profile",        
        activities: foundMyJoinedActivities
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
    const { maxParticipants,isPublic,category,title,description,eventStartTime,eventEndTime,placeName,address,latitude,longitude } = req.body
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

    const placeId = await getOrAddPlaceId(placeName,address,parseInt(latitude),parseInt(longitude))
    // console.log('placeId', placeId)
    // console.log(typeof placeId)
    
    const localFilePath = req.file ? req.file.path : null;
    
    const Adata = { category,title,description,
        isPublic: JSON.parse(isPublic),
        placeId: parseInt(placeId),
        hostId: id ,
        eventStartTime: new Date(eventStartTime),
    } 

    if (localFilePath) {
      Adata.coverPhoto = `/uploads/${localFilePath}`;
    }

    if(eventEndTime){
        Adata.eventEndTime = new Date(eventEndTime)
    }
    if(maxParticipants){
        Adata.maxParticipants = parseInt(maxParticipants)
    }
    
    const createdActivity = await createActivity(Adata,localFilePath)
    res.json({
        message: "Activity created successfully",
        activities: createdActivity 
    })
}

export async function editActivityByIdCtrl (req,res,next) {
    const { id } = req.result
    const { activityid } = req.params
    const { maxParticipants,isPublic,category,title,description,eventStartTime,eventEndTime,placeName,address,latitude,longitude } = req.body
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

    const localFilePath = req.file ? req.file.path : null;
    
    const Editdata = { hostId: id } 

    if(isPublic !== undefined ){
        Editdata.isPublic = JSON.parse(isPublic)
    }
    if (localFilePath) {
      Editdata.coverPhoto = `/uploads/${localFilePath}`;
    }
    if(placeName && address && latitude && longitude){
        const placeId = await getOrAddPlaceId(placeName,address,parseInt(latitude),parseInt(longitude))
        Editdata.placeId = parseInt(placeId)
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
    if(maxParticipants){
        Adata.maxParticipants = parseInt(maxParticipants)
    }
    
    const editActivity = await editActivityById(id, Number(activityid), Editdata, localFilePath)
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