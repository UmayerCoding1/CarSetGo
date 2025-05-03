import React from "react";
import { asset } from "./../../assets/asser";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
const CarCard = ({ car }) => {
  return (
    <div className="bg-[hsl(48,12%,92%)] w-full lg:w-[400px]  flex  flex-col  justify-center p-2 rounded-lg font-DM-MONO">
      <div className="mt-2 ">
        <h2 className="font-semibold text-2xl">Crossover</h2>
        <p className="text-gray-600">$14/hour</p>
      </div>

      <div className="flex items-center justify-center">
        <img className="w-96 lg:w-[200px]" src={asset.mpvcar} alt="" />
      </div>

      <Link className="flex items-center justify-end gap-2">
        <p>More details</p>
        <div className="bg-yellow-400 p-2 rounded-full">
          <ArrowUp className="rotate-[45deg]" />
        </div>
      </Link>
    </div>
  );
};

export default CarCard;
