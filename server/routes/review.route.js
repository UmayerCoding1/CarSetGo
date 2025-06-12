import express from 'express';
import { createReview, deleteReview, getReviews, updateReview } from '../controllers/review.controller.js';
import verifyUser from '../middlewares/verify.user.js';
const router = express.Router();


router.post('/:carId',verifyUser, createReview);
router.get('/:carId', getReviews);
router.put('/:reviewId',verifyUser, updateReview);
router.delete('/:reviewId',verifyUser, deleteReview);

export default router;