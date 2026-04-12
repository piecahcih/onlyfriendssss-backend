import { prisma } from "../lib/prisma.js";

// login Google
export async function syncUserToDb(uid, email, firstName, lastName) {
  return await prisma.user.upsert({
    where: { firebase_uid: uid },
    update: {
      email: email,
      firstName: firstName,
      lastName: lastName
    },
    create: {
      firebase_uid: uid,
      email: email,

      firstName: firstName,
      lastName: lastName,
      password: '',
      gender: 'OTHER',
      role: 'USER'
    }
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
export function updateUserProfile(userId, data) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      bio: data.bio,
      profileImg: data.profileImg
    }
  })
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