import userModel from "../models/userModel.js";
import { passwordEncrypt } from "../helpers/userHelper.js";

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const picture = req.file?.fieldname;
    const picturePath = req.file?.path;
    console.log(picture, picturePath);

    if (!name || !email || !password || !picture) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    // Checking if user email already present in the database or not
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const encryptedPassword = await passwordEncrypt(password);
    const user = await userModel.create({
      name,
      email,
      password: encryptedPassword,
    });

    if (user) {
      return res
        .status(201)
        .send({ success: true, message: "User registration successful", user });
    }
  } catch (error) {
    console.log(`registerController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in registerController",
      error,
    });
  }
};

export { registerController };
