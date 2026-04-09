# Onlyfriendssss API Documentation ⋆｡🌺°✩

---

```markdown
# 🤝 Only Friendssss - Web Application

**Only Friendssss** เป็นแพลตฟอร์มสำหรับหาเพื่อนร่วมทำกิจกรรม (Activity Matching) ที่เน้นความปลอดภัยด้วยระบบยืนยันตัวตน และการสร้างชุมชนที่มีคุณภาพผ่านระบบคะแนนความน่าเชื่อถือ (Trust Score)

---

## 🚀 Features

- **Activity Management**: สร้าง เข้าร่วม และจัดการกิจกรรม (สุขภาพ, บันเทิง, Art, กิน, ท่องเที่ยว)
- **Smart Routes**: บันทึกสถานที่และสร้างเส้นทางแผนการท่องเที่ยว
- **Identity Verification**: ยืนยันตัวตนด้วย AI (Face Descriptor) เพื่อรับเครื่องหมายติ๊กถูกสีฟ้า
- **Social & Chat**: ระบบเพิ่มเพื่อนและห้องแชทเฉพาะกลุ่มกิจกรรม
- **Trust System**: ระบบรีวิวเพื่อนร่วมทริปรายบุคคลเพื่อสะสมคะแนน Trust Score

---

## 🛠 Tech Stack

- **Frontend**: Next.js / React, Tailwind CSS
- **Backend**: Node.js (Express), Prisma ORM
- **Database**: MySQL
- **Authentication**: Firebase Auth (Integration) & JWT
- **AI**: Face-api.js (for Face Descriptor)
- **Map**: Google Maps Platform

---

## 📊 Database Schema (Prisma)

แอปพลิเคชันนี้ประกอบด้วย Entity หลักดังนี้:

- `User`: เก็บข้อมูลสมาชิก, สถานะ Verification และ Trust Score
- `Activity`: กิจกรรมที่สร้างโดย Host
- `JoinRequest`: คำขอเข้าร่วมกิจกรรม (Pending, Approved, Rejected)
- `Place & Route`: ระบบจัดการสถานที่และแผนการเดินทาง
- `Review`: การให้คะแนนกิจกรรมและรีวิวเพื่อนร่วมทริปแบบ Peer-to-Peer
- `ChatGroup & Message`: ระบบสื่อสารในกลุ่มกิจกรรม

---

## 📑 API Endpoints

### 🔑 Authentication & User

| Method | Endpoint                 | Description                             |
| :----- | :----------------------- | :-------------------------------------- |
| `POST` | `/api/auth/register`     | Register new user with Firebase UID     |
| `POST` | `/api/auth/login`        | Login and get access token              |
| `GET`  | `/api/users/profile`     | Get current user profile & trust score  |
| `PUT`  | `/api/users/profile`     | Update profile information              |
| `POST` | `/api/users/verify-face` | Update Face Descriptor for verification |

### 🔑 Profile

| Method   | Endpoint                 | Description                            |
| :------- | :----------------------- | :------------------------------------- |
| `GET`    | `/api/users/profile`     | Get current user profile & trust score |
| `PATCH`  | `/api/users/profile`     | Update profile information             |
| `DELETE` | `/api/users/profile/:id` | Delete account                         |

### 🎡 Activities

| Method  | Endpoint                     | Description                                 |
| :------ | :--------------------------- | :------------------------------------------ |
| `GET`   | `/api/activities`            | List all activities (with filters)          |
| `POST`  | `/api/activities`            | Create new activity                         |
| `GET`   | `/api/activities/:id`        | Get activity details and participants       |
| `PATCH` | `/api/activities/:id/status` | Update activity status (OPEN/FULL/FINISHED) |

### 📩 Join Requests

| Method   | Endpoint                   | Description                        |
| :------- | :------------------------- | :--------------------------------- |
| `POST`   | `/api/activities/:id/join` | Send a request to join an activity |
| `PATCH`  | `/api/requests/:id`        | Host approves/rejects a request    |
| `DELETE` | `/api/requests/:id`        | User cancels their request         |

### 🗺️ Places & Routes

| Method | Endpoint             | Description                            |
| :----- | :------------------- | :------------------------------------- |
| `POST` | `/api/places`        | Add a new location (Lat/Long)          |
| `POST` | `/api/routes`        | Create a new trip route (Step-by-step) |
| `GET`  | `/api/users/history` | Get user's visited places history      |

### ⭐️ Review & Social

| Method | Endpoint                 | Description                            |
| :----- | :----------------------- | :------------------------------------- |
| `POST` | `/api/reviews/peer`      | Review a specific trip buddy           |
| `POST` | `/api/friends/request`   | Send a friend request                  |
| `GET`  | `/api/chats/:activityId` | Get chat history for an activity group |

---

## 📋 Click Up - Task List (Summary)

### Phase 1: Foundation

- [ ] Database Setup & Prisma Migration
- [ ] Auth & Profile APIs
- [ ] UI Landing Page & Auth Flow

### Phase 2: Core Activity

- [ ] Activity CRUD & Category Filtering
- [ ] Join/Request Logic & Notification
- [ ] Slot Management (Open/Full Status)

### Phase 3: Maps & Social

- [ ] Google Maps Integration
- [ ] Route Builder UI/UX
- [ ] Real-time Chat with Socket.io

### Phase 4: Trust & AI

- [ ] AI Face Recognition Integration
- [ ] Peer-to-Peer Review System
- [ ] Final UI Polish & Deployment

---

## 📦 Getting Started

1. Clone the repository: `git clone ...`
2. Install dependencies: `npm install`
3. Set up your `.env` file (Database URL, Firebase Keys, etc.)
4. Run Prisma migration: `npx prisma migrate dev`
5. Start development server: `npm run dev`
```
