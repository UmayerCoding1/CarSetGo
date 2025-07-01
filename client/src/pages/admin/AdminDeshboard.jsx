import React from 'react';
import Overview from '../../components/admin/Overview';
import Sidebar from '../../components/admin/Sidebar';
import { Toaster } from 'sonner';
import { Outlet } from 'react-router-dom';
import AbminDesboardNavbar from '../../components/admin/AbminDesboardNavbar';

const AdminDeshboard = () => {
  return (
    <div className="min-h-screen max-h-screen overflow-hidden lg:flex font-IBM bg-gray-50">
      <Sidebar />
      <div className="flex-1 relative ">
        <AbminDesboardNavbar />
        <div className="flex-1">
          <Outlet />
        </div>
        {/* Small Footer */}
        <footer className="w-full h-7 flex items-center justify-center absolute z-10 bottom-0 bg-blue-900 text-white text-xs font-medium tracking-wide shadow-inner">
          © {new Date().getFullYear()} CarSetGo Admin. All rights reserved.
        </footer>
      </div>
      
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default AdminDeshboard;