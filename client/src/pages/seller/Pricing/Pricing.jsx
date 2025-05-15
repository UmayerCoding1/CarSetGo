import React from "react";
import { useQuery } from "@tanstack/react-query";
import usePublicApi  from "../../../hooks/usePublicApi";
import PricingList from "../../../components/seller/PricingList";
const Pricing = () => {
const publicApi = usePublicApi();

  const {data: pricingPlans, isLoading, error} = useQuery({
    queryKey: ["pricingPlans"],
      queryFn: async () => {
        const response = await publicApi.get("/get-all-pricing-plans");
        console.log(response.data.pricingPlans);
        
        return response.data.pricingPlans;
      }
    })
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
        {pricingPlans?.map((plan) => <PricingList key={plan._id} plan={plan} />)}
      </div>
    </div>
  );
};

export default Pricing;
