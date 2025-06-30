import express from 'express';
import verifyUser from '../middlewares/verify.user.js';
import verifySeller from '../middlewares/verify.seller.js';
import { getSellerAnalyticsState } from '../controllers/analytics/sellerAnalytics.js';

const router = express.Router();

router.get('/seller', verifyUser,verifySeller,getSellerAnalyticsState);

export default router;