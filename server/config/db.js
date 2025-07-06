import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/carSetGo`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default connectDb;
