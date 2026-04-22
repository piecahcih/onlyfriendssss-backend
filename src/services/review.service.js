import { prisma } from "../lib/prisma.js";


export const createActivityReview = async (reviewerId, activityId, data) => {
  return await prisma.review.create({
    data: {
      rating: Number(data.rating),
      comment: data.comment,
      imageUrl: data.imageUrl,
      reviewType: 'ACTIVITY',
      reviewerId: Number(reviewerId),
      activityId: Number(activityId),
    }
  })
}

export const getActivityReviews = async (activityId) => {
  return await prisma.review.findMany({
    where: {
      activityId: Number(activityId),
      reviewType: 'ACTIVITY'
    },
    include: {
      reviewer: {
        select: { id: true, username: true, profileImg: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}
export const createUserReview = async (reviewerId, activityId, receiverId, data) => {
  return await prisma.review.create({
    data: {
      rating: Number(data.rating),
      comment: data.comment,
      imageUrl: data.imageUrl,
      reviewType: 'PERSON',
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

export async function getUserById (userId) {
  return await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
      username: true,
      profileImg: true,
    },
  });
};