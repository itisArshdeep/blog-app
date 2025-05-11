import mongoose from "mongoose";

const connectDB = async ()=>{
try {
    mongoose.connect(process.env.MONGO_URI)
    console.log("CONNECTED WITH DB");
    
} catch (error) {
    console.log("ERROR IN DB",error);
    
}
}
export default connectDB;