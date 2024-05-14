import multer from "multer";
import { uploadImageOnCloudinary } from "../helpers/cloudinaryHelper.js";

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/"); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });
