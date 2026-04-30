// back/data/joinRequests.js
export const joinRequestData = [

  // --- JOIN REQUESTS FOR OLD ACTIVITIES (ID 1-10) ---
  
        // กิจกรรม 1 (Morning Yoga): 2 approved 0 pending 0 rejected
        { userId: 1, activityId: 1, status: "APPROVED" },
        { userId: 2, activityId: 1, status: "APPROVED" },
        { userId: 3, activityId: 1, status: "APPROVED" },

        // กิจกรรม 2 (Midnight City Cycling): 2 approved 0 pending 0 rejected
        { userId: 2, activityId: 2, status: "APPROVED" },
        { userId: 1, activityId: 2, status: "APPROVED" },
        { userId: 4, activityId: 2, status: "APPROVED" },

        // กิจกรรม 3 (Board Game Marathon): 2 approved 0 pending 0 rejected
        { userId: 3, activityId: 3, status: "APPROVED" },
        { userId: 1, activityId: 3, status: "APPROVED" },
        { userId: 2, activityId: 3, status: "APPROVED" },

        // กิจกรรม 4 (Retro Arcade Night): 2 approved 0 pending 0 rejected
        { userId: 4, activityId: 4, status: "APPROVED" },
        { userId: 5, activityId: 4, status: "APPROVED" },
        { userId: 6, activityId: 4, status: "APPROVED" },

        // กิจกรรม 5 (Minimalist Pottery Class): 2 approved 0 pending 0 rejected
        { userId: 5, activityId: 5, status: "APPROVED" },
        { userId: 1, activityId: 5, status: "APPROVED" },
        { userId: 2, activityId: 5, status: "APPROVED" },

        // กิจกรรม 6 (Street Art Tour: Talat Noi): 2 approved 0 pending 0 rejected
        { userId: 6, activityId: 6, status: "APPROVED" },
        { userId: 3, activityId: 6, status: "APPROVED" },
        { userId: 4, activityId: 6, status: "APPROVED" },

        // กิจกรรม 7 (Street Food Tour: Ban Tad Thong): 2 approved 0 pending 0 rejected
        { userId: 7, activityId: 7, status: "APPROVED" },
        { userId: 8, activityId: 7, status: "APPROVED" },
        { userId: 9, activityId: 7, status: "APPROVED" },

        // กิจกรรม 8 (Thai Dessert Class): 2 approved 0 pending 0 rejected
        { userId: 8, activityId: 8, status: "APPROVED" },
        { userId: 10, activityId: 8, status: "APPROVED" },
        { userId: 1, activityId: 8, status: "APPROVED" },

        // กิจกรรม 9 (Summer Beach Trip): 2 approved 0 pending 0 rejected
        { userId: 9, activityId: 9, status: "APPROVED" },
        { userId: 2, activityId: 9, status: "APPROVED" },
        { userId: 3, activityId: 9, status: "APPROVED" },

        // กิจกรรม 10 (Bang Krachao Green Lung Walk): 2 approved 0 pending 0 rejected
        { userId: 10, activityId: 10, status: "APPROVED" },
        { userId: 4, activityId: 10, status: "APPROVED" },
        { userId: 5, activityId: 10, status: "APPROVED" },

        // กิจกรรม 10 (Bang Krachao Green Lung Walk): 2 approved 0 pending 0 rejected
        { userId: 11, activityId: 11, status: "APPROVED" },
        { userId: 4, activityId: 11, status: "APPROVED" },
        { userId: 5, activityId: 11, status: "APPROVED" },

  // --- HEALTH ---
  
  // กิจกรรม 12 (Morning Run at Benjakitti)
{ userId: 1, activityId: 12, status: "APPROVED" },
{ userId: 2, activityId: 12, status: "APPROVED" },
{ userId: 3, activityId: 12, status: "APPROVED" },
{ userId: 4, activityId: 12, status: "APPROVED" },
{ userId: 5, activityId: 12, status: "APPROVED" },
{ userId: 7, activityId: 12, status: "APPROVED" },

// กิจกรรม 13 (Yoga in the Park)
{ userId: 2, activityId: 13, status: "APPROVED" },
{ userId: 3, activityId: 13, status: "APPROVED" },
{ userId: 4, activityId: 13, status: "APPROVED" },
{ userId: 5, activityId: 13, status: "APPROVED" },

// กิจกรรม 14 (เต้นแอโรบิคสวนลุม)
{ userId: 3, activityId: 14, status: "APPROVED" },
{ userId: 11, activityId: 14, status: "APPROVED" },
{ userId: 2, activityId: 14, status: "APPROVED" },
{ userId: 4, activityId: 14, status: "APPROVED" },
{ userId: 5, activityId: 14, status: "APPROVED" },
{ userId: 6, activityId: 14, status: "APPROVED" },

  // --- ENTERTAINMENT ---
  
 // กิจกรรม 15 (Board Game Night @Siam)
{ userId: 3, activityId: 15, status: "APPROVED" },
{ userId: 1, activityId: 15, status: "APPROVED" },
{ userId: 2, activityId: 15, status: "APPROVED" },
{ userId: 4, activityId: 15, status: "PENDING" },
{ userId: 5, activityId: 15, status: "PENDING" },

// กิจกรรม 16 (ร้องเกะ @Thonglor)
{ userId: 4, activityId: 16, status: "APPROVED" },
{ userId: 2, activityId: 16, status: "APPROVED" },
{ userId: 3, activityId: 16, status: "APPROVED" },
{ userId: 5, activityId: 16, status: "APPROVED" },
{ userId: 11, activityId: 16, status: "APPROVED" },
{ userId: 7, activityId: 16, status: "APPROVED" },
  // --- ART ---
  
// กิจกรรม 17 (Watercolor Workshop @Ari)
{ userId: 5, activityId: 17, status: "APPROVED" },
{ userId: 4, activityId: 17, status: "APPROVED" },
{ userId: 2, activityId: 17, status: "APPROVED" },
{ userId: 3, activityId: 17, status: "APPROVED" },
{ userId: 6, activityId: 17, status: "APPROVED" },
{ userId: 7, activityId: 17, status: "APPROVED" },

// กิจกรรม 18 (ตลาดน้อย Gallery Hopping)
{ userId: 6, activityId: 18, status: "APPROVED" },
{ userId: 1, activityId: 18, status: "APPROVED" },
{ userId: 2, activityId: 18, status: "APPROVED" },
{ userId: 7, activityId: 18, status: "APPROVED" },
{ userId: 4, activityId: 18, status: "APPROVED" },
{ userId: 5, activityId: 18, status: "APPROVED" },

  // --- FOOD ---
  
// กิจกรรม 19 (Ban Tad Thong Foodie Tour)
{ userId: 7, activityId: 19, status: "APPROVED" },
{ userId: 1, activityId: 19, status: "APPROVED" },
{ userId: 2, activityId: 19, status: "APPROVED" },
{ userId: 3, activityId: 19, status: "APPROVED" },
{ userId: 4, activityId: 19, status: "APPROVED" },
{ userId: 5, activityId: 19, status: "APPROVED" },
{ userId: 6, activityId: 19, status: "APPROVED" },

// กิจกรรม 20 (Yaowarat Night Market Feast)
{ userId: 8, activityId: 20, status: "APPROVED" },
{ userId: 1, activityId: 20, status: "APPROVED" },
{ userId: 2, activityId: 20, status: "APPROVED" },
{ userId: 6, activityId: 20, status: "APPROVED" },
{ userId: 4, activityId: 20, status: "APPROVED" },
{ userId: 5, activityId: 20, status: "APPROVED" },

  // --- TRAVEL ---
  
// กิจกรรม 21 (Chao Phraya River Cruise)
{ userId: 9, activityId: 21, status: "APPROVED" },
{ userId: 2, activityId: 21, status: "APPROVED" },
{ userId: 3, activityId: 21, status: "APPROVED" },
{ userId: 4, activityId: 21, status: "APPROVED" },
{ userId: 5, activityId: 21, status: "APPROVED" },

// กิจกรรม 22 (Hidden Bangkok Bicycle Tour)
{ userId: 10, activityId: 22, status: "APPROVED" },
{ userId: 2, activityId: 22, status: "APPROVED" },
{ userId: 3, activityId: 22, status: "APPROVED" },
{ userId: 7, activityId: 22, status: "APPROVED" },
{ userId: 4, activityId: 22, status: "APPROVED" },
{ userId: 5, activityId: 22, status: "APPROVED" },

  // --- HOST 1 ---
  
  // กิจกรรม 23 (หาก๊วนตีแบตวันเสาร์)
{ userId: 1, activityId: 23, status: "APPROVED" },
{ userId: 2, activityId: 23, status: "APPROVED" },
{ userId: 3, activityId: 23, status: "APPROVED" },
{ userId: 5, activityId: 23, status: "APPROVED" },
{ userId: 4, activityId: 23, status: "PENDING" },
{ userId: 6, activityId: 23, status: "PENDING" },

// กิจกรรม 24 (MOCA Museum Hopping)
{ userId: 1, activityId: 24, status: "APPROVED" },
{ userId: 2, activityId: 24, status: "APPROVED" },
{ userId: 7, activityId: 24, status: "APPROVED" },
{ userId: 4, activityId: 24, status: "APPROVED" },
{ userId: 5, activityId: 24, status: "APPROVED" },
{ userId: 6, activityId: 24, status: "APPROVED" },

// กิจกรรม 25 (หาตี้วาโร AIS สามย่าน)
{ userId: 1, activityId: 25, status: "APPROVED" },
{ userId: 2, activityId: 25, status: "APPROVED" },
{ userId: 3, activityId: 25, status: "APPROVED" },
{ userId: 4, activityId: 25, status: "APPROVED" },
{ userId: 5, activityId: 25, status: "APPROVED" },

// กิจกรรม 26 (Late Night Gym Squad)
{ userId: 1, activityId: 26, status: "APPROVED" },
{ userId: 2, activityId: 26, status: "APPROVED" },
{ userId: 3, activityId: 26, status: "APPROVED" },
{ userId: 4, activityId: 26, status: "APPROVED" },
{ userId: 5, activityId: 26, status: "APPROVED" },
{ userId: 6, activityId: 26, status: "APPROVED" },
{ userId: 7, activityId: 26, status: "APPROVED" },

  // --- HOST 2 ---
  
// กิจกรรม 27 (Indy Live Music)
{ userId: 2, activityId: 27, status: "APPROVED" },
{ userId: 1, activityId: 27, status: "APPROVED" },
{ userId: 10, activityId: 27, status: "APPROVED" },
{ userId: 4, activityId: 27, status: "APPROVED" },
{ userId: 7, activityId: 27, status: "APPROVED" },
{ userId: 6, activityId: 27, status: "APPROVED" },

// กิจกรรม 28 (ถ่ายรูปฟิล์มหัวลำโพง)
{ userId: 2, activityId: 28, status: "APPROVED" },
{ userId: 1, activityId: 28, status: "APPROVED" },
{ userId: 3, activityId: 28, status: "APPROVED" },
{ userId: 5, activityId: 28, status: "PENDING" },
{ userId: 8, activityId: 28, status: "PENDING" },
{ userId: 4, activityId: 28, status: "REJECTED" },

// กิจกรรม 29 (Jodd Fairs Night Market)
{ userId: 2, activityId: 29, status: "APPROVED" },
{ userId: 7, activityId: 29, status: "APPROVED" },
{ userId: 3, activityId: 29, status: "APPROVED" },
{ userId: 9, activityId: 29, status: "APPROVED" },
{ userId: 5, activityId: 29, status: "APPROVED" },
{ userId: 6, activityId: 29, status: "APPROVED" },

// กิจกรรม 30 (Rattanakosin Tuk-Tuk Tour)
{ userId: 2, activityId: 30, status: "APPROVED" },
{ userId: 3, activityId: 30, status: "APPROVED" },
{ userId: 4, activityId: 30, status: "APPROVED" },
{ userId: 9, activityId: 30, status: "APPROVED" },
{ userId: 6, activityId: 30, status: "APPROVED" },
{ userId: 7, activityId: 30, status: "APPROVED" },

  // --- HOST 3 ---
  
// กิจกรรม 31 (Stand-up Comedy Night)
{ userId: 3, activityId: 31, status: "APPROVED" },
{ userId: 2, activityId: 31, status: "APPROVED" },
{ userId: 10, activityId: 31, status: "APPROVED" },
{ userId: 5, activityId: 31, status: "APPROVED" },
{ userId: 6, activityId: 31, status: "APPROVED" },

// กิจกรรม 32 (Talat Phlu Street Food Crawl)
{ userId: 3, activityId: 32, status: "APPROVED" },
{ userId: 11, activityId: 32, status: "APPROVED" },
{ userId: 7, activityId: 32, status: "APPROVED" },
{ userId: 4, activityId: 32, status: "APPROVED" },
{ userId: 5, activityId: 32, status: "APPROVED" },
{ userId: 6, activityId: 32, status: "APPROVED" },

  // --- HOST 4 ---
  
// กิจกรรม 33 (ปั่นจักรยาน @Bang Krachao)
{ userId: 4, activityId: 33, status: "APPROVED" },
{ userId: 2, activityId: 33, status: "APPROVED" },
{ userId: 11, activityId: 33, status: "APPROVED" },
{ userId: 3, activityId: 33, status: "APPROVED" },
{ userId: 5, activityId: 33, status: "APPROVED" },

// กิจกรรม 34 (Omakase Experience @Thonglor)
{ userId: 4, activityId: 34, status: "APPROVED" },
{ userId: 1, activityId: 34, status: "APPROVED" },
{ userId: 2, activityId: 34, status: "APPROVED" },
{ userId: 3, activityId: 34, status: "APPROVED" },
  // --- HOST 5 ---
  
// กิจกรรม 35 (Pottery Workshop for Beginners)
{ userId: 5, activityId: 35, status: "APPROVED" },
{ userId: 1, activityId: 35, status: "APPROVED" },
{ userId: 11, activityId: 35, status: "APPROVED" },
{ userId: 3, activityId: 35, status: "APPROVED" },
{ userId: 10, activityId: 35, status: "PENDING" },
{ userId: 6, activityId: 35, status: "PENDING" },

// กิจกรรม 36 (Mahanakhon Skywalk Sunset)
{ userId: 5, activityId: 36, status: "APPROVED" },
{ userId: 11, activityId: 36, status: "APPROVED" },
{ userId: 3, activityId: 36, status: "APPROVED" },
{ userId: 4, activityId: 36, status: "APPROVED" },
{ userId: 10, activityId: 36, status: "APPROVED" },
{ userId: 6, activityId: 36, status: "APPROVED" },

// กิจกรรม 37 (หาเพื่อนไปวิ่งสวนลุม)
{ userId: 5, activityId: 37, status: "APPROVED" },
{ userId: 2, activityId: 37, status: "APPROVED" },
{ userId: 3, activityId: 37, status: "APPROVED" },
{ userId: 10, activityId: 37, status: "APPROVED" },
{ userId: 11, activityId: 37, status: "APPROVED" },
{ userId: 6, activityId: 37, status: "APPROVED" },

  // --- HOST 6 ---
  
// กิจกรรม 38 (หาเพื่อนวาดรูปเล่นแถววัดอรุณ)
{ userId: 6, activityId: 38, status: "APPROVED" },
{ userId: 2, activityId: 38, status: "APPROVED" },
{ userId: 3, activityId: 38, status: "APPROVED" },
{ userId: 4, activityId: 38, status: "APPROVED" },

// กิจกรรม 39 (Music Festival @Bitec)
{ userId: 6, activityId: 39, status: "APPROVED" },
{ userId: 11, activityId: 39, status: "APPROVED" },
{ userId: 6, activityId: 39, status: "APPROVED" },
{ userId: 3, activityId: 39, status: "APPROVED" },
{ userId: 10, activityId: 39, status: "APPROVED" },
{ userId: 5, activityId: 39, status: "APPROVED" },

  // --- HOST 7 ---
  
// กิจกรรม 40 (หาเพื่อนกินติ่มซำจร้าาา)
{ userId: 7, activityId: 40, status: "APPROVED" },
{ userId: 10, activityId: 40, status: "APPROVED" },
{ userId: 2, activityId: 40, status: "APPROVED" },
{ userId: 3, activityId: 40, status: "APPROVED" },

// กิจกรรม 41 (Chinatown Hidden Gems Walk)
{ userId: 7, activityId: 41, status: "APPROVED" },
{ userId: 1, activityId: 41, status: "APPROVED" },
{ userId: 11, activityId: 41, status: "APPROVED" },
{ userId: 4, activityId: 41, status: "APPROVED" },
{ userId: 5, activityId: 41, status: "APPROVED" },

  // --- HOST 8 ---
  
// กิจกรรม 42 (Café Hopping @สยาม)
{ userId: 8, activityId: 42, status: "APPROVED" },
{ userId: 1, activityId: 42, status: "APPROVED" },
{ userId: 2, activityId: 42, status: "APPROVED" },
{ userId: 3, activityId: 42, status: "APPROVED" },
{ userId: 4, activityId: 42, status: "APPROVED" },
{ userId: 5, activityId: 42, status: "APPROVED" },

// กิจกรรม 43 (VIP Movie Night @Ploenchit)
{ userId: 8, activityId: 43, status: "APPROVED" },
{ userId: 1, activityId: 43, status: "APPROVED" },
{ userId: 2, activityId: 43, status: "APPROVED" },
{ userId: 3, activityId: 43, status: "APPROVED" },
{ userId: 4, activityId: 43, status: "APPROVED" },

  // --- HOST 9 ---
  
// กิจกรรม 44 (รวมพลน้องหมา น้องแมว)
{ userId: 9, activityId: 44, status: "APPROVED" },
{ userId: 1, activityId: 44, status: "APPROVED" },
{ userId: 10, activityId: 44, status: "APPROVED" },
{ userId: 11, activityId: 44, status: "APPROVED" },
{ userId: 4, activityId: 44, status: "APPROVED" },
{ userId: 5, activityId: 44, status: "APPROVED" },
{ userId: 6, activityId: 44, status: "APPROVED" },

// กิจกรรม 45 (Sunset Yoga on the Skywalk)
{ userId: 9, activityId: 45, status: "APPROVED" },
{ userId: 2, activityId: 45, status: "APPROVED" },
{ userId: 3, activityId: 45, status: "APPROVED" },
{ userId: 4, activityId: 45, status: "APPROVED" },

  // --- HOST 10 ---
  
// กิจกรรม 46 (หาเพื่อนปีนผา @Sukhumvit 49)
{ userId: 10, activityId: 46, status: "APPROVED" },
{ userId: 2, activityId: 46, status: "APPROVED" },
{ userId: 3, activityId: 46, status: "APPROVED" },
{ userId: 4, activityId: 46, status: "APPROVED" },
];