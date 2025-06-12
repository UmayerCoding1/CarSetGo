import { EllipsisVertical, Pencil, Send, Star, Trash, User } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import { callDeleteApis, callPutApis } from "../../../api/api";
import { toast } from "sonner";

const ReviewCard = ({ review, index, user, reviewsRefetch }) => {
  const [isOpenReviewConfirm, setIsOpenReviewConfirm] = useState(false);
  const [isActiveReviewEdit, setIsActiveReviewEdit] = useState(false);
  const [updatedReview, setUpdatedReview] = useState(review.comment);


  const handleUpdateReview = async (e) => {
    e.preventDefault()
    const res = await callPutApis(`/reviews/${review._id}`, { comment: updatedReview });
    if (res.success) {
      toast.success(res.message, { duration: 500 });
      setIsActiveReviewEdit(false);
      reviewsRefetch();
    }
  };



  const handleDeleteReview = async (reviewId) => {
    const res = await callDeleteApis(`/reviews/${reviewId}`);
    if (res.success) {
      toast.success(res.message, { duration: 500 });
      setIsOpenReviewConfirm(false);
      reviewsRefetch();
    }
  };
  return (
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
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
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

              {user._id === review.userId._id && (
                <div className="relative">
                  <EllipsisVertical
                    size={20}
                    onClick={() => setIsOpenReviewConfirm(!isOpenReviewConfirm)}
                    className="cursor-pointer"
                  />

                  {isOpenReviewConfirm && (
                    <div className="absolute bg-white shadow-md w-40 rounded-lg p-2 top-8 right-0 ">
                      <span
                        onClick={() => {
                            setIsOpenReviewConfirm(false);
                            setIsActiveReviewEdit(true);
                        }}
                        className="flex items-center gap-2 hover:bg-gray-200 py-2 px-3 rounded-lg cursor-pointer"
                      >
                        <Pencil size={15} className="" />
                        <span>Edit</span>
                      </span>

                      <span
                        onClick={() => handleDeleteReview(review._id)}
                        className="flex items-center gap-2 hover:bg-red-200 py-2 px-3 rounded-lg cursor-pointer"
                      >
                        <Trash size={15} className="" />
                        <span>Delete</span>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {isActiveReviewEdit ? (
            <div>
               <form onSubmit={handleUpdateReview} className="flex items-center justify-between gap-2 border border-gray-500 rounded-lg p-2">
                 <input onChange={(e) => setUpdatedReview(e.target.value)} type="text" className="outline-none flex-1" defaultValue={updatedReview}/>
                 <button>
                    <Send size={14} className="text-blue-600"/>
                 </button>
               </form>
            </div>
          ) : (
            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
