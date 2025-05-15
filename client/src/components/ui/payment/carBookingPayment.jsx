import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
const carBookingPayment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    return (
        <div>
            <h1>Car Booking Payment</h1>
        </div>
    );
};

export default carBookingPayment;