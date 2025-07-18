import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useCallback, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { callDeleteApis, callGetApis } from "../../api/api";
import { motion } from "motion/react";
import { Car, Heart, Search, Trash2 } from "lucide-react";
import SaveCarsSkeleton from "../../components/Skeleton/SaveCars";
import { toast } from "sonner";
// Separate data fetching logic

const LIMIT = 10;

const SaveCars = () => {
  const { user } = useAuth();
  const observer = useRef(null);

  const fetchSavedCars = async ({ pageParam = 1 }) => {
    const res = await callGetApis(
      `/saved-cars/${user._id}?page=${pageParam}&limit=${LIMIT}`
    );
    return {
      cars: res.savedCars,
      nextPage: res.savedCars.length < LIMIT ? null : pageParam + 1,
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["savedCars", user._id],
    queryFn: fetchSavedCars,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!user._id,
  });

  const savedCar = data?.pages.flatMap((page) => page.cars) || [];

  const lastCarRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const handleRemoveCar = async (carId) => {
    try {
      const response = await callDeleteApis(
        `/unsave-car?carId=${carId}&userId=${user?._id}`
      );
      if (response.success) {
        toast.success(response.message, { duration: 1000 });
        refetch();
      }
      if (!response.success) {
        toast.error(response.message, { duration: 1000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message || "Something went wrong", {
        duration: 1000,
      });
    }
  };

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [user._id]);

  console.log(savedCar);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Cars Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <Car className="w-10 h-10 text-blue-400" />
              <h1 className="text-5xl font-bold text-white">Your Saved Cars</h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-200 max-w-2xl mx-auto text-lg"
            >
              <Heart className="w-6 h-6 inline-block mr-2 text-red-400" />
              Easily revisit your favorite cars. Compare, book, or buy them when
              you're ready.
            </motion.p>
          </div>

        </div>
      </motion.div>

      {/* Cars Grid Section */}
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-6">Your Saved Cars</h2>

        {savedCar.length === 0 && !isLoading && (
          <p className="text-center text-gray-500">No saved cars found.</p>
        )}

        {isLoading ? (
          <SaveCarsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {savedCar.map((savedCar, index) => {
              const car = savedCar.carId;
              const isLast = index === savedCar.length - 1;

              return (
                <div
                  key={savedCar._id}
                  ref={isLast ? lastCarRef : null}
                  className="border rounded-lg p-4 mb-4 shadow-sm"
                >
                  <div className="flex flex-col items-center   gap-4">
                    <img
                      src={car.images?.[0]}
                      alt={car.model}
                      className="w-full md:w-64 h-40 object-cover rounded-md"
                    />
                    <div className="w-full h-40">
                      <h3 className="text-lg font-semibold">
                        {car.make} {car.model} ({car.year})
                      </h3>
                      <p className="text-sm text-gray-600">
                        {car.bodyType} • {car.transmission} • {car.fuelType}
                      </p>
                      <p className="text-sm text-gray-700 mt-1 line-clamp-3">
                        {car.description}
                      </p>
                      <p className="mt-2 text-blue-600 font-bold">
                        ${car.price}
                      </p>
                    </div>

                    <motion.button
                      onClick={() => handleRemoveCar(savedCar.carId._id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md h-10 "
                    >
                      <Trash2 className="w-5 h-5" />
                      <span>Remove</span>
                    </motion.button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {isFetchingNextPage && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Loading more...
          </p>
        )}
      </div>
    </div>
  );
};

export default SaveCars;
