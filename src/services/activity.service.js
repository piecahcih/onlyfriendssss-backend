import { prisma } from "../lib/prisma.js";

export async function getAllActivities () {
    return await prisma.activity.findMany({
        orderBy : { id : 'desc' }
    })
}

export async function createActivities (userid,Adata) {
    return await prisma.activity.create({
        where: { userId: userid },
        data: Adata
    })
}