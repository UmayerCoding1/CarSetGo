import { Heart } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { toast } from "sonner";
import useSecureApi from "../../../hooks/useSecureApi";

const Savecar = ({carId,userId}) => {
    const secureApi = useSecureApi();
  const handleSaveCar = async() => {
    if (!userId) {
      toast.error("Please login to save car", { duration: 1000 });
      return;
    }

    if(carId || userId){
      try {
        const response = await secureApi.post("/save-car", {carId, userId});
        if(response.data.success){
            toast.success(response.data.message, { duration: 1000 });
        }

        if(!response.data.success){
            toast.error(response.data.message, { duration: 1000 });
        }
      } catch (error) {
        
        toast.error(error.response.data.message || "Something went wrong", { duration: 1000 });
      }
    }

  };
  return (
    <div>
      <motion.button
        onClick={handleSaveCar}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center font-medium gap-2 border border-gray-300 rounded-md p-2 w-full my-4 hover:bg-gray-100 cursor-pointer"
      >
        <Heart size={15} /> Save car
      </motion.button>
    </div>
  );
};

export default Savecar;
