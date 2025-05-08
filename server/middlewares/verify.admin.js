import { User } from "../models/user.model.js";

const verifyAdmin = async (req, res, next) => {
  const userId = req.userId;
    try {
     const user = await User.findById({_id: userId});
     if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
     }
  
      // If the user is an admin, proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  
  export default verifyAdmin;