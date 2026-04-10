import { prisma } from "../src/lib/prisma.js";
import { userData } from "../data/user.js";
import { activityData } from "../data/activities.js";
import { placeData } from "../data/places.js";
import { joinRequestData } from "../data/joinRequest.js";

async function main() {
  console.log("--- เริ่มกระบวนการตรวจสอบและ Seed ---");

  // 1. ตรวจสอบว่ามีข้อมูลในตารางแม่หรือยัง
  const userCount = await prisma.user.count();
  const placeCount = await prisma.place.count();

  console.log(`พบ User ในระบบ: ${userCount} คน`);
  console.log(`พบ Place ในระบบ: ${placeCount} แห่ง`);

  if (userCount === 0 || placeCount === 0) {
    console.log("❌ ข้อมูลต้นทางไม่พอ! กำลังสร้าง User และ Place ใหม่...");
    for (const u of userData) await prisma.user.create({ data: u });
    for (const p of placeData) await prisma.place.create({ data: p });
  }

  // 2. ดึงข้อมูลจริงจาก DB มาดูว่า ID เป็นเลขอะไรบ้าง
  const allUsers = await prisma.user.findMany({ select: { id: true } });
  const allPlaces = await prisma.place.findMany({ select: { id: true } });
  
  const userIds = allUsers.map(u => u.id);
  const placeIds = allPlaces.map(p => p.id);

  console.log("User IDs ที่มีจริง:", userIds);
  console.log("Place IDs ที่มีจริง:", placeIds);

  // 3. กรอง Activity ที่มี ID ไม่ตรงทิ้ง เพื่อป้องกัน Error
  const validActivities = activityData.filter(act => 
    userIds.includes(act.hostId) && placeIds.includes(act.placeId)
  );

  console.log(`กำลังสร้าง Activity ที่ถูกต้อง: ${validActivities.length}/${activityData.length} รายการ`);

  if (validActivities.length > 0) {
    await prisma.activity.createMany({
      data: validActivities,
      skipDuplicates: true
    });
  }

  // 4. สร้าง JoinRequest (เฉพาะที่ ActivityId มีอยู่จริง)
  const allActs = await prisma.activity.findMany({ select: { id: true } });
  const actIds = allActs.map(a => a.id);
  
  const validRequests = joinRequestData.filter(req =>
    userIds.includes(req.userId) && actIds.includes(req.activityId)
  );

  console.log(`กำลังสร้าง JoinRequest ที่ถูกต้อง: ${validRequests.length} รายการ`);
  await prisma.joinRequest.createMany({ data: validRequests });

  console.log("--- SEEDING DONE! ✅ ---");
}

main().finally(() => prisma.$disconnect());