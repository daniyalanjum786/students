import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(`Connect to MongoDB ${con.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDB - ${error}`);
  }
};

export default connectDB;
