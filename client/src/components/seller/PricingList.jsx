import React from "react";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";


const PricingList = ({ plan }) => {
  const { name, price, features } = plan;
  const {selingpostpermunth, bookingManagement, testDriveRequests,aiDescriptionGenerator,prioritySupport,verifiedSellerBadge,editpost,deletepost,carPromotion,unlimitedChat,adCreditsForPost} = features;
  const navigate = useNavigate();


  return (
    <div className="shadow-md border border-gray-300 rounded-lg p-8   w-full lg:w-1/3 mb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-semibold">{name}</h1>
        <h2 className="text-3xl font-semibold">
          ${price}{" "}
          <span className="text-sm text-gray-600">
            {name !== "Free" && "/month"}
          </span>
        </h2>
      </div>

      <div className="mt-4">
        <p>
          {name === "Free" &&
            " A simple start — list 1 car and explore basic features at no cost."}
        </p>
        <p>
          {name === "Pro" &&
            " Grow your reach — manage multiple posts, connect with buyers, and unlock smart tools."}
        </p>
        <p>
          {name === "Advanced" &&
            " Maximize your potential — full access, AI support, and top-tier seller tools for serious growth."}
        </p>

        <button
        onClick={() => {
            navigate(`/payment/upgrade-plan?plan=${name}`)
        }}
        className="bg-black w-full text-white px-4 py-2 rounded-md ny-4 mt-5 cursor-pointer">
          Get started
        </button>

        <hr className="my-4" />

        <div>
          <h2 className="text-lg font-semibold">Everything in {name}, plus:</h2>
          <ul className="mt-4 ">
            <li className="text-sm font-medium mb-2">
              <span>Seling post per {name !== "Free" && "month"}</span>{" "}
              <span>{selingpostpermunth}</span>
            </li>


            <li className="text-sm font-medium flex items-center gap-1 mb-2">
              <span>Booking Management</span>{" "} 
              {bookingManagement ? <Check size={16} className="text-emerald-600"/> : <X size={16}  className="text-red-500"  />}
            </li>

            <li className="text-sm font-medium flex items-center gap-1 mb-2">
              <span>Test Drive Requests</span>{" "} 
              {testDriveRequests ? <Check size={16} className="text-emerald-600"/> : <X size={16}  className="text-red-500"  />}
            </li>

            <li className="text-sm font-medium flex items-center gap-1 mb-2">
              <span>AI Description Generator</span>{" "} 
              <span>{aiDescriptionGenerator}</span>
            </li>

            <li className="text-sm font-medium flex items-center gap-1 mb-2">
              <span>Priority Support</span>{" "} 
              {prioritySupport ? <Check size={16} className="text-emerald-600"/> : <X size={16}  className="text-red-500"  />}
            </li>

            <li className="text-sm font-medium flex items-center gap-1 mb-2">
              <span>Verified Seller Badge</span>{" "} 
              {verifiedSellerBadge ? <Check size={16} className="text-emerald-600"/> : <X size={16}  className="text-red-500"  />}
            </li>

            <li className="text-sm font-medium flex items-center gap-1 mb-2">
              <span>Edit Post</span>{" "} 
              {editpost ? <Check size={16} className="text-emerald-600"/> : <X size={16}  className="text-red-500"  />}
            </li>

            <li className="text-sm font-medium flex items-center gap-1 mb-2">
              <span>Delete Post</span>{" "} 
              {deletepost ? <Check size={16} className="text-emerald-600"/> : <X size={16}  className="text-red-500"  />}
            </li>

            <li className="text-sm font-medium flex items-center gap-1 mb-2">
              <span>Car Promotion</span>{" "} 
              {carPromotion ? <Check size={16} className="text-emerald-600"/> : <X size={16}  className="text-red-500"  />}
            </li>

            <li className="text-sm font-medium flex items-center gap-1 mb-2">
              <span>Unlimited Chat</span>{" "} 
              {unlimitedChat ? <Check size={16} className="text-emerald-600"/> : <X size={16}  className="text-red-500"  />}
            </li>

            <li className="text-sm font-medium flex items-center gap-1 mb-2">
              <span>Ad Credits For Post</span>{" "} 
              {adCreditsForPost ? <Check size={16} className="text-emerald-600"/> : <X size={16}  className="text-red-500"  />}
            </li>
            

          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingList;
