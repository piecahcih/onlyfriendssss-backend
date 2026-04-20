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

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
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
app.use('/api', joinRouter)

activityStatusUpdater()

app.use(errorMiddleware)

export default app;
