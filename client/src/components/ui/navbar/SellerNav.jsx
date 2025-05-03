import { LayoutDashboard, Zap } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
const SellerNav = ({user}) => {
  console.log(user);
  
  // const paymentStatus = true;
  return (
    <div className="flex items-center gap-4">
      <div>
        <Link
          to={"/seller-dashboard"}
          className="flex items-center gap-2 border px-5 py-2 rounded-lg select-none cursor-pointer"
        >
          <LayoutDashboard strokeWidth={1} />
          <span className="text-sm font-medium">Seller Dashboard</span>
        </Link>
      </div>

      {/* {user?.paymentStatus === "pending"? (
        <div
          className={`flex items-center bg-yellow-100 px-2 py-1 rounded-lg cursor-pointer`}
        >
          <Zap strokeWidth={1} size={18} className={`text-yellow-500 `} />
          <span className="font-card text-xs font-semibold ">Pro</span>
        </div>
      ) : (
        <div
          className={`flex items-center ${
            "bg-gray-300"
          } px-2 py-1 rounded-lg cursor-pointer`}
        >
          <Zap
            strokeWidth={1}
            size={18}
            className={`${
              "text-gray-600"
            } `}
          />
          <span className="font-card text-xs font-semibold ">Pro</span>
        </div>
      )} */}

      {user?.paymentstatus === "pending" &&  <div
          className={`flex items-center ${
            "bg-gray-300"
          } px-2 py-1 rounded-lg cursor-pointer`}
        >
          <Zap
            strokeWidth={1}
            size={18}
            className={`${
              "text-gray-600"
            } `}
          />
          <span className="font-card text-xs font-semibold ">Pro</span>
        </div> }

        {user?.paymentstatus === "completed" && <div
          className={`flex items-center bg-yellow-100 px-2 py-1 rounded-lg cursor-pointer`}
        >
          <Zap strokeWidth={1} size={18} className={`text-yellow-500 `} />
          <span className="font-card text-xs font-semibold ">Pro</span>
        </div>}
    </div>
  );
};

export default SellerNav;