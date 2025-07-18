import { Heart, HeartOff } from "lucide-react";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { callDeleteApis, callPostApis } from "../../../api/api";
import useAuth from "../../../hooks/useAuth";

const Savecar = ({carId,userId}) => {
   const { user } = useAuth();
  const [isSaveCar, setIsSaveCar] = useState(false);

  const handleSaveCar = async() => {
    if (!userId) {
      toast.error("Please login to save car", { duration: 1000 });
      return;
    }


    if(carId || userId){
      try {
        const response = await callPostApis("/save-car", {carId, userId});
        if(response.success){
            setIsSaveCar(true);
            toast.success(response.message, { duration: 1000 });
        }

        if(!response.success){
            toast.error(response.message, { duration: 1000 });
        }
      } catch (error) {
        console.log(error);
        
        toast.error(error.response.data.message || "Something went wrong", { duration: 1000 });
      }
    }
  };

  const handleUnsave = async (carId, userId) => {
    try {
      const response = await callDeleteApis(`/unsave-car?carId=${carId}&userId=${userId}`);
      if(response.success){
        toast.success(response.message, { duration: 1000 });
        setIsSaveCar(false);
      }
      if(!response.success){
        toast.error(response.message, { duration: 1000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong", { duration: 1000 });
    }
  };


   useEffect(() => {
           if (user.savedCars.includes(carId)) {
              setIsSaveCar(true);
           }
    },[isSaveCar, carId, user]);
  return (
    <div>
      {isSaveCar ? (
         <motion.button
         onClick={() => handleUnsave(carId, userId)}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center font-medium gap-2 border border-gray-300 rounded-md p-2 w-full my-4 text-red-500 hover:bg-gray-100 cursor-pointer"
        >
          <HeartOff size={15} /> Un save
        </motion.button>
      ):
      <motion.button
        onClick={handleSaveCar}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center font-medium gap-2 border border-gray-300 rounded-md p-2 w-full my-4 hover:bg-gray-100 cursor-pointer"
      >
        <Heart size={15} /> Save car
      </motion.button>
}
    </div>
  );
};

export default Savecar;
