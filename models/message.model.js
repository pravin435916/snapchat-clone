import mongoose from "mongoose"
const messageModel = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
        required:true,
    },
    messageType:{
        type:String,
        required:true,
        enum:['text','image']
    }
},{timestamps:true})
// export const Message = mongoose.model('Message',messageModel);
export const Message = mongoose.models.Message || mongoose.model('Message', messageModel);