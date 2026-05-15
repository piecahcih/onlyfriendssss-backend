import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); //ชื่อโฟลเดอร์ที่สร้างไว้
  },
  filename: (req, file, cb) => {
    // ตั้งชื่อไฟล์: วันที่ปัจจุบัน + นามสกุลไฟล์เดิม
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploads = multer({ storage: storage });

export default uploads;
