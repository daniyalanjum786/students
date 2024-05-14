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
const uploadImageOnCloudinary = async (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
      fs.unlinkSync(filePath);
    });
  });
};
export { uploadImageOnCloudinary };
