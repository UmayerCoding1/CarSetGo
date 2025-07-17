import React from "react";
import { asset } from "./../../assets/asser";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
const CarCard = ({ car }) => {
  
  console.log('dksdf', car);
  
  return (
    <div className="bg-[hsl(48,12%,92%)] w-full lg:w-[320px] flex flex-col justify-between gap-3 p-4 rounded-2xl font-DM-MONO shadow-md border border-gray-200 transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]">
      <div className="relative flex items-center justify-center">
        <img
          className="w-full h-[170px] object-cover bg-center rounded-xl border border-gray-300 shadow-sm"
          src={car?.images[0] || asset.logo}
          alt={car?.make}
          loading="lazy"
        />
        {car?.featured && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded shadow text-black">Featured</span>
        )}
      </div>
      <div className="mt-2 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-xl">{car?.make} {car?.model && <span className="text-base font-normal text-gray-700">{car?.model}</span>}</h2>
          <span className={`ml-auto px-2 py-0.5 rounded text-xs font-semibold capitalize ${car?.status === 'booked' ? 'bg-blue-100 text-blue-600' : car?.status === 'available' ? 'bg-green-100 text-green-700' : car?.status === 'sold' ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'}`}>{car?.status}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          {car?.year && <span>Year: <span className="font-medium text-gray-700">{car.year}</span></span>}
          {car?.mileage && <span>Mileage: <span className="font-medium text-gray-700">{car.mileage} km</span></span>}
          {car?.fuelType && <span>Fuel: <span className="font-medium text-gray-700">{car.fuelType}</span></span>}
          {car?.transmission && <span>Trans: <span className="font-medium text-gray-700">{car.transmission}</span></span>}
        </div>
        <p className="text-lg font-semibold text-gray-800 mt-1">${car?.price}{car?.postType === "booking" && <span className="text-xs font-normal text-gray-500">/hour</span>}</p>
      </div>
      <Link
        to={`/future-cars/${car._id}`}
        className="flex items-center justify-end gap-2 mt-2 group"
      >
        <span className="font-medium text-black group-hover:underline">More details</span>
        <div className="bg-yellow-400 p-2 rounded-full group-hover:bg-yellow-500 transition-colors">
          <ArrowUp className="rotate-[45deg]" />
        </div>
      </Link>
    </div>
  );
};

export default CarCard;
