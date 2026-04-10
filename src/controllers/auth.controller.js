import { syncUserToDb } from "../services/auth.service.js"
import admin from "../utils/firebase.js"


export const registerOrLogin = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization; 
  const idToken = authHeader?.split(' ')[1]

  if (!idToken) {
    console.log("No Token found in headers:", req.headers)
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const { uid, email } = decodedToken

    const user = await syncUserToDb(uid, email)

    res.status(200).json({
      message: 'Success',
      user: user
    })
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(403).json({ error: 'Invalid or expired token' })
  }
}