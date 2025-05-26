import express from 'express';
import { googleLogin, logdinUser, logout, uploadAvatar, userLogin, userRegister } from '../controllers/auth.controller.js';
import verifyUser from '../middlewares/verify.user.js';
import { upload } from '../middlewares/multer.middleware.js';
import verifyFrontendOnly from '../middlewares/verifyFrontendOnly.middleware.js';
const router = express.Router();


router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/google-login',googleLogin);
router.post('/logout',verifyUser,logout)
router.post('/upload-avatar',verifyUser,upload.single('avatar'),uploadAvatar);
router.get('/logdin-user',verifyUser,logdinUser);


export default router;