export const activityData = [
  // --- HEALTH ---
  {
    category: "HEALTH",
    title: "Morning Run at Benjakitti 🏃‍♂️",
    description:
      "มาร่วม Run Club วิ่งรับลมเช้าที่สวนเบญจกิตติด้วยกันครับ วิ่งเสร็จแล้วไปหาจิบกาแฟแถวสุขุมวิทกันต่อ สนุกแน่นอน!",
    eventStartTime: new Date("2026-04-17T06:30:00"),
    hostId: 1,
    placeId: 1,
  },
  {
    category: "HEALTH",
    title: "Yoga in the Park (Lumpini) 🧘‍♀️",
    description:
      "ผ่อนคลายร่างกายกับโยคะยามเย็นท่ามกลางพื้นที่สีเขียวใจกลางลุมพินี Open for all levels! Let's stretch and find some inner peace together.",
    eventStartTime: new Date("2026-04-18T17:00:00"),
    hostId: 2,
    placeId: 2,
  },

  // --- ENTERTAINMENT ---
  {
    category: "ENTERTAINMENT",
    title: "Board Game Night @Siam 🎲",
    description:
      "คอเกมห้ามพลาด! เจอกันที่สยามสแควร์มาเล่น Board games สนุกๆ กัน มีทั้งแนว Strategy และแนวฮาๆ ใครมาคนเดียวไม่ต้องห่วง เดี๋ยวเราหาตี้ให้ครับ",
    eventStartTime: new Date("2026-04-19T18:00:00"),
    hostId: 3,
    placeId: 3,
  },
  {
    category: "ENTERTAINMENT",
    title: "ร้องเกะ @Thonglor",
    description:
      "Release your inner Rockstar ย่านทองหล่อ! ปล่อยจอยกับคาราโอเกะเพลงฮิตยุค 90s จนถึงปัจจุบัน Sing your heart out and make new friends.",
    eventStartTime: new Date("2026-04-20T20:00:00"),
    hostId: 4,
    placeId: 4,
  },

  // --- ART ---
  {
    category: "ART",
    title: "Watercolor Workshop @Ari 🎨",
    description:
      "Workshops ระบายสีน้ำแถวอารีย์ ไม่ต้องมีพื้นฐานก็มาได้นะ มาลองสร้าง Masterpiece ของตัวเองในคาเฟ่บรรยากาศ Cozy สุดๆ",
    eventStartTime: new Date("2026-04-21T13:00:00"),
    hostId: 5,
    placeId: 5,
  },
  {
    category: "ART",
    title: "ตลาดน้อย Gallery Hopping",
    description:
      "ไปเดินชม Street Art และแกลเลอรี่แถวตลาดน้อยกัน! Explore the hidden art gems of Bangkok and get inspired. จบด้วยการหาขนมอร่อยๆ ทาน",
    eventStartTime: new Date("2026-04-22T14:00:00"),
    hostId: 6,
    placeId: 6,
  },

  // --- FOOD ---
  {
    category: "FOOD",
    title: "Ban Tad Thong Foodie Tour 🍜",
    description:
      "ตะลุยกินของอร่อยย่านบรรทัดทอง! We’re going to the best hidden gems in town. เตรียมท้องมาให้พร้อม เพราะย่านนี้ของกินเด็ดมาก!",
    eventStartTime: new Date("2026-04-23T18:30:00"),
    hostId: 7,
    placeId: 7,
  },
  {
    category: "FOOD",
    title: "Yaowarat Night Market Feast",
    description:
      "สัมผัส Street Food ระดับตำนานที่เยาวราช Let's explore China Town's best dishes together at night. Tasty food and great vibes guaranteed!",
    eventStartTime: new Date("2026-04-24T19:00:00"),
    hostId: 8,
    placeId: 8,
  },

  // --- TRAVEL ---
  {
    category: "TRAVEL",
    title: "Chao Phraya River Cruise 🚢",
    description:
      "นั่งเรือเที่ยวริมแม่น้ำเจ้าพระยา แวะวัดอรุณและวัดโพธิ์ A classic Bangkok experience! Let's take photos and enjoy the riverside breeze.",
    eventStartTime: new Date("2026-04-25T15:00:00"),
    hostId: 9,
    placeId: 9,
  },
  {
    category: "TRAVEL",
    title: "Hidden Bangkok Bicycle Tour 🚲",
    description:
      "ปั่นจักรยานสำรวจมุมลับในกรุงเทพฯ ย่านบางกระเจ้า Explore the 'Green Lung' of Bangkok. Perfect escape from the city noise for nature lovers!",
    eventStartTime: new Date("2026-04-26T08:30:00"),
    hostId: 10,
    placeId: 10,
  },
];

// model Activity {
//   id              Int              @id @default(autoincrement())
//   category        ActivityCategory
//   title           String
//   description     String           @db.Text
//   maxParticipants Int?
//   status          ActivityStatus   @default(OPEN)
//   eventStartTime  DateTime
//   eventEndTime    DateTime?
//   isPublic        Boolean          @default(true)
//   createdAt       DateTime         @default(now())

//   hostId Int
//   host   User @relation("UserCreatedActivities", fields: [hostId], references: [id])

//   placeId Int?
//   place   Place? @relation(fields: [placeId], references: [id])

//   joinRequests JoinRequest[]
//   reviews      Review[]
//   chatGroup    ChatGroup?
// }

// enum ActivityCategory {
//   HEALTH
//   ENTERTAINMENT
//   ART
//   FOOD
//   TRAVEL
// }
