import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import usePublicApi  from "../../../hooks/usePublicApi";
import useSecureApi from "../../../hooks/useSecureApi";
import PricingList from "../../../components/seller/PricingList";
import { useNavigate } from "react-router-dom";
import { toast , Toaster} from "sonner";
const Pricing = () => {
  const [isLoading, setIsLoading] = useState(false);
const publicApi = usePublicApi();
const secureApi = useSecureApi();
const navigate = useNavigate();

  const {data: pricingPlans, isLoading: isLoadingPricingPlans, error: errorPricingPlans} = useQuery({
    queryKey: ["pricingPlans"],
      queryFn: async () => {
        const response = await publicApi.get("/get-all-pricing-plans");
        
        
        return response.data.pricingPlans;
      }
    });


    const handleActivePlan = async(plan) => {
      setIsLoading(true);
      try {
        const response = await secureApi.post("/get-free-plan", {name: plan.name, features: plan.features});
        if(response.data.success){
          toast.success(response.data.message);
          navigate("/seller-dashboard");
          setIsLoading(false);
        }else{
          toast.error(response.data.message);
        }
      } catch (error) {
      console.log(error);
      }
      
      
    }
  return (
    <div>
      <section className="bg-black  text-white py-16 text-center mb-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold ">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-lg ">
            Pick a plan that fits your journey — from exploring to accelerating
            sales.
          </p>
        </div>
      </section>

    



      <div className="lg:flex  items-center justify-between gap-10 container  mx-auto">
        {pricingPlans?.map((plan) => <PricingList key={plan._id} plan={plan} handleActivePlan={handleActivePlan} isLoading={isLoading}/>)}
      </div>
      <Toaster richColors position="top-right"/>
    </div>
  );
};

export default Pricing;
