import { prisma } from "../lib/prisma.js";

export const getUserById = async (userId) => {
  try {
    // ตรวจสอบและแปลงรูปแบบ ID (ID ใน Schema เป็น Int)
    const id = parseInt(userId);
    if (isNaN(id)) {
      throw new Error("Invalid User ID format");
    }
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        //  ข้อมูลพื้นฐานของผู้ใช้ 
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        profileImg: true,
        bio: true,
        isVerified: true,
        trustScore: true,
        createdAt: true,

        // ข้อมูลรีวิวที่ได้รับ (Relation: reviewsReceived) 
        reviewsReceived: {
          select: {
            rating: true,
            comment: true,
            createdAt: true, // เพิ่มวันที่รีวิวเผื่อใช้เรียงลำดับ
            reviewer: {      // ดึงชื่อคนที่มารีวิว 
               select: {
                 firstName: true,
                 profileImg: true
               }
            }
          },
          orderBy: {
            createdAt: 'desc' // รีวิวล่าสุดอยู่บน
          },
          take: 10 // ดึงมาแค่ 10 รายการล่าสุด
        },

        //  การนับจำนวน 
        _count: {
          select: { 
            createdActivities: true,  // จำนวนกิจกรรมที่สร้าง
            visitedPlaces: true,      // จำนวนสถานที่ที่เคยไป
            receivedFriendRequests: true // จำนวนเพื่อน 
          }
        }
      },
    });

    //  ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (!user) {
      return { 
        success: false, 
        message: "ไม่พบข้อมูลผู้ใช้ในระบบ" 
      };
    }

    // ส่งข้อมูลกลับ
    return { 
      success: true, 
      data: user 
    };

  } catch (error) {
    console.error("Error in getUserById implementation:", error);
    return { 
      success: false, 
      message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" 
    };
  }
};
