import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
// Database connection
connectDB();

const app = express();

// to get data from req.body
app.use(express.json());
// to check from which url req is coming
app.use(morgan("dev"));

// import routes
import userRoutes from "./routes/userRoutes.js";

//http://localhost:8000 => Site URL
//http://localhost:8000/api/v1/user
app.use("/api/v1/users", userRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is Running at PORT ${PORT}`.bgMagenta);
});
