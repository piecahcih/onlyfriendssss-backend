import express from 'express'
import { addWishlistCtrl, deleteWishlist, getMyWishlistCtrl } from '../controllers/wishlist.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'

const wishlistRouter = express.Router()

wishlistRouter.get('/', authCheckUser, getMyWishlistCtrl)
wishlistRouter.post('/', authCheckUser, addWishlistCtrl)
wishlistRouter.delete('/:activityId', authCheckUser, deleteWishlist)

export default wishlistRouter