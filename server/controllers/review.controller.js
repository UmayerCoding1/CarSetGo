import { Review } from "../models/review.model.js";

export const createReview = async (req, res) => {
    const {comment} = req.body;
    const {carId} = req.params;
    const userId = req.userId;

    if(!carId || !comment){
        return res.status(400).json({message:"All fields are required",success:false});
    }

    const rating = req.body.rating || 1;

    try {

        const review = await Review.create({carId,userId,comment,rating});

        console.log(review);
        
        res.status(200).json({message:"Review created successfully",success:true,review});
    } catch (error) {
        res.status(500).json({message:"Internal server error",success:false});
    }
};


export const getReviews = async (req, res) => {
    const {carId} = req.params;
    try {
        const reviews = await Review.find({carId}).populate("userId");
        res.status(200).json({message:"Reviews fetched successfully",success:true,reviews});
    } catch (error) {
        res.status(500).json({message:"Internal server error",success:false});
    }
}