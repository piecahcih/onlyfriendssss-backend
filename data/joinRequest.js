export const joinRequestData = [

  // --- JOIN REQUESTS FOR OLD ACTIVITIES (ID 1-20) ---
  // สมมติว่าให้ user คนอื่นๆ มาจอยกันอย่างน้อยกิจกรรมละ 1-2 คน
  ...Array.from({ length: 20 }, (_, i) => ({
    userId: (i % 10) + 1, // สลับ user 1-10
    activityId: i + 1,     // ID 1-20
    status: "APPROVED",
  })),

  // --- JOIN REQUESTS FOR CURRENT ACTIVITIES (จากข้อมูลเดิมของคุณ) ---
  // ตัวอย่างข้อมูลเดิม
  { userId: 1, activityId: 21, status: "PENDING" },

  // --- HEALTH ---
  // กิจกรรม 1 (Morning Run): 2 คนจอยแล้ว, 2 คนรอ
  { userId: 2, activityId: 1, status: "APPROVED" },
  { userId: 3, activityId: 1, status: "APPROVED" },
  { userId: 4, activityId: 1, status: "PENDING" },
  { userId: 5, activityId: 1, status: "PENDING" },

  // กิจกรรม 2 (Yoga): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 1, activityId: 2, status: "APPROVED" },
  { userId: 6, activityId: 2, status: "PENDING" },
  { userId: 3, activityId: 2, status: "APPROVED" },
  { userId: 8, activityId: 2, status: "APPROVED" },
  { userId: 9, activityId: 2, status: "APPROVED" },

  // --- ENTERTAINMENT ---
  // กิจกรรม 3 (Board Game): 2 คนจอยแล้ว, 3 คนรอ
  { userId: 4, activityId: 3, status: "APPROVED" },
  { userId: 5, activityId: 3, status: "APPROVED" },
  { userId: 1, activityId: 3, status: "PENDING" },
  { userId: 9, activityId: 3, status: "PENDING" },
  { userId: 11, activityId: 3, status: "PENDING" },

  // กิจกรรม 4 (ร้องเกะ): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 7, activityId: 4, status: "APPROVED" },
  { userId: 8, activityId: 4, status: "PENDING" },
  { userId: 5, activityId: 4, status: "APPROVED" },
  { userId: 6, activityId: 4, status: "APPROVED" },
  { userId: 7, activityId: 4, status: "APPROVED" },

  // --- ART ---
  // กิจกรรม 5 (Watercolor): 5 คนจอยแล้ว
  { userId: 2, activityId: 5, status: "APPROVED" },
  { userId: 9, activityId: 5, status: "APPROVED" },
  { userId: 4, activityId: 5, status: "APPROVED" },
  { userId: 7, activityId: 5, status: "APPROVED" },
  { userId: 8, activityId: 5, status: "APPROVED" },

  // กิจกรรม 6 (Gallery Hopping): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 10, activityId: 6, status: "APPROVED" },
  { userId: 1, activityId: 6, status: "PENDING" },
  { userId: 4, activityId: 6, status: "APPROVED" },
  { userId: 5, activityId: 6, status: "APPROVED" },
  { userId: 6, activityId: 6, status: "APPROVED" },

  // --- FOOD ---
  // กิจกรรม 7 (Ban Tad Thong): 5 คนจอยแล้ว, 0 คนรอ
  { userId: 3, activityId: 7, status: "APPROVED" },
  { userId: 5, activityId: 7, status: "APPROVED" },
  { userId: 8, activityId: 7, status: "APPROVED" },
  { userId: 9, activityId: 7, status: "APPROVED" },
  { userId: 3, activityId: 7, status: "APPROVED" },

  // กิจกรรม 8 (Yaowarat): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 1, activityId: 8, status: "APPROVED" },
  { userId: 4, activityId: 8, status: "PENDING" },
  { userId: 2, activityId: 8, status: "APPROVED" },
  { userId: 3, activityId: 8, status: "APPROVED" },
  { userId: 5, activityId: 8, status: "APPROVED" },

  // --- TRAVEL ---
  // กิจกรรม 9 (River Cruise): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 6, activityId: 9, status: "APPROVED" },
  { userId: 7, activityId: 9, status: "APPROVED" },
  { userId: 8, activityId: 9, status: "APPROVED" },
  { userId: 9, activityId: 9, status: "APPROVED" },
  { userId: 10, activityId: 9, status: "PENDING" },

  // กิจกรรม 10 (Bicycle Tour): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 2, activityId: 10, status: "APPROVED" },
  { userId: 7, activityId: 10, status: "APPROVED" },
  { userId: 8, activityId: 10, status: "APPROVED" },
  { userId: 9, activityId: 10, status: "APPROVED" },
  { userId: 3, activityId: 10, status: "PENDING" },

   // กิจกรรม 11 (Run Club): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 2, activityId: 11, status: "APPROVED" },
  { userId: 3, activityId: 11, status: "APPROVED" },
  { userId: 7, activityId: 11, status: "APPROVED" },
  { userId: 5, activityId: 11, status: "APPROVED" },
  { userId: 4, activityId: 11, status: "PENDING" },

  // กิจกรรม 12 (Yo ga): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 2, activityId: 12, status: "APPROVED" },
  { userId: 1, activityId: 12, status: "APPROVED" },
  { userId: 11, activityId: 12, status: "APPROVED" },
  { userId: 12, activityId: 12, status: "APPROVED" },
  { userId: 3, activityId: 12, status: "PENDING" },

  // กิจกรรม 13 (Run): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 1, activityId: 13, status: "APPROVED" },
  { userId: 2, activityId: 13, status: "APPROVED" },
  { userId: 3, activityId: 13, status: "APPROVED" },
  { userId: 4, activityId: 13, status: "APPROVED" },
  { userId: 5, activityId: 13, status: "PENDING" },

  // กิจกรรม 14 (Board games): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 6, activityId: 14, status: "APPROVED" },
  { userId: 7, activityId: 14, status: "APPROVED" },
  { userId: 8, activityId: 14, status: "APPROVED" },
  { userId: 9, activityId: 14, status: "APPROVED" },
  { userId: 10, activityId: 14, status: "PENDING" },

  // กิจกรรม 15 (คาราโอเกะ): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 11, activityId: 15, status: "APPROVED" },
  { userId: 12, activityId: 15, status: "APPROVED" },
  { userId: 1, activityId: 15, status: "APPROVED" },
  { userId: 2, activityId: 15, status: "APPROVED" },
  { userId: 3, activityId: 15, status: "PENDING" },

  // กิจกรรม 16 (Workshops ระบายสี): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 4, activityId: 16, status: "APPROVED" },
  { userId: 5, activityId: 16, status: "APPROVED" },
  { userId: 6, activityId: 16, status: "APPROVED" },
  { userId: 7, activityId: 16, status: "APPROVED" },
  { userId: 8, activityId: 16, status: "PENDING" },

  // กิจกรรม 17 (Street Art): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 9, activityId: 17, status: "APPROVED" },
  { userId: 10, activityId: 17, status: "APPROVED" },
  { userId: 11, activityId: 17, status: "APPROVED" },
  { userId: 12, activityId: 17, status: "APPROVED" },
  { userId: 1, activityId: 17, status: "PENDING" },

  // กิจกรรม 18 (ตะลุยกิน): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 2, activityId: 18, status: "APPROVED" },
  { userId: 3, activityId: 18, status: "APPROVED" },
  { userId: 4, activityId: 18, status: "APPROVED" },
  { userId: 5, activityId: 18, status: "APPROVED" },
  { userId: 6, activityId: 18, status: "PENDING" },

  // กิจกรรม 19 ( Street Food): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 7, activityId: 19, status: "APPROVED" },
  { userId: 8, activityId: 19, status: "APPROVED" },
  { userId: 9, activityId: 19, status: "APPROVED" },
  { userId: 10, activityId: 19, status: "APPROVED" },
  { userId: 11, activityId: 19, status: "PENDING" },

  // กิจกรรม 20 (นั่งเรือเที่ยว): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 12, activityId: 20, status: "APPROVED" },
  { userId: 1, activityId: 20, status: "APPROVED" },
  { userId: 2, activityId: 20, status: "APPROVED" },
  { userId: 3, activityId: 20, status: "APPROVED" },
  { userId: 4, activityId: 20, status: "PENDING" },

  // กิจกรรม 21 (ปั่นจักรยาน): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 5, activityId: 21, status: "APPROVED" },
  { userId: 6, activityId: 21, status: "APPROVED" },
  { userId: 7, activityId: 21, status: "APPROVED" },
  { userId: 8, activityId: 21, status: "APPROVED" },
  { userId: 9, activityId: 21, status: "PENDING" },

  // กิจกรรม 22 (โชว์ Stand-up Comedy): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 10, activityId: 22, status: "APPROVED" },
  { userId: 11, activityId: 22, status: "APPROVED" },
  { userId: 12, activityId: 22, status: "APPROVED" },
  { userId: 1, activityId: 22, status: "APPROVED" },
  { userId: 2, activityId: 22, status: "PENDING" },

  // กิจกรรม 23 (เสพงานศิลป์): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 3, activityId: 23, status: "APPROVED" },
  { userId: 4, activityId: 23, status: "APPROVED" },
  { userId: 5, activityId: 23, status: "APPROVED" },
  { userId: 6, activityId: 23, status: "APPROVED" },
  { userId: 7, activityId: 23, status: "PENDING" },

  // กิจกรรม 24 (ตระเวนกิน): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 8, activityId: 24, status: "APPROVED" },
  { userId: 9, activityId: 24, status: "APPROVED" },
  { userId: 10, activityId: 24, status: "APPROVED" },
  { userId: 11, activityId: 24, status: "APPROVED" },
  { userId: 12, activityId: 24, status: "PENDING" },

  // กิจกรรม 25 (ชมวิวมหานคร): 4 คนจอยแล้ว, 1 คนรอ
  { userId: 1, activityId: 25, status: "APPROVED" },
  { userId: 2, activityId: 25, status: "APPROVED" },
  { userId: 3, activityId: 25, status: "APPROVED" },
  { userId: 4, activityId: 25, status: "APPROVED" },
  { userId: 5, activityId: 25, status: "PENDING" },



  ///////////////////////////////////////////////
  { userId: 1, activityId: 26, status: "APPROVED" },
  { userId: 2, activityId: 26, status: "APPROVED" },
  { userId: 3, activityId: 26, status: "APPROVED" },
  { userId: 4, activityId: 26, status: "APPROVED" },
  { userId: 5, activityId: 26, status: "PENDING" },

  { userId: 1, activityId: 27, status: "APPROVED" },
  { userId: 2, activityId: 27, status: "APPROVED" },
  { userId: 3, activityId: 27, status: "APPROVED" },
  { userId: 4, activityId: 27, status: "APPROVED" },
  { userId: 5, activityId: 27, status: "PENDING" },

  { userId: 1, activityId: 28, status: "APPROVED" },
  { userId: 2, activityId: 28, status: "APPROVED" },
  { userId: 3, activityId: 28, status: "APPROVED" },
  { userId: 4, activityId: 28, status: "APPROVED" },
  { userId: 5, activityId: 28, status: "PENDING" },

  { userId: 1, activityId: 29, status: "APPROVED" },
  { userId: 2, activityId: 29, status: "APPROVED" },
  { userId: 3, activityId: 29, status: "APPROVED" },
  { userId: 4, activityId: 29, status: "APPROVED" },
  { userId: 5, activityId: 29, status: "PENDING" },

  { userId: 1, activityId: 30, status: "APPROVED" },
  { userId: 2, activityId: 30, status: "APPROVED" },
  { userId: 3, activityId: 30, status: "APPROVED" },
  { userId: 4, activityId: 30, status: "APPROVED" },
  { userId: 5, activityId: 30, status: "PENDING" },

  { userId: 1, activityId: 31, status: "APPROVED" },
  { userId: 2, activityId: 31, status: "APPROVED" },
  { userId: 3, activityId: 31, status: "APPROVED" },
  { userId: 4, activityId: 31, status: "APPROVED" },
  { userId: 5, activityId: 31, status: "PENDING" },

  { userId: 1, activityId: 32, status: "APPROVED" },
  { userId: 2, activityId: 32, status: "APPROVED" },
  { userId: 3, activityId: 32, status: "APPROVED" },
  { userId: 4, activityId: 32, status: "APPROVED" },
  { userId: 5, activityId: 32, status: "PENDING" },

  { userId: 1, activityId: 33, status: "APPROVED" },
  { userId: 2, activityId: 33, status: "APPROVED" },
  { userId: 3, activityId: 33, status: "APPROVED" },
  { userId: 4, activityId: 33, status: "APPROVED" },
  { userId: 5, activityId: 33, status: "PENDING" },

  { userId: 1, activityId: 34, status: "APPROVED" },
  { userId: 2, activityId: 34, status: "APPROVED" },
  { userId: 3, activityId: 34, status: "APPROVED" },
  { userId: 4, activityId: 34, status: "APPROVED" },
  { userId: 5, activityId: 34, status: "PENDING" },

 
];
