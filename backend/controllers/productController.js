import { uploadImageOnCloudinary } from "../helpers/cloudinaryHelper.js";
import productModel from "../models/productModel.js";

const createProductController = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const picture = req.file?.fieldname;
    const picturePath = req.file?.path;
    console.log(picture);

    if (!name || !description || !category || !price || !picture) {
      return res
        .status(400)
        .send({ success: false, message: "Please fill all the fields" });
    }
    const imageUploadResult = await uploadImageOnCloudinary(picturePath)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        return error;
      });

    if (!imageUploadResult) {
      return res.status(400).send({
        success: false,
        message: "Error uploading image",
        imageUploadResult,
      });
    }

    const product = await productModel.create({
      name,
      description,
      category,
      price,
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
    console.log(`registerController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in registerController",
      error,
    });
  }
};

export { createProductController };
