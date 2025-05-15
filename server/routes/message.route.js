import express from 'express';
import verifyUser from '../middlewares/verify.user.js';
import { getMessage, sendMessage } from '../controllers/message.controller.js';

const router= express.Router();

router.post('/send-message/:id', verifyUser, sendMessage);
router.get('/message/:id', verifyUser, getMessage);

export default router;