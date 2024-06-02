import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
// Create a new category
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Name is required" });
    }
    // Checking if category already present in the database or not
    const isExist = await categoryModel.findOne({ name });
    if (isExist) {
      return res
        .status(400)
        .send({ success: false, message: "Category already exist" });
    }

    const category = await categoryModel.create({ name });
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(`createCategoryController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in createCategoryController",
      error,
    });
  }
};

// Get all categories
const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find().sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.log(`getAllCategoriesController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in getAllCategoriesController",
      error,
    });
  }
};

// Get a single category by slug
const getSingleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    if (!category) {
      return res
        .status(404)
        .send({ success: false, message: "Category not found" });
    }
    res.status(200).send({
      success: true,
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    console.log(`getSingleCategoryController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in getSingleCategoryController",
      error,
    });
  }
};

// Update a category
const updateCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Name is required" });
    }

    const category = await categoryModel.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name, { lower: true, strict: true }) },
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .send({ success: false, message: "Category not found" });
    }
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(`updateCategoryController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in updateCategoryController",
      error,
    });
  }
};

// Delete a category
const deleteCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOneAndDelete({ slug });
    if (!category) {
      return res
        .status(404)
        .send({ success: false, message: "Category not found" });
    }
    res
      .status(200)
      .send({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.log(`deleteCategoryController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in deleteCategoryController",
      error,
    });
  }
};

export {
  createCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
