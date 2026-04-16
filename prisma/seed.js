import { activityData } from '../data/activities.js';
import { joinRequestData } from '../data/joinRequest.js';
import { placeData } from '../data/places.js';
import { userData } from '../data/user.js';
import { prisma } from '../src/lib/prisma.js'
import { oldActivityData } from '../data/oldActivities.js'

async function main() {
  console.log("Clear Data...");

  const modelNames = Object.keys(prisma).filter(
    (key) =>
      !key.startsWith("$") && !key.startsWith("_") && key !== "constructor",
  );
  await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 0;");
    for (const name of modelNames) {
      await tx.$executeRawUnsafe(`TRUNCATE TABLE \`${name}\`;`);
    }
    await tx.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 1;");
  });

    console.log(`Start seeding...`)
    const createdUsers = await prisma.user.createMany({
        data: userData,
        skipDuplicates: true
    })
    const createdPlaces = await prisma.place.createMany({
        data: placeData,
        skipDuplicates: true
    })

    const allActivities = [...oldActivityData, ...activityData]

    const createdActivities = await prisma.activity.createMany({
        data: allActivities,
        skipDuplicates: true
    })
    const createdJoinRequest = await prisma.joinRequest.createMany({
        data: joinRequestData,
        skipDuplicates: true
    })

  const ceratedFriendships = await prisma.friendShip.createMany({
    data: friendshipData,
    skipDuplicates: true,
  });

  console.log(`Created : ${createdUsers.count} users`);
  console.log(`Created : ${createdPlaces.count} places`);
  console.log(`Created : ${createdActivities.count} activities`);
  console.log(`Created : ${createdJoinRequest.count} join requests`);
  console.log(`Created : ${createdJoinRequest.count} join requests`);
  console.log(`Created : ${ceratedFriendships.count} join requests`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
