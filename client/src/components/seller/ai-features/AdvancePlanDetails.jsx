import React from "react";
import { Check, X } from "lucide-react";
const AdvancePlanDetails = ({ features }) => {
  const {
    selingpostpermunth,
    bookingManagement,
    testDriveRequests,
    aiDescriptionGenerator,
    prioritySupport,
    verifiedSellerBadge,
    editpost,
    deletepost,
    carPromotion,
    unlimitedChat,
    adCreditsForPost,
  } = features;

  const freePlanFeatures = [
    { name: "Seling post per month", value: "12" },
    { name: "Booking Management", value: true },
    { name: "Test Drive Requests", value: true },
    { name: "AI Description Generator", value: "12" },
    { name: "Priority Support", value: true },
    { name: "Verified Seller Badge", value: true },
    { name: "Edit Post", value: true },
    { name: "Delete Post", value: true },
    { name: "Car Promotion", value: true },
    { name: "Unlimited Chat", value: true },
    { name: "Ad Credits For Post", value: true },
  ];

  const availableFeatures = [
    { name: "Seling post per month", value: selingpostpermunth },
    { name: "Booking Management", value: bookingManagement },
    { name: "Test Drive Requests", value: testDriveRequests },
    { name: "AI Description Generator", value: aiDescriptionGenerator },
    { name: "Priority Support", value: prioritySupport },
    { name: "Verified Seller Badge", value: verifiedSellerBadge },
    { name: "Edit Post", value: editpost },
    { name: "Delete Post", value: deletepost },
    { name: "Car Promotion", value: carPromotion },
    { name: "Unlimited Chat", value: unlimitedChat },
    { name: "Ad Credits For Post", value: adCreditsForPost },
  ];

  const renderValue = (value) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check size={16} className="text-emerald-600 inline" />
      ) : (
        <X size={16} className="text-red-600 inline" />
      );
    }
    return <span className="text-gray-700">{value}</span>;
  };

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
              Plan Features
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
              Free Plan
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
              Available Features
            </th>
          </tr>
        </thead>
        <tbody>
          {freePlanFeatures.map((feature, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-700">
                {feature.name}
              </td>
              <td className="px-4 py-3 text-sm">
                {renderValue(feature.value)}
              </td>
              <td className="px-4 py-3 text-sm">
                {renderValue(availableFeatures[index].value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvancePlanDetails;
