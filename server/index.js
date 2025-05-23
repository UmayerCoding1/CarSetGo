import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors  from 'cors';
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
const app = express();
const port = process.env.PORT || 8000;

connectDb();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: [
      "http://localhost:5173"
    ],   
  credentials: true,
}));


import auhRoute from './routes/auth.route.js';
import sellerReqRoute from './routes/requestforseller.route.js';
import carRoute from './routes/cat.route.js';
import messageRoute from './routes/message.route.js';
import dealershipRoute from './routes/dealership.route.js';
import saveCarRoute from './routes/saveCar.route.js';
import bookingRoute from './routes/booking.route.js';
import pricingRoute from './routes/pricing.route.js';
import paymentRoute from './routes/payment.route.js';
app.use('/api/v1/auth', auhRoute);
app.use('/api/v1', sellerReqRoute);
app.use('/api/v1', carRoute);
app.use('/api/v1', messageRoute);
app.use('/api/v1', dealershipRoute);
app.use('/api/v1', saveCarRoute);
app.use('/api/v1', bookingRoute);
app.use('/api/v1', pricingRoute);
app.use('/api/v1/payment', paymentRoute);
app.listen(port, () => {
    console.log(`Server running port:${port}`);
    
})


