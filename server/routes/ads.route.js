import express from 'express';
import verifyUser from '../middlewares/verify.user.js';
import { upload } from '../middlewares/multer.middleware.js';
import verifySeller from '../middlewares/verify.seller.js';
import { postAds, uploadProductImage } from '../controllers/add.controller.js';
const router = express.Router();

router.post('/ads', verifyUser,verifySeller , postAds);
router.post('/ads/image',upload.single('image'), verifyUser,verifySeller , uploadProductImage);

export default  router;