import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (uri) {
      await mongoose.connect(uri);
      const connection = mongoose.connection;

      connection.on("connected", () => {
        console.log("MongoDB Connected");
      });

      connection.on("error", (error) => {
        console.log("MongoDB Connection Error");
        console.log(error);
        process.exit(1);
      });

      console.log("Connected to database");
    } else {
      throw new Error("Please add your MongoDB URI to .env");
    }
  } catch (error) {
    console.log("Error connecting to database");
    console.log(error);
  }
};

export default connectDatabase;
