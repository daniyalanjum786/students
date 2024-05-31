import express from "express";
import {
  createProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAuthorized, isAdmin } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";
const productRouter = express.Router();

// POST /api/products - Create a new product
// GET /api/products - Retrieve all products
// GET /api/products/:productId - Retrieve a specific product by ID
// PUT /api/products/:productId - Update a specific product by ID
// DELETE /api/products/:productId - Delete a specific product by ID

productRouter.post(
  "/",
  isAuthorized,
  isAdmin,
  upload.single("picture"),
  createProductController
);
productRouter.put(
  "/:productId",
  isAuthorized,
  isAdmin,
  upload.single("picture"),
  updateProductController
);

export default productRouter;
