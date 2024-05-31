import { uploadImageOnCloudinary } from "../helpers/cloudinaryHelper.js";
import productModel from "../models/productModel.js";

const createProductController = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const picture = req.file?.fieldname;
    const picturePath = req.file?.path;
    console.log(picture);

    if (!title || !description || !category || !price || !picture) {
      return res
        .status(400)
        .send({ success: false, message: "Please fill all the fields" });
    }
    const imageUploadResult = await uploadImageOnCloudinary(
      picturePath,
      "products"
    );

    if (!imageUploadResult) {
      return res.status(400).send({
        success: false,
        message: "Error uploading image",
        error: imageUploadResult,
      });
    }

    const product = await productModel.create({
      title,
      description,
      category,
      price,
      user: req.user._id,
      picture: {
        picture_url: imageUploadResult.url,
        public_id: imageUploadResult.public_id,
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

export { createProductController };
