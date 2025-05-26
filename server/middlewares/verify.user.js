import jwt, { decode } from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  const token = req.cookies?.token ;
  
  
  
  if (!token)
    return res
      .status(401)
      .json({ message: "unauthorized access", success: false });

  jwt.verify(token, process.env.JWT_SECTET, (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "unauthorized access" });
    }

    req.userId = decode._id;
    next();
  });
};

export default verifyUser;
