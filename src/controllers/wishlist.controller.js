import { addWishlist, getWishlist, removeWishlist } from "../services/wishlist.service.js"


export async function getMyWishlistCtrl(req, res, next) {
  try {
    const wishlistAll = await getWishlist(req.result?.id)
    res.json({ wishlistAll })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function addWishlistCtrl(req, res, next) {
  try {
    // console.log(req.result)
    const { activityId } = req.body
    const userId = req.result.id

    const wishlist = await addWishlist(userId, Number(activityId))
    res.json({
      message: 'Add wishlist done',
      wishlist: wishlist
    })
  } catch (error) {
    next(error)
  }
}

export async function deleteWishlist(req, res, next) {
  try {
    const { activityId } = req.params
    const userId = req.result.id

    await removeWishlist(userId, Number(activityId))
    res.json({
      message: 'Delete Success'
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}