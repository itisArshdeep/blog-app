import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
})

const userModel = mongoose.model('Users',userSchema);
export default userModel;