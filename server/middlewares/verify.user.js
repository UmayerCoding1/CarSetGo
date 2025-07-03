import jwt, { decode } from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyUser = async (req, res, next) => {
  const token = req.cookies?.token ;
  
  
  
  if (!token)
    return res
      .status(401)
      .json({ message: "unauthorized access", success: false });

  jwt.verify(token, process.env.JWT_SECTET, async (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "unauthorized access" });
    }

    const user = await User.findById(decode._id);
    

    if(user.role === 'blacklisted'){
      return res.status(400).json({ message: "You are blacklisted", success: false });
    }
    


    req.userId = decode._id;
    next();
  });
};

export default verifyUser;
