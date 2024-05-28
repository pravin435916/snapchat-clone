import mongoose,{Schema} from "mongoose"
const chatModel = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    },
},{timestamps:true})
export const Chat = mongoose.model('Chat',chatModel);
