import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
// Database connection
connectDB();

const app = express();

// to get data from req.body
app.use(express.json());
// to check from which url req is coming
app.use(morgan("dev"));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());

// import routes
import userRoutes from "./routes/userRoutes.js";

app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running at PORT ${PORT}`.bgMagenta);
});
