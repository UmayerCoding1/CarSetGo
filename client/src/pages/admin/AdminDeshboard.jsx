import React from 'react';
import Overview from '../../components/admin/Overview';
import Sidebar from '../../components/admin/Sidebar';
import { Toaster } from 'sonner';
import { Outlet } from 'react-router-dom';
import AbminDesboardNavbar from '../../components/admin/AbminDesboardNavbar';

const AdminDeshboard = () => {
    return (
        <div className="max-h-screen overflow-hidden lg:flex font-IBM">
      <Sidebar />
      <div className="flex-1">
        <AbminDesboardNavbar/>
        <Outlet />
      </div>
     <Toaster richColors position="top-right"/>
    </div>
    );
};

export default AdminDeshboard;