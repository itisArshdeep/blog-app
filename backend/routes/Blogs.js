import express from 'express';
import {Create} from '../controllers/Blogs.js'
import { isAdmin } from '../middleware/isAdmin.js';
import { upload } from '../middleware/Multer.js';

const BlogsRoutes=express.Router();

BlogsRoutes.post('/create',isAdmin,upload.single('postImage'),Create)

export default BlogsRoutes