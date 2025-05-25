import express from 'express';
import { generateCarDescription, getCarByCategory, getCarById, getCars, getCarsBySeller, postCar, } from '../controllers/car.controller.js';
import verifyUser from '../middlewares/verify.user.js';
import verifySeller from '../middlewares/verify.seller.js';
import verifyFrontendOnly from '../middlewares/verifyFrontendOnly.middleware.js';
import {upload} from '../middlewares/multer.middleware.js';
const router = express.Router();


router.get('/cars', verifyFrontendOnly, getCars);
router.get('/car/:id', getCarById);
router.get('/car-by-category/:category',verifyFrontendOnly, getCarByCategory);
router.get('/car-by-seller/:sellerId', getCarsBySeller); // Assuming this is the same as category for seller
router.post('/add-car',verifyUser, verifySeller,verifyFrontendOnly, postCar);

router.post('/generate-car-description',verifyUser, verifySeller,verifyFrontendOnly, upload.single('carImage'), generateCarDescription);




export default router;