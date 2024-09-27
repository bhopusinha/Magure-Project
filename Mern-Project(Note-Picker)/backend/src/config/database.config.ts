import env from "./environment.config";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongo = await mongoose.connect(env.db ?? " ");
    console.log(`the database is connecting with ${mongo.connection.host}`);
  } catch (error) {
    console.log(`ERROR`, error);
  }
};

export default connectDB;
