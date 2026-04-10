import { prisma } from "../lib/prisma";

export async function getAllActivities () {
    return await prisma.activity.findMany({
        orderBy : { id : 'desc' }
    })
}