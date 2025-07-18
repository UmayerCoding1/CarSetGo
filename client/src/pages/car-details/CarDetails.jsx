import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import usePublicApi from "../../hooks/usePublicApi";
import ImageSlider from "../../components/ui/image-slider/ImageSlider";
import CarBookingForm from "../../components/ui/CarBookingForm";
import CarBuyngForm from "../../components/ui/CarBuyngForm";
import useAuth from "../../hooks/useAuth";
import { motion } from "motion/react";
import { User, Shield, Edit, TriangleAlert, SkipBack } from "lucide-react";
import Policy from "../../components/ui/car-details/Policy";
import ChatInterface from "../../components/ui/ChatInterface";
import { toast } from "sonner";
import CarInformation from "../../components/ui/car-details/CarInformation";
import Savecar from "../../components/ui/car-details/Savecar";
import { callPostApis, callPutApis } from "../../api/api";
import Review from "../../components/ui/car-details/Review";
import Repote from "../../components/ui/Repote";
import CarDetailsSkeleton from "../../components/Skeleton/CarDetails";
const CarDetails = () => {
  const { id } = useParams();
  const publicApi = usePublicApi();
  const { user } = useAuth();
  const MotionLink = motion(Link);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [showAds, setShowAds] = useState(true);
  const [adsCloseCount, setAdsCloseCount] = useState(7);

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

  useEffect(() => {
    window.scrollTo(0, 0);
    if (showAds) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    if (car?.add) {
      if (adsCloseCount > 0) {
        setTimeout(() => {
          setAdsCloseCount((prev) => prev - 1);
        }, 1000);
      }
    }


    if (!car?.add) {
      setShowAds(false);
      
    }
    

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [car?._id, showAds, adsCloseCount]);

  useEffect(() => {
    const handleCarViewCount = async () => {
      try {
        console.log(car?._id);
        
        const res = await callPutApis(`/cars/viewcount/${car?._id}`);
      } catch (error) {
        throw new Error(error);
      }
    };

    if (isReportOpen) {
      document.body.style.overflow = "hidden";
    }

    handleCarViewCount();
  }, [car?._id, isReportOpen, showAds]);


  useEffect(() => {
    const handleCarViewCount = async () => {
      try {
        console.log(car?._id);
        
        const res = await callPutApis(`/cars/viewcount/${car?._id}`);
      } catch (error) {
        throw new Error(error);
      }
    };

   console.log(user)

    handleCarViewCount();
  }, [car])
  

  const handleCloseReportWaper = () => {
    setIsReportOpen(false);
  };

  if (isLoading) return <CarDetailsSkeleton/>;
  if (error) return <div>Error loading car details</div>;
  if (!car) {
    return <div>No car found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="lg:flex gap-5">
        <div className="lg:w-[60%] h-[500px] shadow-md p-2">
          <ImageSlider images={car.images} height={"400px"} />
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
                <button
                  className={`flex items-center gap-1 text-sm ${
                    car.seller.isPlanActive
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  <Shield size={15} />{" "}
                  {car.seller.isPlanActive
                    ? "Premium Seller"
                    : "Seller is not verified"}
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

        <Policy
          postType={car.postType}
          paymentSystem={car.paymentSystem}
          paramsID={id}
        />
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

      <div
        onClick={() => setIsReportOpen(true)}
        className="bg-white shadow-md border border-gray-300   rounded-md fixed z-100 top-1/2 right-3 cursor-pointer p-2 flex gap-2 items-center justify-center "
      >
        <TriangleAlert />
        Report seller
      </div>

      {isReportOpen && (
        <Repote
          onClose={handleCloseReportWaper}
          userId={user?._id}
          carId={car?._id}
          sellerId={car?.seller._id}
        />
      )}

      {showAds && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-100">
          <div className="w-[500px] h-[500px] bg-white rounded-lg relative">
            <img
              src={car?.add?.adsData.image}
              alt="product"
              className="w-full h-full object-cover rounded-lg"
            />

            <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center  bg-gradient-to-b form-black/80 via-black/40 to-black/80 ">
              <div className="text-white mb-2 px-5 w-full  flex items-center justify-between gap-10">
                <div>
                  <h2 className="text-2xl font-medium">
                    {car?.add?.adsData.title}
                  </h2>
                  <p>{car?.add?.adsData.description}</p>
                </div>

                <div className="flex  flex-col gap-2">
                  <h2 className="text-3xl">Price: ${car?.add?.adsData.price}</h2>
                  <Link
                    to={car?.add?.adsData.productUrl}
                    target="_blank"
                    className="bg-blue-500 px-4 py-2 rounded-lg text-center"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-2 right-2 cursor-pointer">
            {adsCloseCount === 0 ? (
              <button
                className="flex items-center gap-1 bg-white px-3 py-2 rounded-lg"
                onClick={() => setShowAds(false)}
              >
                <SkipBack size={20} />
                <span>Skip</span>
              </button>
            ) : (
              <button className="flex items-center gap-1 bg-white px-3 py-2 rounded-lg">
                <span className="text-sm text-gray-500">Wait</span>
                {adsCloseCount}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
