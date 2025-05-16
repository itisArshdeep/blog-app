import express from 'express';
import {Create, DeletePost, getPosts, update} from '../controllers/Blogs.js'
import { isAdmin } from '../middleware/isAdmin.js';
import { upload } from '../middleware/Multer.js';

const BlogsRoutes=express.Router();

BlogsRoutes.post('/create',isAdmin,upload.single('postImage'),Create)
BlogsRoutes.delete('/delete/:id',isAdmin,DeletePost)
BlogsRoutes.patch('/update/:id',isAdmin,upload.single('postImage'),update)
BlogsRoutes.get('/all',getPosts)

export default BlogsRoutes