import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import useSecureApi from "../../hooks/useSecureApi";
import { toast } from "sonner";
const MyCarList = ({ dealershipInfo, index }) => {
  const secureApi = useSecureApi();
  const paymentSuccess = new URLSearchParams(window.location.search).get('success');
  const paymentCanceled = new URLSearchParams(window.location.search).get('canceled');
  const tranId = new URLSearchParams(window.location.search).get('session_id');
  console.log(dealershipInfo._id);
  
  const handleCarBuyPayment = async() => {
   try {
     const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
     const response = await secureApi.post('/payment/create-car-buy-payment', {
        carId: dealershipInfo?.carId._id,
        amount: dealershipInfo?.carId?.price,
        currency: "usd",
        dealershipId: dealershipInfo._id
     })
     
     if(!response.data.success){
       toast.error(response.data.message);
       return;
     }
 
     const stripe = await stripePromise;
     const result = await stripe.redirectToCheckout({sessionId: response.data.sessionId});
 
     if(result.error){
       toast.error(result.error.message);
     }
 
   } catch (error) {
    console.log(error);
   }
    
  };

  const handlePaymentSuccess = async() => {
    try {
      const response = await secureApi.post('/payment/payment-success', {
        sessionId: tranId,
      })

      if(!response.data.success){
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePaymentCancel = async() => {
    try {
      const response = await secureApi.post('/payment/payment-cancel', {
        sessionId: tranId,
      })
      
    } catch (error) {
      console.log(error);
    }
  }


  const handleClearDealership = async() => {
    try {
      const response = await secureApi.post('/clear-dealership', {
        dealershipId: dealershipInfo._id,
      })

      console.log(response);
      
      if(!response.data.success){
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if(paymentSuccess){
      handlePaymentSuccess();
    }
    if(paymentCanceled){
      handlePaymentCancel();
    }
  },[paymentSuccess, paymentCanceled])
console.log(dealershipInfo);

  if(!dealershipInfo){
    return <div>Loading...</div>
  }
  return (
    <div className="flex items-center gap-4 p-3">
      <p className="text-gray-600 text-sm font-semibold">{index}.</p>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 container mx-auto border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-6  p-4">
          {/* Car Info Section */}
          <div className="flex-1 p-2 shadow-md borser border-gray-100">
            <div className="flex gap-2 items-center">
              <div>
                <img
                  src={dealershipInfo?.carId?.images[0]}
                  alt="car"
                  className="w-60 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Car Information
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-medium">
                    {dealershipInfo?.carId?.make} {dealershipInfo?.carId?.model}{" "}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Year:</span>
                  <span className="font-medium">
                    {dealershipInfo?.carId?.year}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">
                    ${dealershipInfo?.carId?.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dealership Info Section */}
          <div className="flex-1 p-2 shadow-md borser border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Dealership Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{dealershipInfo?.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600">Contact:</span>
                <span className="font-medium">{dealershipInfo?.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600">Address:</span>
                <div>
                  <span>
                    {dealershipInfo?.address.city},{" "}
                    {dealershipInfo?.address.state},{" "}
                    {dealershipInfo?.address.country} (
                    {dealershipInfo?.address.zip})
                  </span>
                </div>
              </div>

              <div>
                <span className="text-gray-600">Dealership Status:</span>
                <span
                  className={`font-medium ${
                    dealershipInfo?.status === "pending"
                      ? "text-orange-500"
                      : "text-green-500"
                  }`}
                >
                  {" "}
                  {dealershipInfo?.status}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Payment Status:</span>
                <span
                  className={`font-medium ${
                    dealershipInfo?.paymentInfo.paymentStatus === "pending"
                      ? "text-orange-500"
                      : dealershipInfo?.paymentInfo.paymentStatus === "success"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {" "}
                  {dealershipInfo?.paymentInfo.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Seller Info Section */}
          <div className="lg:w-80 p-2 shadow-md borser border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Seller Information
            </h3>
            <div className="space-y-2">
              <img
                src={dealershipInfo?.sellerId?.avatar || ''}
                alt="seller-avatar"
                loading="lazy"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">
                  {dealershipInfo?.sellerId.fullname}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">
                  {dealershipInfo?.sellerId.email}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className=" lg:w-60  p-2 shadow-md borser border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Actions
            </h3>
            <div className="space-y-3 flex flex-col items-center">
              <Link to={`/future-cars/${dealershipInfo?.carId._id}`} className="w-full bg-blue-600 flex justify-center items-center text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                View Details
              </Link>

              {/* Payment Buttons */}
              {dealershipInfo?.status === "approved" && dealershipInfo?.paymentInfo.paymentStatus === "pending" && (
                <button onClick={handleCarBuyPayment} className="w-full bg-green-600 text-white px-4 py-2 flex justify-center items-center rounded hover:bg-green-700 transition-colors">
                  Payment
                </button>
              )}

              { dealershipInfo?.paymentInfo.paymentStatus !== "success" && dealershipInfo?.status === "approved" && (
                <button onClick={handleClearDealership} className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors cursor-pointer">
                  Cancel Dealership
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCarList;
