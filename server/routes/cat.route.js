import express from 'express';
import { generateCarDescription, getCarByCategory, getCarById, getCars, postCar } from '../controllers/car.controller.js';
import verifyUser from '../middlewares/verify.user.js';
import verifySeller from '../middlewares/verify.seller.js';
import verifyFrontendOnly from '../middlewares/verifyFrontendOnly.middleware.js';
import {upload} from '../middlewares/multer.middleware.js';
const router = express.Router();


router.get('/cars', verifyFrontendOnly, getCars);
router.get('/car/:id', getCarById);
router.get('/car-by-category/:category', getCarByCategory);

router.post('/add-car',verifyUser, verifySeller, postCar);

router.post('/generate-car-description',verifyUser, verifySeller,upload.single('carImage'), generateCarDescription);



export default router;