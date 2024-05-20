import userModel from "../models/userModel.js";
import { passwordEncrypt, passwordCompare } from "../helpers/userHelper.js";
import { uploadImageOnCloudinary } from "../helpers/cloudinaryHelper.js";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // const picture = req.file?.fieldname;
    // const picturePath = req.file?.path;
    // console.log(picture);

    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Please fill all the fields" });
    }
    // Checking if user email already present in the database or not
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const encryptedPassword = await passwordEncrypt(password);

    // const imageUploadResult = await uploadImageOnCloudinary(picturePath)
    //   .then((result) => {
    //     return result;
    //   })
    //   .catch((error) => {
    //     console.error("Error uploading image:", error);
    //     return error;
    //   });

    // if (!imageUploadResult) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Error uploading image",
    //     imageUploadResult,
    //   });
    // }

    const user = await userModel.create({
      name,
      email,
      password: encryptedPassword,
      // picture: {
      //   picture_url: imageUploadResult.url,
      //   public_id: imageUploadResult.public_id,
      // },
    });

    return res
      .status(201)
      .send({ success: true, message: "User registration successful", user });
  } catch (error) {
    console.log(`registerController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in registerController",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Please fill all the fields" });
    }
    // check existing user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "Email does not exists" });
    }
    // matching password
    const matchPassword = await passwordCompare(password, user.password);
    if (!matchPassword) {
      return res
        .status(401)
        .send({ success: false, message: "Incorrect Email/Password" });
    }
    // assigning token to a user
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });
    const tokenOptions = {
      httpOnly: true,
      secure: true,
    };
    user.password = undefined;
    // Set token in cookies
    return res.cookie("token", token, tokenOptions).status(200).send({
      success: true,
      message: "Login Successful",
      user,
      token: token,
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

export { registerController, loginController };
