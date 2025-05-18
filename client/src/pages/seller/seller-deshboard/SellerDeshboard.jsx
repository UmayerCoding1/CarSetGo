import React from 'react';

import Sidebar from '../../../components/seller/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../../../components/seller/Navbar';
import "./seller.css";

const SellerDashboard = () => {
  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Outlet />
      </div>
     
    </div>
  );
};

export default SellerDashboard;
