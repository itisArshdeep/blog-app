import express from 'express'
import dotenv from 'dotenv'
import connectDB from './utils/db.js';
import authRoute from './routes/auth.js';
import cookieParser from 'cookie-parser';
import BlogsRoutes from './routes/blogs.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT||4000

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
connectDB();
app.get("/",(req,res)=>{
    res.send("home page")
})

app.use('/auth',authRoute)
app.use('/blogs',BlogsRoutes)

app.listen(PORT,()=>{
    console.log(`app is listening at port ${PORT}`);
})