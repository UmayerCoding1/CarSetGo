import React from "react";
import {Link} from 'react-router-dom';
const CarTypeCard = ({ type }) => {
  return (
    <Link  className=" w-[240px] h-[294px] mb-2 relative flex flex-col items-center justify-end p-1 rounded-xl card">
      <div className="absolute bg-gradient-to-b from-[#000] to-[#00000057] text-white w-full h-full p-2 rounded-xl">
        <h2 className="text-2xl font-medium">{type?.title}</h2>
      </div>

      <img className="w-full" src={type?.image} alt={type?.title} loading="lazy"/>
    </Link>
  );
};

export default CarTypeCard;
