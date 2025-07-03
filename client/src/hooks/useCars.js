import React from "react";
import { useQuery } from "@tanstack/react-query";
import usePublicApi from "./usePublicApi";
import { callGetApis } from "../api/api";
const useCars = (page,limit,price,make,bodyType,fuelType,search) => {
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
      const response = await callGetApis(`/cars?page=${page}&limit=${limit}&price=${price}&make=${make}&bodyType=${bodyType}&fuelType=${fuelType}&search=${search}`);
     
      
      return response;
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 10,
  });
  
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
