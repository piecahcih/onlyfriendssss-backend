import { prisma } from "../lib/prisma.js";

export async function getAllActivities () {
    return await prisma.activity.findMany({
        orderBy : { id : 'desc' }
    })
}