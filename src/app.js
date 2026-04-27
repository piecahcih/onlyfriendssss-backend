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
import placeRoute from "./routes/place.route.js";

const app = express();
const server = createServer(app)
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://post-chain-beast-buildings.trycloudflare.com"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use('/uploads', express.static('public/uploads'));

app.use("/api/auth", authRoute);
app.use("/api/activity", activityRoute);
app.use("/api/friend", friendRoute);
app.use('/api/account', accountRoute)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/join', joinRouter)
app.use("/api/chat", chatRoute);
app.use("/api/interest", interestRoute);
app.use('/api/review', reviewRouter)
app.use('/api/place', placeRoute)
app.use('/api/noti', notiRoute)


initSocket(server) //Path แยก
const io = initSocket(server);
app.set("io", io);


activityStatusUpdater()

app.use(errorMiddleware)

export default server;
