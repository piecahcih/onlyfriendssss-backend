import { prisma } from "../lib/prisma.js"
import { createActivityReview, createUserReview, getActivityReviews, getActivityReviewsByLocation, getAllActivitiesReviews, getAllReviewsMe, getAllUsersReviews, getSpecificReview, getUserById } from "../services/review.service.js"
import createHttpError from 'http-errors'

export async function reviewActivityCtrl(req, res, next) {
  try {
    const user = req.result

    if (!user || !user.id) {
      return res.json({ message: "Unauthorized: Missing user data" })
    }

    const { activityId } = req.params
    const { rating, comment, imageUrl } = req.body
    const reviewerId = user.id

    const result = await createActivityReview(reviewerId, activityId, {
      rating,
      comment,
      imageUrl
    })

    res.json({
      message: 'Review Submitted',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export async function reviewUserCtrl(req, res, next) {
  try {
    const user = req.result;
    if (!user || !user.id) {
      return res.json({ message: "Unauthorized: Missing user data" });
    }

    const { activityId, receiverId } = req.params
    const { rating, comment, imageUrl } = req.body
    const reviewerId = user.id

    if (Number(reviewerId) === Number(receiverId)) {
      return res.json({ message: "You cannot review yourself" })
    }

    const result = await createUserReview(reviewerId, activityId, receiverId, {
      rating,
      comment,
      imageUrl
    })

    res.json({
      message: 'User review submitted',
      data: result
    })
  } catch (error) {
    next(error)
  }
}




export async function getActivityRatingScoreCtrl(req, res, next) {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        host: { select: { username: true } },
        place: true,
        reviews: {
          where: { reviewType: 'ACTIVITY' },
          select: { rating: true }
        }
      }
    })

    // คำนวณ rating เฉลี่ยในแต่ละ activity
    const data = activities.map(act => {
      const total = act.reviews.reduce((acc, curr) => acc + curr.rating, 0)
      const avg = act.reviews.length > 0 ? total / act.reviews.length : 0
      return {
        ...act,
        averageRating: avg.toFixed(1),
        reviewCount: act.reviews.length
      }
    })

    res.json(data)
  } catch (error) {
    next(error)
  }
}




export async function getAllUsersReviewsCtrl(req, res, next) {

  const reviews = await getAllUsersReviews()
  res.json({
    message: "Get all USER reviews successfully",
    reviews: reviews
  })

}

export async function getAllReviewsMeCtrl(req, res, next) {
  const {id} = req.result

  const reviews = await getAllReviewsMe(id)
  
  if(!reviews) {
    return next(createHttpError[404]('There\'s no one review this account yet'))
  }

  res.json({
    message: "Get all reviews ME successfully",
    reviews: reviews
  })

}

export async function getAllActivitiessReviewsCtrl(req, res, next) {

  const reviews = await getAllActivitiesReviews()
  res.json({
    message: "Get all ACTIVITY reviews successfully",
    reviews: reviews
  })

}

export async function getActivityReviewsCtrl(req, res, next) {
  const { activityId } = req.params
  const reviews = await getActivityReviews(Number(activityId))
  
  if(!reviews) {
    return next(createHttpError[404]('There\'s no review on this activity yet'))
  }

  res.json({
    message: "Get all reviews in this activity successfully",
    reviews: reviews
  })

}

export async function getSpecificReviewCtrl(req, res, next) {
  const { reviewid } = req.params
  const review = await getSpecificReview(Number(reviewid))

  if(!review) {
    return next(createHttpError[404]('This Review Not Found'))
  }

  res.json({
    message: "Get specific review successfully",
    reviews: review
  })

}

export async function getActivityReviewsByLocationCtrl(req, res, next) {
  const { placeid } = req.params
  const reviews = await getActivityReviewsByLocation(Number(placeid))
  
  if(!reviews) {
    return next(createHttpError[404]('There\'s no review on this location yet'))
  }

  res.json({
    message: "Get activities by location successfully",
    reviews: reviews
  })

}





export async function getUserCtrl(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    next(error); 
  }
};
