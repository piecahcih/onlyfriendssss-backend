import { prisma } from "../lib/prisma.js"
import { createActivityReview, createUserReview, getActivityReviews } from "../services/review.service.js"


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

export async function getAllActivitiesWithRating(req, res, next) {
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

export async function getActivityReviewDetails(req, res, next) {
  try {
    const { activityId } = req.params
    const reviews = await getActivityReviews(activityId)
    res.json(reviews)
  } catch (error) {
    next(error)
  }
}
