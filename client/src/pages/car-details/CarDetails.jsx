import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
} from "lucide-react";
import Policy from "../../components/ui/Policy";

const CarDetails = () => {
  const { id } = useParams();
  const publicApi = usePublicApi();
  const { user } = useAuth();
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

  // console.log(typeof car.seller.avatar);

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
          <ImageSlider images={car.images} />
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
            />
          )}

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center font-medium gap-2 border border-gray-300 rounded-md p-2 w-full my-4 hover:bg-gray-100 cursor-pointer"
          >
            <Heart size={15} /> Save car
          </motion.button>
        </div>
      </div>

      <div className="lg:flex gap-5 mt-2">
        {/* Car Information Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 lg:w-1/2 ">
          <div className="flex flex-col gap-2 bg-white shadow-md p-6 rounded-md mb-10 mt-0">
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

            <div className="flex flex-col gap-3 mt-4">
              <motion.button whileTap={{ scale: 0.9 }} className=" text-sm bg-black text-white p-2 rounded-lg font-medium w-full text-center cursor-pointer">Contact Seller</motion.button>
              <motion.button whileTap={{ scale: 0.9 }} className="text-sm border border-gray-300 p-2 rounded-lg font-medium w-full text-center cursor-pointer">Schedule  Test Drive</motion.button>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Car Information</h2>

          {/* Basic Information */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Car className="text-black" size={15} />
                <div>
                  <p className="text-sm text-gray-500">Make & Model</p>
                  <p className="font-medium">
                    {car.make} {car.model}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-black" size={15} />
                <div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-medium">{car.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Tag className="text-black" size={15} />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium capitalize">{car.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="text-black" size={15} />
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">${car.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Settings className="text-black" size={15} />
                <div>
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="font-medium capitalize">{car.transmission}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Fuel className="text-black" size={15} />
                <div>
                  <p className="text-sm text-gray-500">Fuel Type</p>
                  <p className="font-medium capitalize">{car.fuelType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Gauge className="text-black" size={15} />
                <div>
                  <p className="text-sm text-gray-500">Mileage</p>
                  <p className="font-medium">
                    {car.mileage.toLocaleString()} km
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="text-black" size={15} />
                <div>
                  <p className="text-sm text-gray-500">Seats</p>
                  <p className="font-medium">{car.seats} seats</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Car className="text-black" size={15} />
                <div>
                  <p className="text-sm text-gray-500">Body Type</p>
                  <p className="font-medium capitalize">{car.bodyType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Palette className="text-black" size={15} />
                <div>
                  <p className="text-sm text-gray-500">Color</p>
                  <p className="font-medium capitalize">{car.color}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <p className="text-gray-600">{car.description} </p>
          </div>
        </div>

        {/* Policy Section */}
        <Policy postType={car.postType} paymentSystem={car.paymentSystem} />
      </div>
    </div>
  );
};

export default CarDetails;
