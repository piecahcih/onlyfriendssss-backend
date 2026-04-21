import { createActivityReview, createUserReview } from "../services/review.service.js"

export async function reviewActivityCtrl(req, res, next) {
  try {
    const user = req.result

    if (!user || !user.id) {
      return res.status(401).json({ message: "Unauthorized: Missing user data" })
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
      return res.status(401).json({ message: "Unauthorized: Missing user data" });
    }

    const { activityId, receiverId } = req.params
    const { rating, comment, imageUrl } = req.body
    const reviewerId = user.id

    if (Number(reviewerId) === Number(receiverId)) {
      return res.status(400).json({ message: "You cannot review yourself" })
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

export async function getActivityCtrl(activityId) {
  const aggregate = await prisma.review.aggregate({
    where: {
      activityId: Number(activityId),
      receiverId: null
    },
    _avg: { rating: true },
    _count: { rating: true }
  })
  return {
    average: aggregate._avg.rating || 0,
    totalReviews: aggregate._count.rating
  }
}

export async function getUserCtrl(userId) {
  const aggregate = await prisma.review.aggregate({
    where: {
      receiverId: Number(userId)
    },
    _avg: { rating: true },
    _count: { rating: true }
  })
  return {
    average: aggregate._avg.rating || 0,
    totalReviews: aggregate._count.rating
  }
}
