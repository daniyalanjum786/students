import {
  deleteImageOnCloudinary,
  uploadImageOnCloudinary,
} from "../helpers/cloudinaryHelper.js";
import productModel from "../models/productModel.js";

// Controller to create products
const createProductController = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const picture = req.file?.fieldname;
    const picturePath = req.file?.path;

    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !picture ||
      !picturePath
    ) {
      return res
        .status(400)
        .send({ success: false, message: "Please fill all the fields" });
    }
    const { secure_url, public_id } = await uploadImageOnCloudinary(
      picturePath,
      "products"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error uploading image",
        error: secure_url,
      });
    }

    const product = await productModel.create({
      title,
      description,
      category,
      price,
      user: req.user._id,
      picture: {
        picture_url: secure_url,
        public_id: public_id,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log(`createProductController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in createProductController",
      error,
    });
  }
};
// Controller to update products
const updateProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, description, category, price } = req.body;
    const picturePath = req.file?.path;

    // Find the product by ID
    const product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    // Update fields if provided
    if (title) product.title = title;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price) product.price = price;

    // Handle image upload if a new image is provided
    if (picturePath) {
      // Upload new image to Cloudinary
      const { secure_url, public_id } = await uploadImageOnCloudinary(
        picturePath,
        "products"
      );

      // Delete old image from Cloudinary
      if (product.picture && product.picture.public_id) {
        await deleteImageOnCloudinary(product.picture.public_id);
      }

      // Update product's picture information
      product.picture = {
        picture_url: secure_url,
        public_id: public_id,
      };
    }

    // Save updated product to the database
    await product.save();

    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(`updateProductController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in updateProductController",
      error,
    });
  }
};
// Controller to delete products
const deleteProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the product by ID
    const product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    // Delete the product's image from Cloudinary
    if (product.picture && product.picture.public_id) {
      await deleteImageOnCloudinary(product.picture.public_id);
    }

    // Delete the product from the database
    await productModel.findByIdAndDelete(productId);

    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(`deleteProductController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in deleteProductController",
      error,
    });
  }
};
// Controller to get all products
const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel.find().populate("user", "name email"); // Adjust the populate fields as needed
    return res.status(200).send({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(`getAllProductsController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in getAllProductsController",
      error,
    });
  }
};
// Controller to get a single product by ID
const getSingleProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the product by ID and populate the user field
    const product = await productModel
      .findById(productId)
      .populate("user", "name email");

    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(`getSingleProductController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in getSingleProductController",
      error,
    });
  }
};

export {
  createProductController,
  updateProductController,
  deleteProductController,
  getAllProductsController,
  getSingleProductController,
};
