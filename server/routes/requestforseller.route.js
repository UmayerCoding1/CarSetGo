import express from 'express';
import verifyUser from '../middlewares/verify.user.js';
import { getRequestToSeller, updateRoleToRequest } from '../controllers/requestforseller.controller.js';
import verifyAdmin from '../middlewares/verify.admin.js';
const router = express.Router();


router.post('/seller-request',verifyUser, getRequestToSeller );
router.put('/confirm-seller-request', verifyUser, verifyAdmin, updateRoleToRequest);


export default router;