import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(`mongodb://localhost:27017/shopwave`);
    console.log(`Connect to MongoDB ${con.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDB - ${error}`);
  }
};

export default connectDB;
