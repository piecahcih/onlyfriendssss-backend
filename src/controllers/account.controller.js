import * as accountService from '../services/account.service.js'
import fs from 'fs/promises'; 
import path from 'path';
import createError from 'http-errors';

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
    const updateData = {};

    if (req.file) {
      updateData.profileImg = `/uploads/${req.file.filename}`;
    }

    const { username, bio, firstName, lastName, gender } = req.body || {};

    if (username?.trim()) updateData.username = username.trim();
    if (firstName?.trim()) updateData.firstName = firstName.trim();
    if (lastName?.trim()) updateData.lastName = lastName.trim();
    if (typeof bio !== 'undefined') {
      updateData.bio = bio.trim();
    }
    if (gender) {
      updateData.gender = gender;
    }
    if (Object.keys(updateData).length === 0) {
      return next(createError(400, "No data provided for update"));
    }
      if (!req.result?.id) {
            return next(createError(401, "ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่"));
       }

    const updatedUser = await accountService.updateUserProfile(req.result.id, updateData);
    
    res.status(200).json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return next(createError(409, "Username already exists"));
    }
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

    // สั่งลบใน Database ก่อน (ถ้า DB พัง ไฟล์รูปจะได้ยังอยู่เพื่อตรวจสอบ)
    await accountService.deleteUserAccount(userId);

    // จัดการลบไฟล์รูปภาพจริง
    if (user.data.profileImg) {
      
      // ลบเครื่องหมาย / ตัวหน้าออกถ้ามี เพื่อให้ path.join ทำงานถูกต้อง
      const relativePath = user.data.profileImg.startsWith('/') 
        ? user.data.profileImg.substring(1) 
        : user.data.profileImg;

      const filePath = path.join(process.cwd(), 'public', relativePath);
      try {
        await fs.unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
      } catch (err) {
        console.error("Physical file deletion failed:", err.message);
      }
    }

    res.status(200).json({ 
      message: "บัญชีของคุณถูกลบออกจากระบบเรียบร้อยแล้ว" 
    });
  } catch (error) {
    if (error.code === 'P2025') return next(createError(404, "ไม่พบข้อมูลบัญชีผู้ใช้"));
    next(error);
  }
};