import express from 'express';
import { register } from '../controllers/Auth.js';
const authRoute = express.Router();

authRoute.post('/register',register)

export default authRoute;