import React from "react";
import { useQuery } from "@tanstack/react-query";
import usePublicApi from "./usePublicApi";
const useCars = (page,limit,price,make,bodyType,fuelType,search) => {
  const publicApi = usePublicApi();
  const {
    data: cars,
    isLoading: isLoadingCars,
    isRefetching: isRefetchingCars,
  } = useQuery({
    queryKey: [
      "cars",
      page,
      limit,
      price,
      make,
      bodyType,
      fuelType,
      search
    ],
    queryFn: async () => {
      const response = await publicApi.get(`/cars?page=${page}&limit=${limit}&price=${price}&make=${make}&bodyType=${bodyType}&fuelType=${fuelType}&search=${search}`);
      return response.data;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 10,
  });
  console.log(page,limit);
  return {
    cars: cars?.data,
    totalPages: cars?.pagination?.totalPages,
    currentPage: cars?.pagination?.currentPage,
    totalCars: cars?.pagination?.totalCars,
    isLoadingCars,
    isRefetchingCars,
  };
};

export default useCars;
