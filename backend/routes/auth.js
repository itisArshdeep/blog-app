import express from 'express';
import { login, logout, register } from '../controllers/Auth.js';
import { upload } from '../middleware/Multer.js';

const authRoute = express.Router();

authRoute.post('/register',upload.single('profile'),register)
authRoute.post('/login',login)
authRoute.post('/logout',logout)

export default authRoute;           