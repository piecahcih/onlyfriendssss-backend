import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import activityRoute from "./routes/activity.route.js";
import friendRoute from "./routes/friend.route.js";
import accountRoute from "./routes/account.route.js";
import { activityStatusUpdater } from "./jobs/activityStatusUpdater.js";
import errorMiddleware from './middlewares/error.middleware.js'
import wishlistRouter from "./routes/wishlist.route.js";
import joinRouter from "./routes/join.route.js";
import { createServer } from 'node:http'
import chatRoute from "./routes/chat.route.js";
import { initSocket } from "./socket/index.js";
import reviewRouter from "./routes/review.route.js";
import notiRoute from "./routes/notification.route.js";
import interestRoute from "./routes/interest.route.js";

const app = express();
const server = createServer(app)
app.use(express.json());

const allowedOrigins = [
  'https://onlyfriendssss-frontend.vercel.app', // Your production frontend
  'http://localhost:5173',             // Your local development (Vite default)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true // Crucial if you plan to use cookies or sessions later
}));
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://post-chain-beast-buildings.trycloudflare.com"
//     ],
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials: true,
//   }),
// );
app.use('/uploads', express.static('public/uploads'));

app.use("/api/auth", authRoute);
app.use("/api/activity", activityRoute);
app.use("/api/friend", friendRoute);
app.use('/api/account', accountRoute)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/join', joinRouter)
app.use("/api/chat", chatRoute);
app.use("/api/interest", interestRoute);

const io = initSocket(server);
app.set("io", io);

//Path แยก
app.use('/api/review', reviewRouter)
app.use('/api/noti', notiRoute)


activityStatusUpdater()

app.use(errorMiddleware)

export default server;
