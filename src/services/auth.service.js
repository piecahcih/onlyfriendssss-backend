import { prisma } from "../lib/prisma.js"
import path from "path"
import fs from "fs/promises"
import cloudinary from "../../config/cloudinary.js"

// login Google
export async function syncUserToDb(uid, email, firstName, lastName, picture) {
  const existingUser = await prisma.user.findUnique({
    where: { firebase_uid: uid }
  })

  if (existingUser) { // เช็ค user เก่า
    return await prisma.user.update({
      where: { firebase_uid: uid },
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
      }
    })
  }

  return await prisma.user.create({ // ถ้าเป็น user ใหม่
    data: {
      firebase_uid: uid,
      email: email,
      username: email.split('@')[0],
      firstName: firstName,
      lastName: lastName,
      profileImg: picture,
      password: '',
      gender: 'OTHER',
      role: 'USER'
    }
  })
}

export function markOnboardingComplete(userId) {
  return prisma.user.update({
    where: { id: userId },
    data: { onboardingCompleted: true }
  })
}

export function getUserBy(field, value) {
  return prisma.user.findFirst({
    where: { [field]: value }
  })
}

export function createUser(data) {
  return prisma.user.create({ data })
}

// register add profile
export const updateUserProfile = async (userId, updateData, localFilePath) => {
  try {
    const id = parseInt(userId)

    if (localFilePath) {
      const absolutePath = path.isAbsolute(localFilePath)
        ? localFilePath
        : path.join(process.cwd(), localFilePath)

      try {
        const uploadResult = await cloudinary.uploader.upload(absolutePath, {
          folder: "profile_images",
        })

        updateData.profileImg = uploadResult.secure_url

        await fs.unlink(absolutePath);
        console.log(`✅ Deleted temporary file: ${absolutePath}`)
      } catch (uploadErr) {
        console.error("Cloudinary Upload Error:", uploadErr)

        await fs.unlink(absolutePath).catch(() => { })
        throw new Error("ไม่สามารถอัปโหลดรูปภาพได้")
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: updateData,
    })

    return updatedUser;
  } catch (error) {
    throw error
  }
}


// add interest
export function createUserInterest(userId, interests) {
  const data = interests.map((cate) => ({
    userId: userId,
    category: cate
  }))

  return prisma.interest.createMany({
    data: data
  })
}