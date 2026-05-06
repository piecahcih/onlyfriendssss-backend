import * as accountService from "../services/account.service.js";
import fs from "fs/promises";
import path from "path";
import createError from "http-errors";

export const getMeCtrl = async (req, res, next) => {
  try {
    const user = await accountService.getUserById(req.result.id);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateMeCtrl = async (req, res, next) => {
  try {
    const { username, bio, firstName, lastName, gender } = req.body || {};
    const userId = req.result?.id;

    if (!userId) {
      return next(createError(401, "Please log in again."));
    }

    const localFilePath = req.file ? req.file.path : null;

    const updateData = {};

    if (localFilePath) {
      updateData.profileImg = `/uploads/${localFilePath}`;
    }

    if (typeof username === "string" && username.trim())
      updateData.username = username.trim();
    if (typeof firstName === "string" && firstName.trim())
      updateData.firstName = firstName.trim();
    if (typeof lastName === "string" && lastName.trim())
      updateData.lastName = lastName.trim();
    if (typeof bio === "string") updateData.bio = bio.trim();
    if (typeof gender === "string") updateData.gender = gender;

    if (Object.keys(updateData).length === 0) {
      return next(
        createError(
          400,
          "Please provide the details you would like to modify.",
        ),
      );
    }

    const updatedUser = await accountService.updateUserProfile(
      userId,
      updateData,
      localFilePath,
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully ✨",
      data: updatedUser,
    });
  } catch (error) {
    console.error("PATCH Profile Error:", error);
    if (error.code === "P2002") {
      return next(createError(409, "Username already exists"));
    }
    next(error);
  }
};

export const getUserProfileCtrl = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await accountService.getUserById(userId);
    if (!user.success) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: user.data });
  } catch (error) {
    next(error);
  }
};

export const deleteMeCtrl = async (req, res, next) => {
  try {
    const userId = req.result.id;
    const user = await accountService.getUserById(userId);
    if (!user.data) {
      throw createError(404, "User not found");
    }

    await accountService.deleteUserAccountb(userId);

    if (user.data.profileImg) {
      const relativePath = user.data.profileImg.startsWith("/")
        ? user.data.profileImg.substring(1)
        : user.data.profileImg;

      const filePath = path.join(process.cwd(), "public", relativePath);
      try {
        await fs.unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
      } catch (err) {
        console.error("Physical file deletion failed:", err.message);
      }
    }

    res.status(200).json({
      message: "Your account has been successfully deleted.",
    });
  } catch (error) {
    if (error.code === "P2025")
      return next(createError(404, "User account not found"));
    next(error);
  }
};
