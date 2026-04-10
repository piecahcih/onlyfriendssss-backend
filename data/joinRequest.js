export const joinRequestData = [
  // --- HEALTH ---
  // กิจกรรม 1 (Morning Run): 2 คนจอยแล้ว, 2 คนรอ
  { userId: 2, activityId: 1, status: "APPROVED" },
  { userId: 3, activityId: 1, status: "APPROVED" },
  { userId: 4, activityId: 1, status: "PENDING" },
  { userId: 5, activityId: 1, status: "PENDING" },

  // กิจกรรม 2 (Yoga): 1 คนจอยแล้ว, 1 คนรอ
  { userId: 1, activityId: 2, status: "APPROVED" },
  { userId: 6, activityId: 2, status: "PENDING" },

  // --- ENTERTAINMENT ---
  // กิจกรรม 3 (Board Game): 2 คนจอยแล้ว, 1 คนรอ
  { userId: 4, activityId: 3, status: "APPROVED" },
  { userId: 5, activityId: 3, status: "APPROVED" },
  { userId: 1, activityId: 3, status: "PENDING" },

  // กิจกรรม 4 (ร้องเกะ): 1 คนจอยแล้ว, 1 คนรอ
  { userId: 7, activityId: 4, status: "APPROVED" },
  { userId: 8, activityId: 4, status: "PENDING" },

  // --- ART ---
  // กิจกรรม 5 (Watercolor): 2 คนจอยแล้ว
  { userId: 2, activityId: 5, status: "APPROVED" },
  { userId: 9, activityId: 5, status: "APPROVED" },

  // กิจกรรม 6 (Gallery Hopping): 1 คนจอยแล้ว, 1 คนรอ
  { userId: 10, activityId: 6, status: "APPROVED" },
  { userId: 1, activityId: 6, status: "PENDING" },

  // --- FOOD ---
  // กิจกรรม 7 (Ban Tad Thong): 2 คนจอยแล้ว, 2 คนรอ
  { userId: 3, activityId: 7, status: "APPROVED" },
  { userId: 5, activityId: 7, status: "APPROVED" },
  { userId: 8, activityId: 7, status: "PENDING" },
  { userId: 9, activityId: 7, status: "PENDING" },

  // กิจกรรม 8 (Yaowarat): 1 คนจอยแล้ว, 1 คนรอ
  { userId: 1, activityId: 8, status: "APPROVED" },
  { userId: 4, activityId: 8, status: "PENDING" },

  // --- TRAVEL ---
  // กิจกรรม 9 (River Cruise): 1 คนจอยแล้ว, 1 คนรอ
  { userId: 6, activityId: 9, status: "APPROVED" },
  { userId: 7, activityId: 9, status: "PENDING" },

  // กิจกรรม 10 (Bicycle Tour): 1 คนจอยแล้ว, 1 คนรอ
  { userId: 2, activityId: 10, status: "APPROVED" },
  { userId: 8, activityId: 10, status: "PENDING" },
];
