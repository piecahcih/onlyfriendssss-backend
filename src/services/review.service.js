import { prisma } from "../lib/prisma.js";
import { createNoti } from "./notification.service.js";
import { sendNotification } from "../socket/noti.handler.js";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs/promises";
import path from "path";

export const createActivityReview = async (reviewerId, activityId, data, localFilePaths) => {
  // ตรวจสอบว่าเคยรีวิวกิจกรรมนี้ไปแล้วหรือยัง
  const existingReview = await prisma.review.findFirst({
    where: {
      reviewerId: Number(reviewerId),
      activityId: Number(activityId),
      reviewType: 'ACTIVITY'
    }
  });

  if (existingReview) {
    throw new Error("You have already reviewed this activity");
  }

  let imageUrls = [];

  if (localFilePaths && localFilePaths.length > 0) {
    console.log(`Uploading ${localFilePaths.length} images to Cloudinary...`);
    for (const localFilePath of localFilePaths) {
      const absolutePath = path.isAbsolute(localFilePath)
        ? localFilePath
        : path.join(process.cwd(), localFilePath);

      try {
        const uploadResult = await cloudinary.uploader.upload(absolutePath, {
          folder: "review_images",
        });
        imageUrls.push(uploadResult.secure_url);
        console.log(`Uploaded: ${uploadResult.secure_url}`);
        await fs.unlink(absolutePath).catch(() => { });
      } catch (uploadErr) {
        console.error("Cloudinary Upload Error for file:", localFilePath, uploadErr);
        await fs.unlink(absolutePath).catch(() => { });
      }
    }
  }

  return await prisma.review.create({
    data: {
      rating: Number(data.rating),
      comment: data.comment,
      imageUrl: imageUrls.length > 0 ? JSON.stringify(imageUrls) : null,
      reviewType: 'ACTIVITY',
      reviewerId: Number(reviewerId),
      activityId: Number(activityId),
    }
  })
}


