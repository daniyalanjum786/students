import express from "express";
import { createProductController } from "../controllers/productController.js";
import { isAuthorized, isAdmin } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";
const productRouter = express.Router();

productRouter.post(
  "/",
  isAuthorized,
  isAdmin,
  upload.single("picture"),
  createProductController
);

export default productRouter;
