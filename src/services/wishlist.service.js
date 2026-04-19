import { prisma } from "../lib/prisma.js";


export async function getWishlist(userId) {
  return await prisma.wishlist.findMany({
    where: { userId: userId },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      activity: {
        include: {
          place: true,
          host: true,
          joinRequests: { include: { user: true } }
        }
      }
    }
  })
}

export async function addWishlist(userId, activityId) {
  return await prisma.wishlist.create({
    data: {
      userId: userId,
      activityId: activityId
    }
  })
}

export async function removeWishlist(userId, activityId) {
  return await prisma.wishlist.deleteMany({
    where: {
      userId: Number(userId),
      activityId: Number(activityId)
    }
  })
}