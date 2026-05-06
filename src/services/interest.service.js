import { prisma } from "../lib/prisma.js";

export async function getUserInterest(userid) {
    try {
        return await prisma.interest.findMany({
            where: { userId: userid }
        })
        
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }

}

export async function exploreActivities(userid) {
    const AreInWishlist = await prisma.wishlist.findMany({
        where: {userId: userid},
        select: { activityId: true }
    })

    const wishlistIds = AreInWishlist.map(item => item.activityId)

    try {
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
        
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }

}

export async function getUserSuggestedActivitiesByInterest(userid, categoriesArray) {
    // console.log('userid', userid)
    // console.log('categoriesArray', categoriesArray)
    const AreInWishlist = await prisma.wishlist.findMany({
        where: {userId: userid},
        select: { activityId: true }
    })

    const wishlistIds = AreInWishlist.map(item => item.activityId)

    try {
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
        
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }

}