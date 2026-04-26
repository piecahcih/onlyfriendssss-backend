import { prisma } from "../lib/prisma.js";
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
        await fs.unlink(absolutePath).catch(() => {});
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
  return await prisma.review.findMany({
    where: {
      receiverId: id,
      reviewType: 'PERSON'
    },
    include: {
      activity: {
        select: { id: true,coverPhoto:true }
      },
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
      activity: {
        include: { place: true }
      },
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
      reviewType: 'ACTIVITY',
      activity: {
        placeId: Number(placeid)
      }
    },
    include: {
      activity: {
        include : { place: true }
      },
      reviewer: {
        select: { id: true, username: true, profileImg: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const checkExistingReview =  async (reviewerId, activityId) => {
  return await prisma.review.findFirst({
    where: { 
      reviewType: 'ACTIVITY',
      reviewerId: Number(reviewid), 
      activityId: Number(activityId) },
  })
}

export const checkExistingPeerReview =  async (reviewerId, activityId, receiverId) => {
  return await prisma.review.findFirst({
    where: { 
      reviewType: 'PERSON',
      reviewerId: Number(reviewid), 
      activityId: Number(activityId), 
      receiverId: Number(receiverId) },
  })
}


export const createUserReview = async (reviewerId, activityId, receiverId, data) => {
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