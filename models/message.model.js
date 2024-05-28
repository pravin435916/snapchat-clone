import mongoose,{Schema} from "mongoose"
const messageModel = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    recieverId:{
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
export const Message = mongoose.model('Message',messageModel);
