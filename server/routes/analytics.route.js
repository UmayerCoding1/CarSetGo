import express from 'express';
import verifyUser from '../middlewares/verify.user.js';
import verifySeller from '../middlewares/verify.seller.js';
import { getSellerAnalyticsState } from '../controllers/analytics/sellerAnalytics.js';
import verifyAdmin from '../middlewares/verify.admin.js';
import {  getAdminAnalyticsState, getUserProfileAnalytics, trackPlatform } from '../controllers/analytics/adminAnalytics.js';

const router = express.Router();

router.get('/seller', verifyUser,verifySeller,getSellerAnalyticsState);
router.get('/admin', verifyUser,verifyAdmin,getAdminAnalyticsState);
router.get('/user/:id', verifyUser,verifyAdmin,getUserProfileAnalytics);
router.post('/track-platform',trackPlatform);

export default router;