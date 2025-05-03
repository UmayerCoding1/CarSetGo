import React from 'react';
import {Outlet} from 'react-router-dom';
import Footer from '../components/ui/Footer';
import {Toaster} from 'sonner';
import Navbar from '../components/ui/navbar/Navbar';

const Root = () => {

    return (
        <div className='font-IBM bg-white text-black'>
         
         <Navbar/>
         <Outlet/>
         <Footer/>


    <Toaster richColors position='top-right'/>
        </div>
    );
};

export default Root;