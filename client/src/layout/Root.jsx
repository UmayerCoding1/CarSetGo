import React from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import Footer from '../components/ui/Footer';
import {Toaster} from 'sonner';
import Navbar from '../components/ui/navbar/Navbar';
import { useEffect } from 'react';

const Root = () => {
 const isFooterAvailable = useLocation().pathname.includes('seller-dashboard');
 const homePath = useLocation().pathname === '/';

 useEffect(() => {
   if (homePath) {
     sessionStorage.removeItem('currentSellerPath');
   }
 },[homePath])
    return (
        <div className='font-IBM bg-white text-black'>
         
         <Navbar/>
         <Outlet/>
         
         {!isFooterAvailable && <Footer />}


    <Toaster richColors position='top-right'/>
        </div>
    );
};

export default Root;