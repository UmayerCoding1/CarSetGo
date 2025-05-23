import { User } from "../models/user.model.js";

const verifySeller = async(req,res,next) => {
    try {
        const userId = req.userId;
        const user = await User.findById({_id: userId});
        if(!user || user.role !== 'seller'){
            return res.status(403).json({message: 'Access denied. Sellers only.'});
        }

        req.sellerId = userId
        next();
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error: error.message});
    }
}

export default verifySeller;