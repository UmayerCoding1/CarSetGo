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

  User,
  Shield,
  Edit,
} from "lucide-react";
import Policy from "../../components/ui/car-details/Policy";
import ChatInterface from "../../components/ui/ChatInterface";
import { toast } from "sonner";
import CarInformation from "../../components/ui/car-details/CarInformation";
import Savecar from "../../components/ui/car-details/Savecar";
import {callPostApis} from "../../api/api";
import Review from "../../components/ui/car-details/Review";
const CarDetails = () => {
  const { id } = useParams();
  const publicApi = usePublicApi();
  const { user } = useAuth();
  const MotionLink = motion(Link);
  const [isChatOpen, setIsChatOpen] = useState(false);

  

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

        <Policy postType={car.postType} paymentSystem={car.paymentSystem}  paramsID={id}/>
      </div>

      {/* Reviews Section */}
     <Review car={car} user={user} />

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
