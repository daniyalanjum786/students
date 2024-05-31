import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: "dcb9xjx3h",
  api_key: "415716228424229",
  api_secret: "voi1QZWoSek2oaLD2DW3XsSQI-s",
});

// Function to upload image to Cloudinary
const uploadImageOnCloudinary = async (filePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
    });
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error("Failed to delete local file:", err);
    }
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export { uploadImageOnCloudinary };
