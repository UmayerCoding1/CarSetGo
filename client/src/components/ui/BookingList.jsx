import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { callDeleteApis, callPostApis } from "../../api/api";
const BookingList = ({ carinfo, sellerinfo, bookinginfo, refetch}) => {
  const paymentCanceled = Boolean(new URLSearchParams(window.location.search).get("canceled"));
  const paymentSuccess = new URLSearchParams(window.location.search).get("success");
  const tranId = new URLSearchParams(window.location.search).get("session_id");
  
  
  const handleCancelBooking = async () => {
    try {
      const response = await callDeleteApis(`/delete-booking/${bookinginfo._id}`);
      if(response.data.success){
        toast.success(response.data.message);
        refetch();
      }
    } catch (error) {
      throw new Error(error);
    }
  };


  const handleCarBookingPayment = async () => {
    try {
      const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      const response = await callPostApis("/payment/create-car-booking-payment", {
        bookingId: bookinginfo._id,
        sellerId:carinfo.seller,
        amount: bookinginfo.totalPrice,
        currency: "usd",
      });
      
      if(!response.success){
        toast.error(response.message);
        return;
      }

      const stripe = await stripePromise;
     const result = await stripe.redirectToCheckout({sessionId: response.sessionId});
     
     if(result.error){
      toast.error(result.error.message);
     }
    } catch (error) {
      console.log(error);
      
      throw new Error(error);
    }
  }

  const handlePaymentSuccess = async () => {
    
    try {
      const response = await callPostApis(`/payment/payment-success`,{sessionId: tranId})
      if (response.success) {
        toast.success(response.message);
        window.location.href = `/my-booking`;
      }
    } catch (error) {
      throw new Error(error);
    }
 }

   useEffect(() => {
    if(paymentCanceled){
      //
    }
    if(paymentSuccess){
      handlePaymentSuccess();
    }
  }, [paymentCanceled, paymentSuccess]);
  return (
    <div className="mb-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Car Image and Basic Info */}
            <div className="flex flex-col md:flex-row gap-6 flex-1">
              <div className="relative">
                <img
                  src={carinfo?.images[0]}
                  alt={carinfo.name}
                  className="w-full md:w-72 h-48 object-cover rounded-lg shadow-md"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
                  {carinfo.category}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  {carinfo.make} {carinfo.model}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-gray-600">
                    Year: <span className="font-medium">{carinfo.year}</span>
                  </p>
                  <p className="text-gray-600">
                    Price: <span className="font-medium">${carinfo.price}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Seller Information
                  </h4>
                  <p className="text-gray-600">{sellerinfo.fullname}</p>
                  <p className="text-gray-600">{sellerinfo.email}</p>
                  <p
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      sellerinfo.paymentstatus !== "pending"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {sellerinfo.paymentstatus !== "pending"
                      ? "Verified Seller"
                      : "Not Verified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="lg:w-1/3 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">
                Booking Details
              </h4>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`font-medium ${
                      bookinginfo.status === "pending"
                        ? "text-yellow-600"
                        : bookinginfo.status === "completed"
                        ? "text-green-600"
                        : bookinginfo.status === "processing"
                        ? "text-blue-500"
                        : bookinginfo.status === "Confirmed" 
                        ? "text-blue-500"
                        : "text-red-600"
                    }`}
                  >
                    {bookinginfo.status.charAt(0).toUpperCase() +
                      bookinginfo.status.slice(1)}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <span
                    className={`font-medium ${
                      bookinginfo.paymentStatus === "pending"
                        ? "text-yellow-600"
                        : bookinginfo.paymentStatus === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {bookinginfo.paymentStatus.charAt(0).toUpperCase() +
                      bookinginfo.paymentStatus.slice(1)}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Start:</span>
                  <span className="font-medium">
                    {bookinginfo.bookingStartDate.split("T")[0]}{" "}
                    {new Date(
                      bookinginfo.bookingStartDate
                    ).toLocaleTimeString()}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">End:</span>
                  <span className="font-medium">
                    {bookinginfo.bookingEndDate.split("T")[0]}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">
                    {bookinginfo.duration} {bookinginfo.durationType}
                  </span>
                </p>
                <p className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="font-bold text-lg">
                    ${bookinginfo.totalPrice}
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 lg:w-48">
              <Link
                to={`/future-cars/${carinfo._id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center font-medium transition-colors duration-200 cursor-pointer"
              >
                View Details
              </Link>

              {bookinginfo.status === "confirmed" && bookinginfo.paymentStatus !== "success" && (
                <div
                  onClick={handleCarBookingPayment}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center font-medium transition-colors duration-200 cursor-pointer"
                >
                  Payment
                </div>
              )}

              {bookinginfo.status === 'pending' && <button
                onClick={handleCancelBooking}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
              >
                Cancel Booking
              </button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
