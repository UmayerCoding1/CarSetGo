import { Loader2, X } from "lucide-react";
import React, { useState } from "react";
import CarInformation from "../../ui/car-details/CarInformation";

export const statusEnum = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
  "processing",
];

const BookingTable = ({ data, handleBookingStatus, isProcessing }) => {
  const [isOpenCarDetails, setIsOpenCarDetails] = useState(null); // holds index

  const formattedDate = (date) => {
    const isDate = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return isDate.toLocaleDateString("en-US", options);
  };

  return (
    <>
      {data.map((item, inx) => {
        const {
          phone,
          bookingStartDate,
          bookingEndDate,
          duration,
          durationType,
          paymentStatus,
          status,
          userId,
          carId,
          paymentId,
          createdAt,
          pickupLocation,
        } = item;

        return (
          <React.Fragment key={inx}>
            <tr
              className={`border-b border-gray-200 h-10 cursor-pointer ${
                inx % 2 === 0 ? "bg-gray-200" : ""
              }`}
            >
              <th className="font-medium text-sm text-gray-500 border">
                {inx + 1}
              </th>
              <th className="font-medium text-sm text-gray-500 border">
                {userId?.fullname}
              </th>
              <th className="font-medium text-sm text-gray-500 border">
                {phone}
              </th>
              <th className="font-medium text-sm text-gray-500 border">
                {formattedDate(createdAt)}
              </th>
              <th className="font-medium text-sm text-gray-500 border">
                {formattedDate(bookingStartDate)}
              </th>
              <th className="font-medium text-sm text-gray-500 border">
                {formattedDate(bookingEndDate)}
              </th>

              <th
                onClick={() => setIsOpenCarDetails(inx)}
                className="font-medium text-sm border border-black text-blue-500 hover:underline"
              >
                See Details
              </th>

              <th className="font-medium text-sm text-gray-500 border">
                <span>{duration}</span> <span>{durationType}</span>
              </th>

              <th className="font-medium text-sm text-gray-500 border">
                {pickupLocation}
              </th>

              <th className="font-medium text-sm text-gray-500 border">
                {paymentId || "N/A"}
              </th>

              <th className="font-medium text-sm text-gray-500 border">
                <span
                  className={`${
                    paymentStatus === "pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {paymentStatus}
                </span>
              </th>

              <th className="font-medium text-sm text-gray-500 border">
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <Loader2 size={15} className="animate-spin" />
                  </div>
                ) : (
                  <select
                    name="status"
                    id="status"
                    className="p-2 outline-none rounded-lg font-medium text-sm w-full"
                    onChange={(e) => handleBookingStatus(e.target.value)}
                    value={status}
                  >
                    {statusEnum.map((statusOption) => (
                      <option key={statusOption} value={statusOption}>
                        {statusOption.charAt(0).toUpperCase() +
                          statusOption.slice(1)}
                      </option>
                    ))}
                  </select>
                )}
              </th>
            </tr>

            {/* Modal */}
            {isOpenCarDetails === inx && (
              <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
                <div className="w-[95%] md:w-[900px] max-h-[90vh] overflow-auto bg-white rounded-md p-3 relative">
                  <button
                    onClick={() => setIsOpenCarDetails(null)}
                    className="bg-black text-white rounded-full p-2 absolute top-2 right-2 z-10"
                  >
                    <X size={18} />
                  </button>

                  <div className="flex flex-col md:flex-row gap-4">
                    <img
                      src={carId?.images?.[0]}
                      alt={carId?.make}
                      loading="lazy"
                      className="w-full md:w-96 object-cover rounded"
                    />
                    <div className="flex-1">
                      <CarInformation car={carId} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default BookingTable;
