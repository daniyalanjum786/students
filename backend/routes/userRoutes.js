import express from "express";
import { registerController } from "../controllers/userControllers.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = express.Router();

//localhost:8000/api/v1/user/register

router.post("/register", upload.single("picture"), registerController);

export default router;
