import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/todoCompleteApp")
    .then(() => {
      console.log("Db connection Done");
    })
    .catch(() => {
      console.log("Db connection Failed");
    });
};

export default connectDB;
