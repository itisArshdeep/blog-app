import userModel from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
        console.log(req.file);
        const hashPas = bcrypt.hashSync(password,10);
        const imagePath = req.file.filename;
        const newUser= new userModel({username,email,password:hashPas,profile:imagePath});
        await newUser.save();
        return res.status(200).json({sucess:"true",message:"user registered"})
    } catch (error) {
        
            return res.status(500).json({success:"false",message:"internal server error",error:error.message})
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Required fields" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id},
            process.env.JWT_SECRET,
        );
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            maxAge:3*24*60*60*1000,
        })

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profile: user.profile
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

const logout = async (req,res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({success: true,message: "Logout successful",})
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}


export {register,login,logout}