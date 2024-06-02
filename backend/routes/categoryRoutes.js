import express from "express";
import { isAuthorized, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
const categoryRouter = express.Router();

// POST /api/categories - Create a new category
// GET /api/categories - Retrieve all categories
// GET /api/categories/:slug - Retrieve a specific category by ID
// PUT /api/categories/:slug - Update a specific category by ID
// DELETE /api/categories/:slug - Delete a specific category by ID

// For Admin - Admin Dashboard
categoryRouter.post("/", isAuthorized, isAdmin, createCategoryController);
categoryRouter.put("/:slug", isAuthorized, isAdmin, updateCategoryController);
categoryRouter.delete(
  "/:slug",
  isAuthorized,
  isAdmin,
  deleteCategoryController
);
categoryRouter.get(
  "/:slug",
  isAuthorized,
  isAdmin,
  getSingleCategoryController
);

// For User - Frontend
categoryRouter.get("/", getAllCategoriesController);

export default categoryRouter;
