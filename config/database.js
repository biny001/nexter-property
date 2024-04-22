import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  //If the database is already connected dont connect again
  if (connected) {
    console.log("Database already connected");
    return;
  }

  //connect to the database

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("Mongodb connected....");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
