import { Router } from "express";
import { createCarBookingPayment, createCarBuyPayment, createPlanPayment, getPaymentBySeller, handlePaymentCancel, handlePaymentSuccess } from "../controllers/payment.controller.js";
import verifyUser from "../middlewares/verify.user.js";
import verifySeller from "../middlewares/verify.seller.js";
const router = Router();



router.get('/seller', verifyUser,verifySeller,getPaymentBySeller);
router.post('/create-car-booking-payment',verifyUser, createCarBookingPayment);
router.post('/create-car-buy-payment',verifyUser, createCarBuyPayment);

router.post('/create-plan-payment',verifyUser,verifySeller, createPlanPayment);

router.post('/payment-success',verifyUser, handlePaymentSuccess);

router.post('/payment-cancel',verifyUser, handlePaymentCancel);

export default router;
