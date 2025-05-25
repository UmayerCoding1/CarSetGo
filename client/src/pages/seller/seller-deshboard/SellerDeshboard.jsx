import React, { useEffect } from 'react';

import Sidebar from '../../../components/seller/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/seller/Navbar';
import "./seller.css";
import { toast, Toaster } from 'sonner';
import useSecureApi from '../../../hooks/useSecureApi';
import useAuth from '../../../hooks/useAuth';

const SellerDashboard = () => {
  const {user} = useAuth();
  const secureApi = useSecureApi();
const successPayment = new URLSearchParams(window.location.search).get('success');
const clencledPayment = new URLSearchParams(window.location.search).get('canceled');
const planName = new URLSearchParams(window.location.search).get('planName');
const sessionId = new URLSearchParams(window.location.search).get('session_id');
 const navigate = useNavigate();


  async function handlePaymentSuccess() {
      try {
      const response = await secureApi.post(`/payment/payment-success?planName=${planName}`,{sessionId} )
      if (response.data.success) {
        console.log(response.data);
        
        toast.success(response.data.message);
        navigate("/seller-dashboard");
      }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        
      }
     
    }


    useEffect(() => {
      
      if (successPayment) {
        handlePaymentSuccess();
      }
      if (clencledPayment) {
        toast.error("Payment canceled");
      }
      
    },[successPayment, clencledPayment]);


   
  return (
    <div className="mix-h-screen lg:flex font-IBM">
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
