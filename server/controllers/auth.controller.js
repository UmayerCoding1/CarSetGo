import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { uploadCloudinary } from "../services/cloudinary.service.js";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  const { fullname, email, username, password, role } = req.body;
  if (!fullname || !email || !username || !password || !role)
    return res
      .status(400)
      .json({ message: "All field is required", success: false });

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      const message =
        existingUser.email === email
          ? "Email already exists"
          : "Username already exists";
      return res.status(400).json({ message, success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword)
      return res
        .status(500)
        .json({ message: "Internal server error", success: false });

    const user = await User.create({
      fullname,
      email,
      username,
      password: hashedPassword,
      role,
    });

    return res
      .status(201)
      .json({ message: "User create successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const userLogin = async (req, res) => {
 
  const { emailOrUserName, password } = req.body;
  if (!emailOrUserName || !password)
    return res
      .status(404)
      .json({ message: "All field is required", success: false });

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUserName }, { username: emailOrUserName }],
    }).select(" -createdAt -updatedAt");

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    user.password = undefined;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECTET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    if (!token)
      return res.status(500).json({
        message: "Token generation failed. Please try again later.",
        success: false,
      });
    const option = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    };
    return res
      .cookie("token", token, option)
      .status(200)
      .json({ message: "Welcome to CarSetGo", user, token, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const uploadAvatar = async (req, res) => {
  const avatarImgPath = req.file?.path;

  if (!avatarImgPath)
    return res
      .status(404)
      .json({ message: "Avatar image is missing", success: true });

  try {
    const avatar = await uploadCloudinary(avatarImgPath);
    if (!avatar)
      return res.status(500).json({
        message: "Avater image upload feaild try again",
        success: false,
      });

    const user = await User.findByIdAndUpdate(req?.userId, {
      avatar: avatar.url,
    }).select("-password -createdAt -updatedAt");

    return res
      .status(201)
      .json({ message: "Avatar upload successfully", user, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const logout = async (req, res) => {
  return res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "User logout successfully", success: true });
};

export const logdinUser = async (req,res) => {
   
   const user = await User.findOne({_id: req.userId}).select("-password -createdAt -updatedAt");
   if(!user){
   return res.status(400).json({message: 'User not found', success: false});
   }

   return res.status(200).json({user})
   
}
