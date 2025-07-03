import express from 'express';
import { getAllUsers, googleLogin, logdinUser, logout, updateUserRole, uploadAvatar, userLogin, userRegister } from '../controllers/auth.controller.js';
import verifyUser from '../middlewares/verify.user.js';
import verifyAdmin from '../middlewares/verify.admin.js';
import { upload } from '../middlewares/multer.middleware.js';
import verifyFrontendOnly from '../middlewares/verifyFrontendOnly.middleware.js';
const router = express.Router();

router.get('/users',verifyUser,verifyAdmin,getAllUsers);
router.get('/google-login',googleLogin);
router.get('/logdin-user',verifyUser,logdinUser);
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/logout',verifyUser,logout)
router.post('/upload-avatar',verifyUser,upload.single('avatar'),uploadAvatar);
router.put('/update-role/:userId',verifyUser,verifyAdmin,updateUserRole);


export default router;