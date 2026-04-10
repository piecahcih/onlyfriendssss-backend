import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import activityRoute from "./routes/activity.route.js";
import accountRoute from "./routes/account.route.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use('/api/auth', authRoute)
app.use('/api/activity', activityRoute)
app.use('/api/account', accountRoute)
app.use("/api/friends", (req, res) => {
  res.json("friendskub");
});

export default app;
