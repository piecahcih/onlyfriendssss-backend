import express from "express";
import cors from "cors";
import activityRoute from "./routes/activity.route";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use('/api/activity',activityRoute)

export default app;
