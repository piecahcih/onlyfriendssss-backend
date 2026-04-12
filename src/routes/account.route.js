import express from 'express'
import { deleteMeCtrl, getMeCtrl, updateMeCtrl } from '../controllers/account.controller.js'
import { authCheckUser } from '../middlewares/authenticate.js'
import upload from '../middlewares/upload.middleware.js'


const accountRoute = express.Router()

accountRoute.get('/profile',authCheckUser ,getMeCtrl)
accountRoute.patch('/profile',authCheckUser, upload.single('profileImg'),updateMeCtrl)
accountRoute.delete('/profile',authCheckUser,deleteMeCtrl)

export default accountRoute