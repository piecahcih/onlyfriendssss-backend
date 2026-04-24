import { prisma } from "../lib/prisma.js";
import { createNoti } from "./notification.service.js";
import { sendNotification } from "../socket/noti.handler.js";


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


export const getAllReviewsMe = async (id) => {
  return await prisma.review.findMany({
    where: {
      receiverId: id,
      reviewType: 'PERSON'
    },
    include: {
      reviewer: {
        select: { id: true, username: true, profileImg: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}
export const getAllUsersReviews = async () => {
  return await prisma.review.findMany({
    where: {
      reviewType: 'PERSON'
    },
    include: {
      reviewer: {
        select: { id: true, username: true, profileImg: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}
export const getAllActivitiesReviews = async () => {
  return await prisma.review.findMany({
    where: {
      reviewType: 'ACTIVITY'
    },
    include: {
      activity: true,
      reviewer: {
        select: { id: true, username: true, profileImg: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const getActivityReviews = async (activityId) => {
  return await prisma.review.findMany({
    where: {
      activityId: Number(activityId),
      reviewType: 'ACTIVITY'
    },
    include: {
      activity: true,
      reviewer: {
        select: { id: true, username: true, profileImg: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const getSpecificReview = async (reviewid) => {
  return await prisma.review.findFirst({
    where: { id: reviewid },
    include: {
      activity: true,
      reviewer: {
        select: { id: true, username: true, profileImg: true }
      }
    }
  })
}

export const getActivityReviewsByLocation = async (placeid) => {
  return await prisma.review.findMany({
    where: {
      activityId: { placeId: placeid },
      reviewType: 'ACTIVITY'
    },
    include: {
      activity: {
        include: { place: true }
      },
      reviewer: {
        select: { id: true, username: true, profileImg: true }
      }
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

export async function getUserById(userId) {
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

export const createUserReview = async (io, reviewerId, activityId, receiverId, data) => {
  const review = await prisma.review.create({
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

  await createNoti({
    userId: Number(receiverId),
    senderId: Number(reviewerId),
    type: "NEW_REVIEW",
    message: "gave you a review",
    refId: review.id,
  });

  sendNotification(io, {
    userId: Number(receiverId),
    senderId: Number(reviewerId),
    type: "NEW_REVIEW",
    message: "gave you a review",
    refId: review.id,
  });

  return review;
}
