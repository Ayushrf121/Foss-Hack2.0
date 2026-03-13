import express from 'express'
import {signup,login} from '../controllers/AuthController.js'
import {signupValidation,loginValidation} from '../middleware/AuthValidation.js'
import { googleAuth } from '../controllers/AuthController.js';
const router = express.Router();

router.post('/signup',signupValidation,signup);
router.post('/login',loginValidation,login);
router.post('/google',googleAuth);
export default router;