import { useQuery } from "@tanstack/react-query";
import React from "react";
import { callGetApis } from "../../../api/api";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/ui/Loading";
import {Link} from 'react-router-dom';
const Add = () => {
  const { user } = useAuth();
  const {
    data: cars = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cars", user?._id],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await callGetApis(
        `/cars/seller/${user?._id}?page=${1}&limit=${10}`
      );
      if (!response || !response.data) {
        throw new Error("Failed to fetch cars");
      }

      //   setTotalPages(response.data.totalPages);
      //   setPage(response.data.currentPage);

      return response.data.cars;
    },
  });

  console.log(cars);

  return (
    <div className="px-4  py-10">
      <div className="my-5">filter section</div>
      {!cars && cars.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {cars &&
            cars.length > 0 &&
            cars.map((car) => (
             <Link to={`${car?._id}`} key={car._id}>
              <div
                
                className="group shadow border border-gray-200 p-2 rounded-lg w-full h-[150px] bg-white relative"
              >
                <img
                  src={car?.images[0]}
                  alt="car-image"
                  loading="lazy"
                  className="w-full h-[100px] transition-transform duration-300 group-hover:scale-105 border-b-2 border-gray-200 rounded-2xl"
                />

                <div className="mt-2">
                    <h2 className="text-sm font-semibold">
                        <span>{car?.make}</span>
                        <span>{car?.model}</span>
                    </h2>

                    <p>Add: {new Date(car?.createdAt).toDateString()}</p>
                </div>

                {car.addCredits && (
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00000057] to-emerald-500 flex items-end justify-center " >
                     <h2 className="mb-2 text-lg text-white font-semibold text-shadow-2xs">Ads available</h2>
                </div>
                )}
              </div>
             </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default Add;
