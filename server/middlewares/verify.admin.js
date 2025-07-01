import { User } from "../models/user.model.js";

const verifyAdmin = async (req, res, next) => {
  const userId = req.userId;
  
  
    try {
     const user = await User.findById( userId);
     if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
     }

  
      req.isAdmin = true
      next();
    } catch (error) {
      console.log(error.messager);
      
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  
  export default verifyAdmin;