// pages/api/users.js
"use server";
import { Chat } from "@/models/chat.model";
import ConnectDb from "@/models/db";
import { Message } from "@/models/message.model";
import { v2 as cloudinary } from "cloudinary";
import { User } from "@/models/user.model";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await ConnectDb();
  const users = await User.find();
  return NextResponse.json(users); // Send the users data as JSON response
}

export const getProfileUser = async (userId) => {
  try {
    await ConnectDb();
    const user = await User.findOne({ _id: userId });
    if (!user) return "user not found";
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret:process.env.SECRET, 
// });

// export const SendSnapMessage = async (content,receiverId,messageType) => {
//   try {
//     await ConnectDb();
//     const authuser = useSession();
//     const senderId = authuser.user._id;
//     let uploadRes;
//     if(messageType === 'image') {
//        uploadRes = await cloudinary.uploader.upload(content)
//     }
//     const newMessage = await Message.create({
//       senderId,
//       receiverId,
//       content: uploadRes?.secure_url || content,
//       messageType,
//     });
//     let chat = await Chat.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });
//     if (!chat) {
//       chat = await Chat.create({
//         participants: [senderId, receiverId],
//         messages: [newMessage._id],
//       });
//     } else {
//       chat.messages.push(newMessage._id);
//       await chat.save();
//     }
//     return JSON.parse(JSON.stringify(newMessage));
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export const LogoutHandler = async () => {
  try {
    await signOut();
  } catch (error) {
    console.log(error);
    throw error;
  }
  redirect("/login");
};