export const getAllReviewsMe = async (id) => {
  try {
    return await prisma.review.findMany({
      where: {
        receiverId: id,
        reviewType: 'PERSON'
      },
      include: {
        activity: {
          select: { id: true, coverPhoto: true }
        },
        reviewer: {
          select: { id: true, username: true, profileImg: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error("Prisma Error:", error);
    throw error
  }
}
export const getAllUsersReviews = async () => {
  try {
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
  } catch (error) {
    console.error("Prisma Error:", error);
    throw error
  }
}
export const getAllActivitiesReviews = async () => {
  try {
    return await prisma.review.findMany({
      where: {
        reviewType: 'ACTIVITY'
      },
      include: {
        activity: {
          include: { place: true }
        },
        reviewer: {
          select: { id: true, username: true, profileImg: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })


  } catch (error) {
    console.error("Prisma Error:", error);
    throw error
  }
}

export const getActivityReviews = async (activityId) => {
  try {
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


  } catch (error) {
    console.error("Prisma Error:", error);
    throw error
  }
}

export const getSpecificReview = async (reviewid) => {
  try {
    return await prisma.review.findFirst({
      where: { id: Number(reviewid) },
      include: {
        activity: true,
        reviewer: {
          select: { id: true, username: true, profileImg: true }
        }
      }
    })

  } catch (error) {
    console.error("Prisma Error:", error);
    throw error
  }
}

export const getActivityReviewsByLocation = async (placeid) => {
  try {
    return await prisma.review.findMany({
      where: {
        reviewType: 'ACTIVITY',
        activity: {
          placeId: Number(placeid)
        }
      },
      include: {
        activity: {
          include: { place: true }
        },
        reviewer: {
          select: { id: true, username: true, profileImg: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })


  } catch (error) {
    console.error("Prisma Error:", error);
    throw error
  }
}

export const checkExistingReview = async (reviewerId, activityId) => {
  try {
    return await prisma.review.findFirst({
      where: {
        reviewType: 'ACTIVITY',
        reviewerId: Number(reviewerId),
        activityId: Number(activityId)
      },
    })


  } catch (error) {
    console.error("Prisma Error:", error);
    throw error
  }
}

export const checkExistingPeerReview = async (reviewerId, activityId, receiverId) => {
  try {
    return await prisma.review.findFirst({
      where: {
        reviewType: 'PERSON',
        reviewerId: Number(reviewerId),
        activityId: Number(activityId),
        receiverId: Number(receiverId)
      },
    })


  } catch (error) {
    console.error("Prisma Error:", error);
    throw error
  }
}


export const createUserReview = async (io, reviewerId, activityId, receiverId, data) => {
  // ตรวจสอบว่าเคยรีวิวคนนี้ในกิจกรรมนี้ไปแล้วหรือยัง
  const existingReview = await prisma.review.findFirst({
    where: {
      reviewerId: Number(reviewerId),
      activityId: Number(activityId),
      receiverId: Number(receiverId),
      reviewType: 'PERSON'
    }
  });

  if (existingReview) {
    throw new Error("You have already reviewed this user for this activity");
  }

  let reviews;
  try {
    reviews = await prisma.review.create({
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


  } catch (error) {
    console.error("Prisma Error:", error);
    throw error
  }

  const reviewer = await getUserById(reviewerId);
  const notificationMessage = `${reviewer?.username || 'Someone'} gave you a review`;

  await createNoti({
    userId: Number(receiverId),
    senderId: Number(reviewerId),
    type: "NEW_REVIEW",
    message: notificationMessage,
    refId: reviews.id,
  });

  if (io) {
    sendNotification(io, {
      userId: Number(receiverId),
      senderId: Number(reviewerId),
      type: "NEW_REVIEW",
      message: notificationMessage,
      refId: reviews.id,
    });
  }

  return reviews;
}

export async function getUserReviews(userId) {
    try {
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

        
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }
}

export async function getUserById(userId) {
    try {
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

        
    } catch (error) {
        console.error("Prisma Error:", error);
        throw error     
    }
};


export const getActivityRatings = async () => {
  const activities = await prisma.activity.findMany({
    include: {
      host: { select: { username: true, profileImg: true } },
      place: true,
      reviews: {
        where: { reviewType: "ACTIVITY" },
        select: { rating: true },
      },
      _count: {
        select: { reviews: { where: { reviewType: "ACTIVITY" } } },
      },
    },
  });

  return activities.map((act) => {
    const total = act.reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = act.reviews.length > 0 ? total / act.reviews.length : 0;
    const { reviews, ...rest } = act;
    return {
      ...rest,
      averageRating: Number(avg.toFixed(1)),
      reviewCount: act._count.reviews,
    };
  });
};




export const getUserRatings = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      profileImg: true,
      reviewsReceived: {
        where: { reviewType: "PERSON" },
        select: { rating: true },
      },
      _count: {
        select: { reviewsReceived: { where: { reviewType: "PERSON" } } },
      },
    },
  });

  return users.map((user) => {
    const total = user.reviewsReceived.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = user.reviewsReceived.length > 0 ? total / user.reviewsReceived.length : 0;
    const { reviewsReceived, ...rest } = user;
    return {
      ...rest,
      averageRating: Number(avg.toFixed(1)),
      reviewCount: user._count.reviewsReceived,
    };
  });
};




export const getPlaceRatings = async () => {
  const places = await prisma.place.findMany({
    include: {
      activities: {
        include: {
          reviews: {
            where: { reviewType: "ACTIVITY" },
            select: { rating: true },
          },
        },
      },
    },
  });

  return places.map((place) => {
    // รวมรีวิวจากทุก Activity ที่เคยจัดในสถานที่นี้
    const allReviews = place.activities.flatMap((act) => act.reviews);
    const total = allReviews.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = allReviews.length > 0 ? total / allReviews.length : 0;

    const { activities, ...rest } = place;
    return {
      ...rest,
      averageRating: Number(avg.toFixed(1)),
      reviewCount: allReviews.length,
    };
  });
};
