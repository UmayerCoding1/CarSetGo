import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/carSetGo`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connect successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;