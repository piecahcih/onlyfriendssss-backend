import { prisma } from "../lib/prisma.js";
import fs from "fs/promises";
import path from "path";
import cloudinary from "../../config/cloudinary.js";

export const getUserById = async (userId) => {
  try {
    const id = parseInt(userId);
    if (isNaN(id)) {
      throw new Error("Invalid User ID format");
    }
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
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

        reviewsReceived: {
          select: {
            rating: true,
            comment: true,
            createdAt: true,
            reviewer: {
              select: {
                firstName: true,
                profileImg: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },

        _count: {
          select: {
            createdActivities: true, // จำนวนกิจกรรมที่สร้าง
            visitedPlaces: true, // จำนวนสถานที่ที่เคยไป
            receivedFriendRequests: true, // จำนวนเพื่อน
          },
        },
      },
    });

    if (!user) {
      return {
        success: false,
        message: "No user data found in the system.",
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Error in getUserById implementation:", error);
    return {
      success: false,
      message: "Internal Server Error.",
    };
  }
};

export const updateUserProfile = async (userId, updateData, localFilePath) => {
  try {
    const id = parseInt(userId);
    let oldProfileImg = null;

    const existingUser = await prisma.user.findUnique({
      where: { id: id },
      select: { profileImg: true },
    });
    oldProfileImg = existingUser?.profileImg;

    if (localFilePath) {
      try {
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
          folder: "profile_images",
        });

        updateData.profileImg = uploadResult.secure_url;

        await fs.unlink(localFilePath);
      } catch (uploadErr) {
        console.error("Cloudinary Upload Error:", uploadErr);

        if (localFilePath) await fs.unlink(localFilePath).catch(() => {});
        throw new Error("Failed to upload image to Cloudinary");
      }
    }

    const updatedUser = await prisma.user.update({
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
        trustScore: true,
      },
    });

    if (
      oldProfileImg &&
      updateData.profileImg &&
      oldProfileImg !== updateData.profileImg
    ) {
      if (!oldProfileImg.startsWith("http")) {
        const cleanPath = oldProfileImg.startsWith("/")
          ? oldProfileImg.substring(1)
          : oldProfileImg;

        const oldFilePath = path.join(process.cwd(), "src", cleanPath);

        try {
          await fs.unlink(oldFilePath);
          console.log(`🗑️ Deleted old local file: ${oldFilePath}`);
        } catch (fsErr) {
          console.warn("No old files found to delete", fsErr.message);
        }
      }
    }

    return updatedUser;
  } catch (error) {
    console.error("Update User Error:", error);
    throw error;
  }
};

export const deleteUserAccountb = async (userId) => {
  const id = parseInt(userId);

  return await prisma.$transaction(async (tx) => {
    const deletedUser = await tx.user.delete({
      where: { id: id },
      select: { id: true, email: true },
    });

    return deletedUser;
  });
};
