import { Copy, Loader2, X } from "lucide-react";
import React, { useState } from "react";
import CarInformation from "../../ui/car-details/CarInformation";
import { callPutApis } from "../../../api/api";
import {toast} from 'sonner';
export const statusEnum = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
  "processing",
];

export const statusColors = {
  pending: "text-yellow-600 bg-yellow-50",
  confirmed: "text-blue-600 bg-blue-50",
  cancelled: "text-red-600 bg-red-50",
  completed: "text-green-600 bg-green-50",
  processing: "text-purple-600 bg-purple-50",
};

const BookingTable = ({ data, refetchSellerBookings }) => {
  const [isOpenCarDetails, setIsOpenCarDetails] = useState(null); // holds index
  const [isBookingStatus, setIsBookingStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formattedDate = (date) => {
    const isDate = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return isDate.toLocaleDateString("en-US", options);
  };

   

        const handleBookingStatus = async (bookingId, status) => {
          if (!bookingId || !status) {
            throw new Error("Missing required fields");
          }

          setIsBookingStatus(status);
          setIsLoading(true);
          try {
            const response = await callPutApis(`/bookings/${bookingId}/status`,{ status });
            if (response.success) {
              toast.success(response.message, {duration: 1000});
              setIsLoading(false);
               refetchSellerBookings();
            }
          } catch (error) {console.log(error);
            toast.error(error.response.data.message, {duration: 1000});
            setIsLoading(false);
          }
        };


        const handlePaymentIdCopy =  (id) => {
          if(!id) return;

          navigator.clipboard.writeText(id)
          .then(() => toast.success('Payment id copy', {duration: 1000}))
          .catch(() => toast.error('Try agian', {duration: 1000}))
          
        }

  return (
    <>
      {data.map((item, inx) => {
        const {
          _id,
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
          totalPrice,
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
                <span>$ {totalPrice}</span>
              </th>

              <th className="font-medium text-sm text-gray-500 border">
                {pickupLocation}
              </th>

              <th className="font-medium text-sm text-gray-500 border px-2">
               <div className="flex items-center justify-center gap-4">
                 <p>{paymentId?.slice(0,20) || "N/A"}</p>
               {paymentId &&  <Copy onClick={() => handlePaymentIdCopy(paymentId)} size={15} className="text-gray-600 hover:text-black"/>}
               </div>
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
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 size={15} className="animate-spin" />
                  </div>
                ) : (
                  <select
                    name="status"
                    id="status"
                    className={`p-2 outline-none rounded-lg font-medium text-sm w-full "
                    ${statusColors[status] || "text-gray-600"}
                    `}
                    onChange={(e) => handleBookingStatus(_id, e.target.value)}
                    value={isBookingStatus ? isBookingStatus : status}
                  >
                    {(paymentStatus === 'success'
                     ? statusEnum.filter((status) => status === 'completed' || status === 'processing')
                     : status === 'pending'
                     ? statusEnum.filter((status) => status === 'pending' || status === 'confirmed' || status === 'cancelled')
                     : status === 'confirmed'
                     ? statusEnum.filter((status) => status === 'pending' || status === 'confirmed' || status === 'cancelled')
                     : statusEnum
                     ).map((statusOption) => (
                      <option
                        className={`font-medium 
                      ${statusColors[statusOption] || "text-gray-600"}
                      `}
                        key={statusOption}
                        value={statusOption}
                      >
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
