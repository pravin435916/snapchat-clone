import mongoose from "mongoose";
const chatModel = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type:[ mongoose.Schema.Types.ObjectId],
        ref: 'Message',
        default:[]
    }],
}, { timestamps: true });

export const Chat = mongoose.models.Chat || mongoose.model('Chat', chatModel);
