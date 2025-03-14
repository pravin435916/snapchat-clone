"use server";
import { Chat } from "./chat.model";
import ConnectDb from "./db";
import { Message } from "./message.model";

export const SendSnapMessage = async (
  content,
  senderId,
  receiverId,
  messageType
) => {
  try {
    await ConnectDb();
    const newMessage = await Message.create({
        senderId,
        receiverId,
        content,
        messageType,
    });
    let chat = await Chat.findOne({
        participants: { $all: [senderId, receiverId] },
    });
    // if (!chat) {
        chat = await Chat.create({
            participants: [senderId, receiverId],
            messages: [newMessage._id],
        });
    // } else {
        // chat.messages.push(newMessage._id)
    //     await chat.save();
    // }
    await chat.save()
    return JSON.parse(JSON.stringify(newMessage));
} catch (error) {
    console.error("Error sending message:", error);
    throw error; // Re-throw the error for handling in the calling function
}
};

export const FetchMessages = async (senderId, receiverId) => {
  try {
    await ConnectDb();
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 }); // Sort messages by creation time
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};


export const ClearChat = async (senderId, receiverId) => {
  try {
    await ConnectDb();

    // Find the chat between the users
    const chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      throw new Error("Chat not found");
    }

    // Delete all messages related to the chat
    await Message.deleteMany({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    // Clear the messages array in the chat document
    chat.messages = [];
    await chat.save();

    return { success: true, message: "Chat cleared successfully" };
  } catch (error) {
    console.error("Error clearing chat:", error);
    throw error;
  }
};