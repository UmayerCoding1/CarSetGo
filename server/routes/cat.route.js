import express from 'express';
import { getCarByCategory, getCarById, getCars, postCar } from '../controllers/car.controller.js';
import verifyUser from '../middlewares/verify.user.js';
import verifySeller from '../middlewares/verify.seller.js';
import verifyFrontendOnly from '../middlewares/verifyFrontendOnly.middleware.js';
const router = express.Router();


router.get('/cars', verifyFrontendOnly, getCars);
router.get('/car/:id', getCarById);
router.get('/car-by-category/:category', getCarByCategory);

router.post('/add-car',verifyUser, verifySeller, postCar);


export default router;