import mongoose from "mongoose"
const userModel = new mongoose.Schema({
    username:{
        type:String,
        // required:true,
        // unique:true
    },
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        // unique:true
    },
    photo:{
        type:String,
    },
},{timestamps:true});
export const User = mongoose?.models?.User || mongoose.model('User',userModel);
