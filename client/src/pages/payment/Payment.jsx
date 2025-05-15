import React from 'react';
import { useLocation } from 'react-router-dom';
import PlanPayment from '../../components/ui/payment/PlanPayment';
import CarBuyPayment from '../../components/ui/payment/CarBuyPayment';
import CarBookingPayment from '../../components/ui/payment/carBookingPayment';
const Payment = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const plan = searchParams.get('plan');

    const planPaymentType = location.pathname.includes('upgrade-plan');
    const carBuyPaymentType = location.pathname.includes('car-buy');
    const carBookingPaymentType = location.pathname.includes('car-booking');
    
    return (
        <div>
            
            {planPaymentType && <PlanPayment />}
            {carBuyPaymentType && <CarBuyPayment />}
            {carBookingPaymentType && <CarBookingPayment />}
        </div>
    );
};

export default Payment;