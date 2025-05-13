import PostModel from "../models/blog.js";

const Create= async (req,res)=>{
    try {
        const {title,description}=req.body;
       const imagePath = req.file.filename;

       const newPost = await PostModel({title,description,image:imagePath});
       await newPost.save()

        return res.status(200).json({sucess:true,message:"post sucessful",post:newPost})


    } catch (error) {
        return res.status(500).json({message:`error ${error.error}`})
    }
} 

const Update = async (req,res)=>{
    try {
        // const {title,description} = req.body;
        // const imagePath = req.file.filename;

        // const findPost 
    } catch (error) {
         
    } 
} 
export {Create,Update} 