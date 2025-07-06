import React, { useState } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
const Filter = () => {
  const [price, setPrice] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedCarType, setSelectedCarType] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const navigate = useNavigate();
  const carMakes = ["BMW", "Ford", "Honda", "Tata", "Rivian", "Mercedes-Beng"];
  const carTypes = ["Coupe", "Hatchback", "Sedan", "SUV"];
  const fuelTypes = [
    "Petrol",
    "Diesel",
    "CNG",
    "LPG",
    "Electric",
    "Hybrid",
    "Hydrogen",
    "Plug-in Hybrid",
    "Flex Fuel",
    "Biodiesel",
  ];

  const handleFilter = () => {
    const filter = {
      price: price || "",
      make: selectedMake || "",
      bodyType: selectedCarType || "",
      fuelType: selectedFuelType || "",
    };

    navigate(`/future-cars?${new URLSearchParams(filter).toString()}`);
  };
  return (
    <div className="  lg:w-[25%]">
      <div className="md:block lg:hidden w-full">m</div>

      <div className="hidden md:hidden lg:block w-full p-2">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-medium">Filters</h2>
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{
              background: "red",
              color: "#fff",
            }}
            onClick={() => {
              setPrice("");
              setSelectedMake("");
              setSelectedCarType("");
              setSelectedFuelType("");
              navigate(`/future-cars`);
            }}
            className="flex items-center gap-2 font-medium border border-gray-300 p-2 rounded-lg cursor-pointer"
          >
            Clear all
            <X size={15} />
          </motion.button>
        </div>

        <div className="mt-3">
          <h2 className="text-xl font-medium">Price range</h2>
          <label htmlFor="price" className="block text-lg font-medium"></label>
          <input
            id="price"
            type="range"
            min="10000"
            max="1000000"
            step="1000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full outline-none appearance-none bg-black rounded-full h-[7px] slider-thumb"
          />

          <div className="flex items-center justify-between mt-2">
            <p className="font-medium text-sm">৳ {price.toString()}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mt-7 pb-2">
            <h2 className="text-2xl font-medium">Make</h2>
            {selectedMake && (
              <motion.button
                whileTap={{ scale: 0.8 }}
                whileHover={{
                  background: "red",
                  color: "#fff",
                }}
                onClick={() => {
                  setSelectedMake("");
                  navigate(`/future-cars`);
                }}
                className="flex items-center gap-2 font-medium border border-gray-300 p-2 rounded-lg cursor-pointer"
              >
                Clear
                <X size={15} />
              </motion.button>
            )}
          </div>

          <div>
            {carMakes.map((make, inx) => (
              <motion.button
                whileTap={{ scale: 0.8 }}
                key={inx}
                onClick={() => setSelectedMake(make)}
                className={`border border-gray-300 p-2 mx-2 my-2 text-sm font-medium rounded-sm cursor-pointer ${
                  selectedMake === make && "bg-blue-100 text-blue-500"
                }`}
              >
                {make}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mt-7">
          <div className="flex items-center justify-between  pb-2">
            <h2 className="text-2xl font-medium">Body Types</h2>
            {selectedCarType && (
              <motion.button
                whileTap={{ scale: 0.8 }}
                whileHover={{
                  background: "red",
                  color: "#fff",
                }}
                onClick={() => setSelectedCarType("")}
                className="flex items-center gap-2 font-medium border border-gray-300 p-2 rounded-lg cursor-pointer"
              >
                Clear
                <X size={15} />
              </motion.button>
            )}
          </div>

          <div>
            {carTypes.map((type, inx) => (
              <div className="flex items-center gap-1 font-medium my-4">
                <input
                  onClick={(e) => setSelectedCarType(type)}
                  key={inx}
                  checked={selectedCarType === type}
                  type="checkbox"
                  className=""
                  value={type}
                />
                <p>{type}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7">
          <div className="flex items-center justify-between  pb-2">
            <h2 className="text-2xl font-medium">Fuel Types</h2>
            {selectedFuelType && (
              <motion.button
                whileTap={{ scale: 0.8 }}
                whileHover={{
                  background: "red",
                  color: "#fff",
                }}
                onClick={() => setSelectedFuelType("")}
                className="flex items-center gap-2 font-medium border border-gray-300 p-2 rounded-lg cursor-pointer"
              >
                Clear
                <X size={15} />
              </motion.button>
            )}
          </div>

          <div>
            {fuelTypes.map((type, inx) => (
              <motion.button
                whileTap={{ scale: 0.8 }}
                key={inx}
                onClick={() => setSelectedFuelType(type)}
                className={`border border-gray-300 p-2 mx-2 my-2 text-sm font-medium rounded-sm cursor-pointer ${
                  selectedFuelType === type && "bg-blue-100 text-blue-500"
                }`}
              >
                {type}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleFilter}
            className="w-full bg-black p-2 text-white text-sm font-medium rounded-lg mt-5"
          >
            Apply filter
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
