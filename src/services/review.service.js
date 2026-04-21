import { prisma } from "../lib/prisma.js";


export async function createActivityReview(reviewerId, activityId, { rating, comment, imageUrl }) {
  return await prisma.review.create({
    data: {
      rating: Number(rating),
      comment: comment,
      imageUrl: imageUrl,
      reviewerId: Number(reviewerId),
      activityId: Number(activityId)
    }
  })
}

export async function getActivityReviews(activityId) {
  return await prisma.review.findMany({
    where: {
      activityId: Number(activityId),
      receiverId: null
    },
    include: {
      reviewer: {
        select: {
          firstName: true,
          lastName: true,
          profileImg: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createUserReview(reviewerId, activityId, receiverId, { rating, comment, imageUrl }) {
  return await prisma.review.create({
    data: {
      rating: Number(rating),
      comment: comment,
      imageUrl: imageUrl,
      reviewerId: Number(reviewerId),
      activityId: Number(activityId),
      receiverId: Number(receiverId)
    }
  })
}

export async function getUserReviews(userId) {
  return await prisma.review.findMany({
    where: {
      receiverId: Number(userId)
    },
    include: {
      reviewer: {
        select: {
          firstName: true,
          profileImg: true
        }
      },
      activity: {
        select: { title: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}