import express from "express";
import cors from "cors";
import authRouter from './routes/auth.route.js'

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use('/api/auth', authRouter)

export default app;
