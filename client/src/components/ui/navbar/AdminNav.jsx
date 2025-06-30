import { LayoutDashboard } from "lucide-react";
import React from "react";
import {Link} from 'react-router-dom';
const AdminNav = () => {
  return (
    <div>
      <div>
        <Link
          to={"/admin/dashboard"}
          className="flex items-center gap-2 border px-5 py-2 rounded-lg select-none cursor-pointer"
        >
          <LayoutDashboard strokeWidth={1} />
          <span className="text-sm font-medium">Admin Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminNav;
