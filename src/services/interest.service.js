import { prisma } from "../lib/prisma.js";

export function getUserInterest(userid) {
    return prisma.interest.findMany({
        where: { userId: userid }
    })
}

export function getUserSuggestedActivitiesByInterest(userid, categoriesArray) {
    return prisma.activity.findMany({
        where: {
            status: { not: 'CANCELLED' },
            eventStartTime: { gte: new Date() },
            category: {
                in: categoriesArray
            },
            hostId: { not: userid },
            joinRequests: {
                none: {
                    userId: userid,
                }
            },
        },
        orderBy: {
            eventStartTime: 'asc'
        },
        take: 25
    })
}