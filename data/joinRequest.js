// back/data/joinRequests.js
export const joinRequestData = [

  // --- JOIN REQUESTS FOR OLD ACTIVITIES (ID 1-10) ---
  
        // กิจกรรม 1 (Morning Yoga): 2 approved 0 pending 0 rejected
        { userId: 2, activityId: 1, status: "APPROVED" },
        { userId: 3, activityId: 1, status: "APPROVED" },

        // กิจกรรม 2 (Midnight City Cycling): 2 approved 0 pending 0 rejected
        { userId: 1, activityId: 2, status: "APPROVED" },
        { userId: 4, activityId: 2, status: "APPROVED" },

        // กิจกรรม 3 (Board Game Marathon): 2 approved 0 pending 0 rejected
        { userId: 1, activityId: 3, status: "APPROVED" },
        { userId: 2, activityId: 3, status: "APPROVED" },

        // กิจกรรม 4 (Retro Arcade Night): 2 approved 0 pending 0 rejected
        { userId: 5, activityId: 4, status: "APPROVED" },
        { userId: 6, activityId: 4, status: "APPROVED" },

        // กิจกรรม 5 (Minimalist Pottery Class): 2 approved 0 pending 0 rejected
        { userId: 1, activityId: 5, status: "APPROVED" },
        { userId: 2, activityId: 5, status: "APPROVED" },

        // กิจกรรม 6 (Street Art Tour: Talat Noi): 2 approved 0 pending 0 rejected
        { userId: 3, activityId: 6, status: "APPROVED" },
        { userId: 4, activityId: 6, status: "APPROVED" },

        // กิจกรรม 7 (Street Food Tour: Ban Tad Thong): 2 approved 0 pending 0 rejected
        { userId: 8, activityId: 7, status: "APPROVED" },
        { userId: 9, activityId: 7, status: "APPROVED" },

        // กิจกรรม 8 (Thai Dessert Class): 2 approved 0 pending 0 rejected
        { userId: 10, activityId: 8, status: "APPROVED" },
        { userId: 1, activityId: 8, status: "APPROVED" },

        // กิจกรรม 9 (Summer Beach Trip): 2 approved 0 pending 0 rejected
        { userId: 2, activityId: 9, status: "APPROVED" },
        { userId: 3, activityId: 9, status: "APPROVED" },

        // กิจกรรม 10 (Bang Krachao Green Lung Walk): 2 approved 0 pending 0 rejected
        { userId: 4, activityId: 10, status: "APPROVED" },
        { userId: 5, activityId: 10, status: "APPROVED" },

  // --- HEALTH ---
  
  // กิจกรรม 11 (Morning Run at Benjakitti): 5 approved 1 pending 0 rejected
  { userId: 2, activityId: 11, status: "APPROVED" },
  { userId: 3, activityId: 11, status: "APPROVED" },
  { userId: 4, activityId: 11, status: "APPROVED" },
  { userId: 5, activityId: 11, status: "APPROVED" },
  { userId: 6, activityId: 11, status: "APPROVED" },
  { userId: 7, activityId: 11, status: "PENDING" },

  // กิจกรรม 12 (Yoga in the Park): 4 approved 1 pending 0 rejected
  { userId: 3, activityId: 12, status: "APPROVED" },
  { userId: 4, activityId: 12, status: "APPROVED" },
  { userId: 5, activityId: 12, status: "APPROVED" },
  { userId: 6, activityId: 12, status: "PENDING" },

  // กิจกรรม 13 (เต้นแอโรบิคสวนลุม): 5 approved 1 pending 0 rejected
  { userId: 1, activityId: 13, status: "APPROVED" },
  { userId: 2, activityId: 13, status: "APPROVED" },
  { userId: 4, activityId: 13, status: "APPROVED" },
  { userId: 5, activityId: 13, status: "APPROVED" },
  { userId: 6, activityId: 13, status: "APPROVED" },
  { userId: 7, activityId: 13, status: "PENDING" },

  // --- ENTERTAINMENT ---
  
  // กิจกรรม 14 (Board Game Night @Siam): 3 approved 1 pending 0 rejected
  { userId: 1, activityId: 14, status: "APPROVED" },
  { userId: 2, activityId: 14, status: "APPROVED" },
  { userId: 4, activityId: 14, status: "APPROVED" },
  { userId: 5, activityId: 14, status: "PENDING" },

  // กิจกรรม 15 (ร้องเกะ @Thonglor): 4 approved 1 pending 0 rejected
  { userId: 2, activityId: 15, status: "APPROVED" },
  { userId: 3, activityId: 15, status: "APPROVED" },
  { userId: 5, activityId: 15, status: "APPROVED" },
  { userId: 6, activityId: 15, status: "PENDING" },

  // --- ART ---
  
  // กิจกรรม 16 (Watercolor Workshop @Ari): 4 approved 1 pending 0 rejected
  { userId: 2, activityId: 16, status: "APPROVED" },
  { userId: 3, activityId: 16, status: "APPROVED" },
  { userId: 4, activityId: 16, status: "APPROVED" },
  { userId: 6, activityId: 16, status: "PENDING" },

  // กิจกรรม 17 (ตลาดน้อย Gallery Hopping): 5 approved 1 pending 0 rejected
  { userId: 1, activityId: 17, status: "APPROVED" },
  { userId: 2, activityId: 17, status: "APPROVED" },
  { userId: 3, activityId: 17, status: "APPROVED" },
  { userId: 4, activityId: 17, status: "APPROVED" },
  { userId: 5, activityId: 17, status: "APPROVED" },
  { userId: 7, activityId: 17, status: "PENDING" },

  // --- FOOD ---
  
  // กิจกรรม 18 (Ban Tad Thong Foodie Tour): 6 approved 1 pending 0 rejected
  { userId: 1, activityId: 18, status: "APPROVED" },
  { userId: 2, activityId: 18, status: "APPROVED" },
  { userId: 3, activityId: 18, status: "APPROVED" },
  { userId: 4, activityId: 18, status: "APPROVED" },
  { userId: 5, activityId: 18, status: "APPROVED" },
  { userId: 6, activityId: 18, status: "APPROVED" },
  { userId: 8, activityId: 18, status: "PENDING" },

  // กิจกรรม 19 (Yaowarat Night Market Feast): 5 approved 1 pending 0 rejected
  { userId: 1, activityId: 19, status: "APPROVED" },
  { userId: 2, activityId: 19, status: "APPROVED" },
  { userId: 3, activityId: 19, status: "APPROVED" },
  { userId: 4, activityId: 19, status: "APPROVED" },
  { userId: 5, activityId: 19, status: "APPROVED" },
  { userId: 6, activityId: 19, status: "PENDING" },

  // --- TRAVEL ---
  
  // กิจกรรม 20 (Chao Phraya River Cruise): 5 approved 1 pending 0 rejected
  { userId: 2, activityId: 20, status: "APPROVED" },
  { userId: 3, activityId: 20, status: "APPROVED" },
  { userId: 4, activityId: 20, status: "APPROVED" },
  { userId: 5, activityId: 20, status: "APPROVED" },
  { userId: 6, activityId: 20, status: "PENDING" },

  // กิจกรรม 21 (Hidden Bangkok Bicycle Tour): 4 approved 1 pending 0 rejected
  { userId: 2, activityId: 21, status: "APPROVED" },
  { userId: 3, activityId: 21, status: "APPROVED" },
  { userId: 4, activityId: 21, status: "APPROVED" },
  { userId: 5, activityId: 21, status: "PENDING" },

  // --- HOST 1 ---
  
  // กิจกรรม 22 (หาก๊วนตีแบตวันเสาร์): 4 approved 1 pending 0 rejected
  { userId: 2, activityId: 22, status: "APPROVED" },
  { userId: 3, activityId: 22, status: "APPROVED" },
  { userId: 4, activityId: 22, status: "APPROVED" },
  { userId: 5, activityId: 22, status: "APPROVED" },
  { userId: 6, activityId: 22, status: "PENDING" },

  // กิจกรรม 23 (MOCA Museum Hopping): 5 approved 1 pending 0 rejected
  { userId: 2, activityId: 23, status: "APPROVED" },
  { userId: 3, activityId: 23, status: "APPROVED" },
  { userId: 4, activityId: 23, status: "APPROVED" },
  { userId: 5, activityId: 23, status: "APPROVED" },
  { userId: 6, activityId: 23, status: "APPROVED" },
  { userId: 7, activityId: 23, status: "PENDING" },

  // กิจกรรม 24 (หาตี้วาโร AIS สามย่าน): 3 approved 1 pending 0 rejected
  { userId: 2, activityId: 24, status: "APPROVED" },
  { userId: 3, activityId: 24, status: "APPROVED" },
  { userId: 4, activityId: 24, status: "APPROVED" },
  { userId: 5, activityId: 24, status: "APPROVED" },

  // กิจกรรม 25 (Late Night Gym Squad): 5 approved 1 pending 0 rejected
  { userId: 2, activityId: 25, status: "APPROVED" },
  { userId: 3, activityId: 25, status: "APPROVED" },
  { userId: 4, activityId: 25, status: "APPROVED" },
  { userId: 5, activityId: 25, status: "APPROVED" },
  { userId: 6, activityId: 25, status: "APPROVED" },
  { userId: 7, activityId: 25, status: "PENDING" },

  // --- HOST 2 ---
  
  // กิจกรรม 26 (Indy Live Music): 5 approved 1 pending 0 rejected
  { userId: 1, activityId: 26, status: "APPROVED" },
  { userId: 3, activityId: 26, status: "APPROVED" },
  { userId: 4, activityId: 26, status: "APPROVED" },
  { userId: 5, activityId: 26, status: "APPROVED" },
  { userId: 6, activityId: 26, status: "APPROVED" },
  { userId: 7, activityId: 26, status: "PENDING" },

  // กิจกรรม 27 (ถ่ายรูปฟิล์มหัวลำโพง): 3 approved 1 pending 1 rejected
  { userId: 1, activityId: 27, status: "APPROVED" },
  { userId: 3, activityId: 27, status: "APPROVED" },
  { userId: 5, activityId: 27, status: "APPROVED" },
  { userId: 6, activityId: 27, status: "PENDING" },
  { userId: 4, activityId: 27, status: "REJECTED" },

  // กิจกรรม 28 (Jodd Fairs Night Market): 5 approved 1 pending 0 rejected
  { userId: 1, activityId: 28, status: "APPROVED" },
  { userId: 3, activityId: 28, status: "APPROVED" },
  { userId: 4, activityId: 28, status: "APPROVED" },
  { userId: 5, activityId: 28, status: "APPROVED" },
  { userId: 6, activityId: 28, status: "APPROVED" },
  { userId: 7, activityId: 28, status: "PENDING" },

  // กิจกรรม 29 (Rattanakosin Tuk-Tuk Tour): 5 approved 1 pending 0 rejected
  { userId: 3, activityId: 29, status: "APPROVED" },
  { userId: 4, activityId: 29, status: "APPROVED" },
  { userId: 5, activityId: 29, status: "APPROVED" },
  { userId: 6, activityId: 29, status: "APPROVED" },
  { userId: 7, activityId: 29, status: "PENDING" },

  // --- HOST 3 ---
  
  // กิจกรรม 30 (Stand-up Comedy Night): 5 approved 1 pending 0 rejected
  { userId: 2, activityId: 30, status: "APPROVED" },
  { userId: 4, activityId: 30, status: "APPROVED" },
  { userId: 5, activityId: 30, status: "APPROVED" },
  { userId: 6, activityId: 30, status: "APPROVED" },
  { userId: 7, activityId: 30, status: "PENDING" },

  // กิจกรรม 31 (Talat Phlu Street Food Crawl): 5 approved 1 pending 0 rejected
  { userId: 1, activityId: 31, status: "APPROVED" },
  { userId: 2, activityId: 31, status: "APPROVED" },
  { userId: 4, activityId: 31, status: "APPROVED" },
  { userId: 5, activityId: 31, status: "APPROVED" },
  { userId: 6, activityId: 31, status: "APPROVED" },
  { userId: 7, activityId: 31, status: "PENDING" },

  // --- HOST 4 ---
  
  // กิจกรรม 32 (ปั่นจักรยาน @Bang Krachao): 4 approved 1 pending 0 rejected
  { userId: 2, activityId: 32, status: "APPROVED" },
  { userId: 3, activityId: 32, status: "APPROVED" },
  { userId: 5, activityId: 32, status: "APPROVED" },
  { userId: 6, activityId: 32, status: "PENDING" },

  // กิจกรรม 33 (Omakase Experience @Thonglor): 3 approved 1 pending 0 rejected
  { userId: 1, activityId: 33, status: "APPROVED" },
  { userId: 2, activityId: 33, status: "APPROVED" },
  { userId: 3, activityId: 33, status: "APPROVED" },
  { userId: 5, activityId: 33, status: "PENDING" },

  // --- HOST 5 ---
  
  // กิจกรรม 34 (Pottery Workshop for Beginners): 4 approved 1 pending 0 rejected
  { userId: 1, activityId: 34, status: "APPROVED" },
  { userId: 2, activityId: 34, status: "APPROVED" },
  { userId: 3, activityId: 34, status: "APPROVED" },
  { userId: 4, activityId: 34, status: "APPROVED" },
  { userId: 6, activityId: 34, status: "PENDING" },

  // กิจกรรม 35 (Mahanakhon Skywalk Sunset): 5 approved 1 pending 0 rejected
  { userId: 2, activityId: 35, status: "APPROVED" },
  { userId: 3, activityId: 35, status: "APPROVED" },
  { userId: 4, activityId: 35, status: "APPROVED" },
  { userId: 5, activityId: 35, status: "APPROVED" },
  { userId: 6, activityId: 35, status: "APPROVED" },
  { userId: 7, activityId: 35, status: "PENDING" },

  // กิจกรรม 36 (หาเพื่อนไปวิ่งสวนลุม): 4 approved 1 pending 0 rejected
  { userId: 2, activityId: 36, status: "APPROVED" },
  { userId: 3, activityId: 36, status: "APPROVED" },
  { userId: 4, activityId: 36, status: "APPROVED" },
  { userId: 6, activityId: 36, status: "PENDING" },

  // --- HOST 6 ---
  
  // กิจกรรม 37 (หาเพื่อนวาดรูปเล่นแถววัดอรุณ): 4 approved 1 pending 0 rejected
  { userId: 2, activityId: 37, status: "APPROVED" },
  { userId: 3, activityId: 37, status: "APPROVED" },
  { userId: 4, activityId: 37, status: "APPROVED" },
  { userId: 5, activityId: 37, status: "PENDING" },

  // กิจกรรม 38 (Music Festival @Bitec): 5 approved 1 pending 0 rejected
  { userId: 1, activityId: 38, status: "APPROVED" },
  { userId: 2, activityId: 38, status: "APPROVED" },
  { userId: 3, activityId: 38, status: "APPROVED" },
  { userId: 4, activityId: 38, status: "APPROVED" },
  { userId: 5, activityId: 38, status: "APPROVED" },
  { userId: 7, activityId: 38, status: "PENDING" },

  // --- HOST 7 ---
  
  // กิจกรรม 39 (หาเพื่อนกินติ่มซำจร้าาา): 3 approved 1 pending 0 rejected
  { userId: 1, activityId: 39, status: "APPROVED" },
  { userId: 2, activityId: 39, status: "APPROVED" },
  { userId: 3, activityId: 39, status: "APPROVED" },
  { userId: 4, activityId: 39, status: "PENDING" },

  // กิจกรรม 40 (Chinatown Hidden Gems Walk): 5 approved 1 pending 0 rejected
  { userId: 1, activityId: 40, status: "APPROVED" },
  { userId: 3, activityId: 40, status: "APPROVED" },
  { userId: 4, activityId: 40, status: "APPROVED" },
  { userId: 5, activityId: 40, status: "APPROVED" },
  { userId: 6, activityId: 40, status: "PENDING" },

  // --- HOST 8 ---
  
  // กิจกรรม 41 (Café Hopping @สยาม): 5 approved 1 pending 0 rejected
  { userId: 1, activityId: 41, status: "APPROVED" },
  { userId: 2, activityId: 41, status: "APPROVED" },
  { userId: 3, activityId: 41, status: "APPROVED" },
  { userId: 4, activityId: 41, status: "APPROVED" },
  { userId: 5, activityId: 41, status: "APPROVED" },
  { userId: 6, activityId: 41, status: "PENDING" },

  // กิจกรรม 42 (VIP Movie Night @Ploenchit): 4 approved 1 pending 0 rejected
  { userId: 1, activityId: 42, status: "APPROVED" },
  { userId: 2, activityId: 42, status: "APPROVED" },
  { userId: 3, activityId: 42, status: "APPROVED" },
  { userId: 4, activityId: 42, status: "APPROVED" },
  { userId: 5, activityId: 42, status: "PENDING" },

  // --- HOST 9 ---
  
  // กิจกรรม 43 (รวมพลน้องหมา น้องแมว): 6 approved 1 pending 0 rejected
  { userId: 1, activityId: 43, status: "APPROVED" },
  { userId: 2, activityId: 43, status: "APPROVED" },
  { userId: 3, activityId: 43, status: "APPROVED" },
  { userId: 4, activityId: 43, status: "APPROVED" },
  { userId: 5, activityId: 43, status: "APPROVED" },
  { userId: 6, activityId: 43, status: "APPROVED" },
  { userId: 7, activityId: 43, status: "PENDING" },

  // กิจกรรม 44 (Sunset Yoga on the Skywalk): 4 approved 1 pending 0 rejected
  { userId: 2, activityId: 44, status: "APPROVED" },
  { userId: 3, activityId: 44, status: "APPROVED" },
  { userId: 4, activityId: 44, status: "APPROVED" },
  { userId: 5, activityId: 44, status: "PENDING" },

  // --- HOST 10 ---
  
  // กิจกรรม 45 (หาเพื่อนปีนผา @Sukhumvit 49): 3 approved 1 pending 0 rejected
  { userId: 2, activityId: 45, status: "APPROVED" },
  { userId: 3, activityId: 45, status: "APPROVED" },
  { userId: 4, activityId: 45, status: "PENDING" }
];