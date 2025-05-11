import userModel from "../models/user.js";
import jwt from 'jsonwebtoken';

const register = async (req,res)=>{
    try { 
        const {username,email,password}=req.body;

        if(!username||!email||!password){
            return res.status(400).json({"success":"false","message":"required fileds"})
        }
        const exists =await userModel.findOne({email});

        if(exists){
            return res.status(400).json({sucess:"false",message:"user already exists"})
        }

        const newUser= new userModel({username,email,password});
        await newUser.save();
        return res.status(200).json({sucess:"true",message:"user registered"})
    } catch (error) {
        
            return res.status(500).json({success:"false",message:"internal server error",error:error.message})
    }
}


// const login = async (req,res)=>{

//         const {email,password}= req.body;

//         if(!email||!password){
//             return res.status(400).json({"success":"false","message":"required fileds"})
//         }
//         const exists = await userModel.findOne({email})
//         if(!exists){
//             return res.status(400).json({"success":"false","message":"invalid credentials"})
//         }

         
// }

export {register}