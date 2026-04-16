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
        gender: true,
        isVerified: true,
        trustScore: true,
        createdAt: true,

        // ข้อมูลรีวิวที่ได้รับ 
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

        _count: {
          select: { 
            createdActivities: true,  // จำนวนกิจกรรมที่สร้าง
            visitedPlaces: true,      // จำนวนสถานที่ที่เคยไป
            receivedFriendRequests: true // จำนวนเพื่อน 
          }
        }
      },
    });

    if (!user) {
      return { 
        success: false, 
        message: "ไม่พบข้อมูลผู้ใช้ในระบบ" 
      };
    }

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




export const updateUserProfile = async (userId, updateData) => {
  try {
    const id = parseInt(userId);
    
    return await prisma.user.update({
      where: { id: id },
      data: updateData, 
      select: { 
        id: true, 
        username: true, 
        email: true, 
        profileImg: true, 
        bio: true,
        firstName: true,
        lastName: true,
        gender: true,
        isVerified: true,
        trustScore: true
      }
    });
  } catch (error) {
    console.error("Update User Error:", error);
    throw error; 
  }
};


export const deleteUserAccount = async (userId) => {
  const id = parseInt(userId);

  // ใช้ $transaction เพื่อให้มั่นใจว่าถ้าลบไม่สำเร็จ ข้อมูลจะไม่พัง
  return await prisma.$transaction(async (tx) => {
    
    const deletedUser = await tx.user.delete({
      where: { id: id },
      select: { id: true, email: true }
    });

    return deletedUser;
  });
};