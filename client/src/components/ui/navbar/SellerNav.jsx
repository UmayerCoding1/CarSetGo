import { Home, LayoutDashboard, Zap } from "lucide-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
const SellerNav = ({user}) => {
  const isSellerDashboard = useLocation().pathname === "/seller-dashboard";
  console.log(user);
  
   
  return (
    <div className="flex items-center gap-4">

      {isSellerDashboard ?  
      <div>
        <Link
          to={"/"}
          className="flex items-center gap-2 px-5 py-2 rounded-lg select-none cursor-pointer bg-black text-white"
        >
          <Home size={18}  />
          <span className="text-sm font-medium">Back to App</span>
        </Link>
      </div>
  :
  <div>
        <Link
          to={!user?.isPlanActive ? "/pricing" : "/seller-dashboard"}
          className="flex items-center gap-2 border px-5 py-2 rounded-lg select-none cursor-pointer"
        >
          <LayoutDashboard strokeWidth={1} />
          <span className="text-sm font-medium">Seller Dashboard</span>
        </Link>
      </div>
}
     

      {user?.isPlanActive === false &&  <Link
          to="/pricing" 
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
          <span className="font-card text-xs font-semibold ">Upgrade to Pro</span>
        </Link> }

        {user?.isPlanActive && <div
          className={`flex items-center bg-yellow-100 px-2 py-1 rounded-lg cursor-pointer`}
        >
          <Zap strokeWidth={1} size={18} className={`text-yellow-500 `} />
          <span className="font-card text-xs font-semibold ">{user?.plan} plan</span>
        </div>}
    </div>
  );
};

export default SellerNav;