import express from 'express';
import { analyzeCarImage, deleteSellerCarById, generateCarDescription, getCarByCategory, getCarById, getCars, getCarsBySeller, postCar, updateCarById, } from '../controllers/car.controller.js';
import verifyUser from '../middlewares/verify.user.js';
import verifySeller from '../middlewares/verify.seller.js';
import verifyFrontendOnly from '../middlewares/verifyFrontendOnly.middleware.js';
import {upload} from '../middlewares/multer.middleware.js';
const router = express.Router();


router.get('/cars', getCars);
router.get('/car/:id', getCarById);
router.get('/cars/category/:category',verifyFrontendOnly, getCarByCategory);
router.get('/cars/seller/:sellerId', getCarsBySeller); // Assuming this is the same as category for seller
router.post('/cars/image-search', verifyFrontendOnly, upload.single('carImage'), analyzeCarImage);
router.post('/cars',verifyUser, verifySeller,upload.array('carimages',15), postCar);
router.put('/cars', verifyUser,verifySeller,updateCarById);
router.post('/cars/generate-description',verifyUser, verifySeller,verifyFrontendOnly, upload.single('carImage'), generateCarDescription);
router.delete('/cars/delete/:carId/:sellerId', verifyUser,verifySeller,deleteSellerCarById)



export default router;