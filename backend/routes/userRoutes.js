import express from "express";
import { registerController } from "../controllers/userControllers.js";

const router = express.Router();

//localhost:8000/api/v1/user/register

router.post("/register", registerController);

export default router;
