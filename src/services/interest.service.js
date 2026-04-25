import { prisma } from "../lib/prisma.js";

export function getUserInterest(userid) {
  return prisma.interest.findMany({
    where: { userId: userid }
  })
}