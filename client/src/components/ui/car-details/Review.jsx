import React, { useState } from "react";
import { motion } from "motion/react";
import { EllipsisVertical, Pencil, Send, Star, Trash, User } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { callGetApis, callPostApis } from "../../../api/api";
import { toast } from "sonner";
import { useEffect } from "react";
const Review = ({ car, user, paramsID }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const queryClient = useQueryClient();
  const [isOpenReviewConfirm, setIsOpenReviewConfirm] = useState(false);
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await callGetApis(`/reviews/car/${car._id}`);
      return response.reviews;
    },

    enabled: !!car?._id,
  });

  console.log(reviews);

  // Add review mutation
  const addReviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      const res = await callPostApis(`/reviews/${car._id}`, reviewData);
      console.log(res);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["car", paramsID]);
      setRating(0);
      setReview("");
      toast.success("Review submitted successfully!", { duration: 1000 });
    },
    onError: (error) => {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to submit review", {
        duration: 1000,
      });
    },
  });

  // submit review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to submit a review");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    addReviewMutation.mutate({
      rating,
      comment: review,
      sellerId: car.seller._id,
    });
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 lg:flex  gap-5">
      <div className="w-full lg:w-1/2">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Reviews & Ratings
            </h2>
            <p className="text-gray-600 mt-2">
              Share your experience with this car
            </p>
          </div>
          {reviews && reviews.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">
                  {(
                    reviews.reduce((acc, review) => acc + review.rating, 0) /
                    reviews.length
                  ).toFixed(1)}
                </div>
                <div className="flex items-center justify-center mt-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        index <
                        Math.round(
                          reviews.reduce(
                            (acc, review) => acc + review.rating,
                            0
                          ) / reviews.length
                        )
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {reviews.length} reviews
                </p>
              </div>
            </div>
          )}
        </div>

        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-blue-600" />
              Write Your Review
            </h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How would you rate this car?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="focus:outline-none transform transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= (hoveredRating || rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {rating === 0
                    ? "Select a rating"
                    : rating === 1
                    ? "Poor"
                    : rating === 2
                    ? "Fair"
                    : rating === 3
                    ? "Good"
                    : rating === 4
                    ? "Very Good"
                    : "Excellent"}
                </p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Share your experience
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  rows="4"
                  placeholder="Tell us about your experience with this car. What did you like or dislike? Would you recommend it to others?"
                />
                <p className="text-sm text-gray-500 mt-2">
                  {review.length}/500 characters
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={addReviewMutation.isLoading}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg shadow-blue-500/20"
              >
                <Send className="w-5 h-5" />
                {addReviewMutation.isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </span>
                ) : (
                  "Submit Review"
                )}
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-8 w-full lg:w-1/2  max-h-[500px] overflow-y-scroll scrollbar-hide">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {review.userId?.avatar ? (
                    <img
                      src={review.userId?.avatar}
                      alt={review.userId?.fullname}
                      className="w-14 h-14 rounded-full border-2 border-blue-100"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-100 flex items-center justify-center">
                      <User className="w-7 h-7 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review.userId?.fullname}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <div className="flex items-center ap-2">
                      <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`w-4 h-4 ${
                              index < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                   {user._id === review.userId._id && 
                      <div className="relative">
                        <EllipsisVertical size={20} onClick={() => setIsOpenReviewConfirm(!isOpenReviewConfirm)}  className="cursor-pointer"/>


                       {isOpenReviewConfirm && 
                        <div className="absolute bg-white shadow-md w-40 rounded-lg p-2 top-8 right-0 ">
                            <span onClick={() => setIsOpenReviewConfirm(false)} className="flex items-center gap-2 hover:bg-gray-200 py-2 px-3 rounded-lg cursor-pointer">
                                <Pencil size={15} className=""/>
                                <span>Edit</span>
                            </span>

                            <span onClick={() => setIsOpenReviewConfirm(false)} className="flex items-center gap-2 hover:bg-red-200 py-2 px-3 rounded-lg cursor-pointer">
                                <Trash size={15} className=""/>
                                <span>Delete</span>
                            </span>
                        </div>
}
                      </div>
}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gray-50 rounded-xl"
          >
            <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No reviews yet</p>
            <p className="text-gray-400 mt-2">
              Be the first to share your experience!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Review;
