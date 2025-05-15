import { Router } from "express";
import { createCarBookingPayment, createPlanPayment } from "../controllers/payment.controller.js";
import verifyUser from "../middlewares/verify.user.js";
import verifySeller from "../middlewares/verify.seller.js";
const router = Router();

router.post('/create-car-booking-payment',verifyUser, createCarBookingPayment);

router.post('/create-plan-payment',verifyUser,verifySeller, createPlanPayment);

export default router;
