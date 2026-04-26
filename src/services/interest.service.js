import { prisma } from "../lib/prisma.js";

export async function getUserInterest(userid) {
    return await prisma.interest.findMany({
        where: { userId: userid }
    })
}

export async function exploreActivities(userid) {
    const AreInWishlist = await prisma.wishlist.findMany({
        where: {userId: userid},
        select: { activityId: true }
    })

    const wishlistIds = AreInWishlist.map(item => item.activityId)

    return prisma.activity.findMany({
        where: {
            id: { notIn: wishlistIds },
            status: { not: 'CANCELLED' },
            eventStartTime: { gte: new Date() },
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
        include: {
            place: true,
            host: true,
            joinRequests: {
                include: { user: true }
            }
        },
        take: 25
    })
}

export async function getUserSuggestedActivitiesByInterest(userid, categoriesArray) {
    // console.log('userid', userid)
    // console.log('categoriesArray', categoriesArray)
    const AreInWishlist = await prisma.wishlist.findMany({
        where: {userId: userid},
        select: { activityId: true }
    })

    const wishlistIds = AreInWishlist.map(item => item.activityId)

    return prisma.activity.findMany({
        where: {
            id: { notIn: wishlistIds },
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
        include: {
            place: true,
            host: true,
            joinRequests: {
                include: { user: true }
            }
        },
        take: 25
    })
}