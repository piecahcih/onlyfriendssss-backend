import { createUser, createUserInterest, getUserBy, syncUserToDb, updateUserProfile } from "../services/auth.service.js"
import admin from "../utils/firebase.js"
import { loginSchema, registerSchema } from "../validations/schema.js"
import createHttpError from "http-errors"
import bcrypt from 'bcrypt'
import { signToken } from '../utils/jwt.js'


// login Google
export const registerOrLoginCtrl = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const idToken = authHeader.split(' ')[1]

  if (!idToken) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const { uid, email, name, picture } = decodedToken

    const nameParts = (name || "").split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    const user = await syncUserToDb(uid, email, firstName, lastName, picture)

    const token = signToken({ id: user.id })

    res.json({
      message: 'Success',
      token: token,
      user: user
    })
  } catch (error) {
    next(createHttpError[403]('Invalid or expired token'))
  }
}


export async function registerCtrl(req, res, next) {
  try {
    const data = await registerSchema.parseAsync(req.body)

    const foundUser = await getUserBy('email', data.email)
    if (foundUser) {
      return next(createHttpError[409]('This User has been registed'))
    }

    const createdUser = await createUser(data)

    const userInfo = {
      id: createdUser.id,
      email: data.email,
    }
    if (createdUser.role !== 'USER') {
      userInfo.role = createdUser.role
    }
    res.json({
      message: 'Register Success',
      user: userInfo
    })
  } catch (error) {
    next(error)
  }
}


export async function loginCtrl(req, res, next) {
  try {
    const data = loginSchema.parse(req.body)

    const foundUser = await getUserBy('email', data.email)
    console.log(foundUser)
    if (!foundUser) {
      return next(createHttpError[401]('Invalid Login 1'))
    }

    let rightPW = await bcrypt.compare(data.password, foundUser.password)
    if (!rightPW) {
      return next(createHttpError[401]('Invalid Login 2'))
    }

    const payload = { id: foundUser.id }
    const token = signToken(payload)

    // console.log(foundUser)
    const userInfo = {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName
    }

    if (foundUser.profileImg !== null) {
      userInfo.profileImg = foundUser.profileImg
    }
    if (foundUser.name !== null) {
      userInfo.name = foundUser.name
    }
    if (foundUser.role !== 'USER') {
      userInfo.role = foundUser.role
    }

    res.json({
      message: 'Login Success',
      token: token,
      user: userInfo
    })
  } catch (error) {
    next(error)
  }
}


// register add profile
export async function addProfileCtrl(req, res, next) {
  try {
    const { id } = req.params
    const data = req.body

    const updatedUser = await updateUserProfile(Number(id), data)

    res.json({
      message: 'อัปเดตโปรไฟล์สำเร็จ',
      data: updatedUser
    })
  } catch (error) {
    console.error(error)
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Username นี้ถูกใช้ไปแล้ว' })
    }
    next(error)
  }
}

// add interest
export async function addInterestCtrl(req, res, next) {
  try {
    const { id } = req.params
    const { category } = req.body

    const updateInterest = await createUserInterest(Number(id), category)
    res.json({
      message: 'บันทึกสิ่งที่สนใจสำเร็จ',
      count: updateInterest
    })
  } catch (error) {
    next(error)
  }
}