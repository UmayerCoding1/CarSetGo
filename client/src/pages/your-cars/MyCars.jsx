import React from "react";
import { asset } from "../../assets/asser";
import { useQuery } from "@tanstack/react-query";
import useSecureApi from "../../hooks/useSecureApi";
import useAuth from "../../hooks/useAuth";
import MyCarList from "../../components/ui/MyCarList";
const MyCars = () => {
  const secureApi = useSecureApi();
  const { user } = useAuth();

  const { data: yourCars = [] } = useQuery({
    queryKey: ["yourCars"],
    queryFn: async () => {
      const response = await secureApi.get(`/dealership/${user._id}`);
      return response.data.dealership;
    },
  });
  return (
    <div>
      <div className="relative h-[200px] w-full mb-10">
        <img
          src={asset.carBg}
          alt="car-bg"
          className="w-full h-[200px] object-cover bg-center absolute top-0 left-0"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <h1 className="text-white text-4xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Your Cars
        </h1>
      </div>

      <div>
        {yourCars.map((dealershipInfo ,index) => <MyCarList key={dealershipInfo._id} dealershipInfo={dealershipInfo}  index={index + 1}/>)}
      </div>
    </div>
  );
};

export default MyCars;
