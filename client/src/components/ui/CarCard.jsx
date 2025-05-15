import React from "react";
import { asset } from "./../../assets/asser";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
const CarCard = ({ car }) => {
  console.log(car._id);
  
  return (
    <div className="bg-[hsl(48,12%,92%)] w-full lg:w-[300px]  flex  flex-col  justify-center gap-2 p-2 rounded-lg font-DM-MONO">
      <div className="flex items-center justify-center">
        <img className="w-full h-[150px] object-cover  bg-center rounded-xl" src={car?.images[0]} alt={car?.make} loading="lazy" />
      </div>
      <div className="mt-2 ">
        <h2 className="font-semibold text-2xl">{car?.make}<span className={`text-xs font-medium ${car?.status === 'booked' && 'text-blue-400'} ${car?.status === 'available' && 'text-green-600'} ${car?.status === 'sold' && 'text-red-600'}`}>({car?.status})</span></h2>
        <p className="text-gray-600">${car?.price}{car?.postType === "booking" && "/hour"}</p>
      </div>

      

      <Link to={`/future-cars/${car._id}`} className="flex items-center justify-end gap-2">
        <p>More details</p>
        <div className="bg-yellow-400 p-2 rounded-full">
          <ArrowUp className="rotate-[45deg]" />
        </div>
      </Link>
    </div>
  );
};

export default CarCard;
