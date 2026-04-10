import { prisma } from "../lib/prisma.js";


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

export function findUserByUsername(username) {
  return prisma.user.findUnique({
    where: { username : username }
  })
}

export function createUser(data) {
  return prisma.user.create({ data })
}