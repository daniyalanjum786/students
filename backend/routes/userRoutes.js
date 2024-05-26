import express from "express";
import {
  getAllUsersController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/userControllers.js";
import { upload } from "../middlewares/multerMiddleware.js";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

//localhost:8000/api/v1/user/register

// router.post("/register", upload.single("picture"), registerController);
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);

// Admin Routes - All Users
router.get("/", isAuthorized, isAdmin, getAllUsersController);

export default router;
