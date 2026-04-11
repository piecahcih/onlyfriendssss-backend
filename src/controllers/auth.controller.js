import { createUser, getUserBy, syncUserToDb } from "../services/auth.service.js"
import admin from "../utils/firebase.js"
import { loginSchema, registerSchema } from "../validations/schema.js"
import createHttpError from "http-errors"
import bcrypt from 'bcrypt'
import { signToken } from '../utils/jwt.js'



export const registerOrLogin = async (req, res) => {
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

    res.status(200).json({
      message: 'Success',
      token: token,
      user: user
    })
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(403).json({ error: 'Invalid or expired token' })
  }
}


export async function register(req, res, next) {

  const { email, password, confirmPassword } = req.body

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
}


export async function login(req, res, next) {
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

  console.log(foundUser)
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
}