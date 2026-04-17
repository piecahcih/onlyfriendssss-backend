import { prisma } from "../lib/prisma.js";

export async function getAllActivities () {
    return await prisma.activity.findMany({
        orderBy : { id : 'desc' },
        include :{
            place: true,
            host: true,
            joinRequests: {
                include: { user: true }
            }
        }
    })
}

export async function getAllCurrentActivities () {
    return await prisma.activity.findMany({
        where:{
            eventStartTime: { gte: new Date() }
        },
        orderBy : { id : 'desc' },
        include :{
            place: true,
            host: true,
            joinRequests: {
                include: { user: true }
            }
        }
    })
}

export async function getFinishedActivitiesOnThisAccount (userid) {
    return await prisma.activity.findMany({
        orderBy : { id : 'desc' },
        where: { status: 'FINISHED',
            OR: [
                { hostId : userid },
                {            
                  joinRequests: {
                    some: {
                        userId: userid,
                        status: 'APPROVED'
                    }                
                }}
            ]
         },
        include :{
            place: true,
            host: true,
            joinRequests: {
                include: { user: true }
            }
        }
    })
}

export async function getActivitiesCreatedByThisAccount (userid) {
    return await prisma.activity.findMany({
        orderBy : { id : 'desc' },
        where: { hostId : userid },
        include :{
            place: true,
            host: true,
            joinRequests: {
                include: { user: true }
            }
        }
    })
}

export async function getActivitiesJoinedByThisAccount (userid) {
    return await prisma.activity.findMany({
        orderBy : { eventStartTime: 'asc' },
        where: { 
            //some เพราะมีคนjoinหลายคน ถ้าสักคนที่จอยในแอคทิวิตี้นั้นเป็นuserเราก็จะใช่ (มีnone/everyด้วย)
            joinRequests: {
                some: {
                        userId: userid,
                        status: 'APPROVED'
                    }                
            }
        },
        include :{
            place: true,
            host: true,
            joinRequests: {
                include: { user: true }
            }
        }
    })
}

export async function getActivityById (activityId) {
    return await prisma.activity.findUnique({
        where : { id : activityId },
        include :{
            place: true,
            host: true,
            joinRequests: {
                include: { user: true }
            }
        }
    })
}

export async function getActivityByCategory (category) {
    return await prisma.activity.findMany({
        where: { category : category },
        orderBy : { id : 'desc' },
        include :{
            place: true,
            host: true,
            joinRequests: {
                include: { user: true }
            }
        }
    })
}

export async function createActivity (Adata) {
    return await prisma.activity.create({
        data: Adata
    })
}

export async function editActivityById (userid,activityId,Editdata) {
    return await prisma.activity.update({
        where : { hostId: userid, id : activityId },
        data: Editdata
    })
}

export async function changeActivityStatus (activityId,status) {
    return await prisma.activity.update({
        where : { id : activityId },
        data: { status: status }
    })
}

export async function deleteActivityById (userid,activityId) {
    return await prisma.activity.delete({
        where : { hostId: userid, id : activityId }
    })
}