import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';


const isAdmin=async(req,res,next)=>{
try {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).status({sucess:"false",message:"login first"})
    }
    console.log(token);
    
    const decoded = jwt.decode(token,process.env.JWT_SECRET);
    const FindUser = await userModel.findById(decoded.userId);
    
    if(!FindUser){
        return res.status(500).status({"sucess":"false","message":"internal server error"});
    }
    next();
  
} catch (error) {
    return res.status(500).status({success:"false",error:error.error})
} 
}

export {isAdmin};