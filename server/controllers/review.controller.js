import { Review } from "../models/review.model.js";

export const createReview = async (req, res) => {
  const { comment, sellerId } = req.body;
  const { carId } = req.params;
  const userId = req.userId;



  if (!carId || !comment) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  const rating = req.body.rating || 1;

  try {
    const review = await Review.create({
      carId,
      userId,
      sellerId,
      comment,
      rating,
    });

    res
      .status(200)
      .json({ message: "Review created successfully", success: true, review });
  } catch (error) {
      res.status(500).json({ message: "Internal server error", success: false });
    throw new Error(error.message);
  }
};

export const getReviews = async (req, res) => {
  const { carId } = req.params;
  try {
    const reviews = await Review.find({ carId }).populate("userId", "fullname avatar").select("-__v -carId -sellerId -updatedAt");
    res
      .status(200)
      .json({
        message: "Reviews fetched successfully",
        success: true,
        reviews,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};


export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Review deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
}