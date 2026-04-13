import { prisma } from "../lib/prisma.js";

export async function getAllActivities () {
    return await prisma.activity.findMany({
        orderBy : { id : 'desc' },
        include :{
            place: true
        }
    })
}

export async function getActivitiesOnThisAccount (id) {
    return await prisma.activity.findMany({
        orderBy : { id : 'desc' },
        where: { hostId : id },
        include :{
            place: true
        }
    })
}

export async function getActivityById (activityId) {
    return await prisma.activity.findUnique({
        where : { id : activityId },
        include :{
            place: true
        }
    })
}

export async function getActivityByCategory (category) {
    return await prisma.activity.findMany({
        where: { category : category },
        orderBy : { id : 'desc' },
        include :{
            place: true
        }
    })
}

export async function createActivities (userid,Adata) {
    return await prisma.activity.create({
        where: { userId: userid },
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