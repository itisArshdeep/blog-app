import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
    },
},{timestamps:true})

const PostModel  = mongoose.model("Posts",postSchema)

export default PostModel;