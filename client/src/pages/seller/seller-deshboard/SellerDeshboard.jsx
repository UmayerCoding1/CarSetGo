import React from 'react';

import Sidebar from '../../../components/seller/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../../../components/seller/Navbar';
import "./seller.css";
import { Toaster } from 'sonner';

const SellerDashboard = () => {
  return (
    <div className="mix-h-screen lg:flex ">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Outlet />
      </div>
     <Toaster richColors position="top-right"/>
    </div>
  );
};

export default SellerDashboard;
