import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usePublicApi from "../../hooks/usePublicApi";
import ImageSlider from "../../components/ui/image-slider/ImageSlider";
import CarBookingForm from "../../components/ui/CarBookingForm";
import CarBuyngForm from "../../components/ui/CarBuyngForm";
import useAuth from "../../hooks/useAuth";
import { motion } from "motion/react";
import {
  Heart,
  Car,
  Calendar,
  DollarSign,
  Users,
  Fuel,
  Gauge,
  Settings,
  Palette,
  Tag,
  User,
  Shield,
  Edit,
  Star,
  Send,
} from "lucide-react";
import Policy from "../../components/ui/car-details/Policy";
import ChatInterface from "../../components/ui/ChatInterface";
import { toast } from "sonner";
import CarInformation from "../../components/ui/car-details/CarInformation";
import Savecar from "../../components/ui/car-details/Savecar";
import {callPostApis} from "../../api/api";
const CarDetails = () => {
  const { id } = useParams();
  const publicApi = usePublicApi();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const MotionLink = motion(Link);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      const res = await publicApi.get(`/car/${id}`);
      return res.data.data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 10,
    enabled: !!id,
  });



  // Add review mutation
  const addReviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      const res = await callPostApis(`/reviews/${car._id}`, reviewData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["car", id]);
      setRating(0);
      setReview("");
      toast.success("Review submitted successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to submit review");
    },
  });

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
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading car details</div>;
  if (!car) {
    console.log("no car found");
    return <div>No car found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="lg:flex gap-5">
        <div className="lg:w-[60%] h-[500px] shadow-md p-2">
          <ImageSlider images={car.images} height={'400px'}/>
        </div>

        <div className="lg:w-[40%]">
          {car.postType === "booking" && (
            <div className="mt-8">
              <CarBookingForm
                carId={car._id}
                userId={user?._id}
                sellerId={car.seller._id}
                price={car.price}
              />
            </div>
          )}
          {car.postType === "selling" && (
            <CarBuyngForm
              carId={car._id}
              userId={user?._id}
              sellerId={car.seller._id}
              price={car.price}
              status={car.status}
            />
          )}

          <Savecar carId={car._id} userId={user?._id} />
        </div>
      </div>

      <div className="lg:flex gap-5 mt-2">
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 lg:w-1/2">
          <div
            className={`flex ${
              car?.seller._id === user?._id
                ? "flex-row justify-between"
                : "flex-col"
            } gap-2 bg-white shadow-md p-6 rounded-md mb-10 mt-0 border border-gray-200`}
          >
            <div className="flex items-center gap-2">
              {car.seller.avatar ? (
                <img
                  src={car.seller.avatar}
                  alt="seler-img"
                  loading="lazy"
                  className="w-14 h-14 rounded-full"
                />
              ) : (
                <User size={30} className="bg-gray-200 p-1 rounded-full" />
              )}

              <div>
                <h2 className="font-medium text-lg">{car.seller.fullname}</h2>
                <p className="text-sm text-gray-600">{car.seller.username}</p>
                <button className="flex items-center gap-1 text-sm ">
                  <Shield size={15} />{" "}
                  {car.seller.paymentstatus === "pending" &&
                    "Seller is not verified"}{" "}
                  {car.seller.paymentstatus === "completed" && "Premium Seller"}
                </button>
              </div>
            </div>

            {car?.seller._id === user?._id && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-1 text-sm font-medium cursor-pointer"
              >
                <Edit size={15} /> Edit post
              </motion.button>
            )}

            {car?.seller._id !== user?._id && car.status === "available" && (
              <div className="flex flex-col gap-3 mt-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (user) {
                      setIsChatOpen(true);
                    } else {
                      toast.error("Please login fast", { duration: 1000 });
                    }
                  }}
                  className="text-sm bg-black text-white p-2 rounded-lg font-medium w-full text-center cursor-pointer"
                >
                  Contact Seller
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="text-sm border border-gray-300 p-2 rounded-lg font-medium w-full text-center cursor-pointer"
                >
                  Schedule Test Drive
                </motion.button>
              </div>
            )}
          </div>

          <CarInformation car={car} />
        </div>

        <Policy postType={car.postType} paymentSystem={car.paymentSystem} />
      </div>

      {/* Reviews Section */}
      <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 lg:flex  gap-5">
       <div className="w-full lg:w-1/2">
         <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Reviews & Ratings</h2>
            <p className="text-gray-600 mt-2">Share your experience with this car</p>
          </div>
          {car.reviews && car.reviews.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">
                  {(car.reviews.reduce((acc, review) => acc + review.rating, 0) / car.reviews.length).toFixed(1)}
                </div>
                <div className="flex items-center justify-center mt-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      
                      className={`w-5 h-5 ${
                        index < Math.round(car.reviews.reduce((acc, review) => acc + review.rating, 0) / car.reviews.length)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-1">{car.reviews.length} reviews</p>
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
                  {rating === 0 ? "Select a rating" : 
                   rating === 1 ? "Poor" :
                   rating === 2 ? "Fair" :
                   rating === 3 ? "Good" :
                   rating === 4 ? "Very Good" : "Excellent"}
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
        <div className="space-y-8 w-full lg:w-1/2">
          {car.reviews && car.reviews.length > 0 ? (
            car.reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {review.user.avatar ? (
                      <img
                        src={review.user.avatar}
                        alt={review.user.fullname}
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
                        <h4 className="font-semibold text-gray-900">{review.user.fullname}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
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
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    {review.images && review.images.length > 0 && (
                      <div className="mt-4 flex gap-2">
                        {review.images.map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt={`Review image ${idx + 1}`}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    )}
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
              <p className="text-gray-400 mt-2">Be the first to share your experience!</p>
            </motion.div>
          )}
        </div>
      </div>

      <ChatInterface
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        sellerName={car?.seller.fullname}
        sellerAvatar={car?.seller.avatar}
        sellerId={car?.seller._id}
        userId={user?._id}
        status={car.status}
      />
    </div>
  );
};

export default CarDetails;
