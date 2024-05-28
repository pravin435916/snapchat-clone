// pages/api/users.js
'use server'
import ConnectDb from "@/models/db";
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
    const user = await User.findOne({_id:userId});
    if(!user ) return 'user not found';
    return user
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export const LogoutHandler = async () => {
  try {
    await signOut();
  } catch (error) {
    console.log(error);
    throw error;
  }
  redirect('/login');
}
