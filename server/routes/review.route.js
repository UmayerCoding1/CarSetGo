import express from 'express';
import { createReview, deleteReview, getReviews } from '../controllers/review.controller.js';
import verifyUser from '../middlewares/verify.user.js';
const router = express.Router();


router.post('/:carId',verifyUser, createReview);
router.get('/car/:carId', getReviews);
router.delete('/car/:carId',verifyUser, deleteReview);

export default router;