import PostModel from "../models/blog.js";
import path from 'path';
import fs from 'fs';
import { error } from "console";

const Create = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imagePath = req.file?.filename;

    if (!title || !description || !imagePath) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newPost = new PostModel({
      title,
      description,
      image: imagePath
    });

    await newPost.save();

    return res.status(200).json({
      success: true,
      message: "Post created successfully",
      post: newPost
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


const DeletePost = async (req,res)=>{
    try {
        const postId = req.params.id;

        const FindPost = await PostModel.findById(postId)
        console.log(FindPost,"post");
        
        if(!FindPost){
            return res.status(404).json({sucess:false,message:"Post didnt found"});
        } 
        if(FindPost.image){
            const profilePath = path.join('public/images',FindPost.image)
            fs.promises.unlink(profilePath)
            .then(()=>console.log('post image deleted as well')
            ).catch(error => console.log("post deletion unsuccess")
            ); 
        } 
        const deletedPost = await PostModel.findByIdAndDelete(postId);   

        return res.status(200).json({sucess:true,message:"deleted post successfully"});

    } catch (error) {
         console.log(error);
         return res.status(500).json({sucess:false,message:"internal server error"})
    }  
} 


const update = async (req,res)=>{
    try {
        const {title,description} = req.body;
        const imagePath = req.file?.filename;
    
        const postId = req.params.id;
    
        const post = await PostModel.findById(postId);
    // console.log(post,"hjjjiij");
    
         if(!post){
                return res.status(404).json({sucess:false,message:"Post didnt found"});
            }
           if(title){
            post.title = title;
           }
           if(description){
            post.description = description;
           }
           if(imagePath){
            post.image = imagePath;
           }
           await post.save()
    
            
            return res.status(200).json({sucess:true,message:"post updated successfully"});
    } catch (error) {
        
         console.log(error);
         return res.status(500).json({sucess:false,message:"internal server error"})
    }
}



const getPosts =async(req,res)=>{
    const posts = await PostModel.find();
    if(!posts){
         return res.status(404).json({sucess:false,message:"Post didnt found"});
    }
    return res.status(200).json({sucess:true,message:"post found successfully",posts});
}
export {Create,DeletePost,update,getPosts}  