import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import FreePlanDeatils from "./FreePlanDeatils";
import ProPlanDeatils from "./ProPlanDeatils";
import AdvancePlanDetails from "./AdvancePlanDetails";
const AiFeature = ({ planDetails }) => {
  // const currentPlan = 'free';
  // const currentPlan = 'pro';
  const currentPlan = 'advance';
  return (
    <div>
      <h2 className="text-2xl font-semibold flex items-center justify-between">Your Plan Details   <Link to="/pricing" className="bg-black cursor-pointer text-white px-4 py-2 rounded-md text-sm">Upgrade Plan</Link></h2>
      <div>
        <div className="flex  justify-between my-5 gap-4">
          <div className="w-1/3 border-r">
            <h3 className="text-sm font-semibold my-3">Plan Name: <span className="bg-yellow-400 px-2 py-1 rounded-md">{(planDetails?.name).toUpperCase()}</span></h3>
            <h3 className="text-sm font-semibold">Plan Price: ${planDetails?.price}</h3>
          </div>

          <div className="w-full">
             <h2 className="text-xl font-semibold text-center">Plan Features</h2>
             <div>
                {planDetails?.name === 'free' && <FreePlanDeatils features={planDetails?.features}/>}
                {planDetails?.name === 'pro' && <ProPlanDeatils features={planDetails?.features}/>}
                {planDetails?.name === 'advance' && <AdvancePlanDetails features={planDetails?.features}/>}

                {/* demo */}
                {/* {currentPlan === 'free' && <FreePlanDeatils features={planDetails?.features}/>}
                {currentPlan === 'pro' && <ProPlanDeatils features={planDetails?.features}/>}
                {currentPlan === 'advance' && <AdvancePlanDetails features={planDetails?.features}/>} */}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiFeature;
