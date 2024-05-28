// pages/api/users.js

import ConnectDb from "@/models/db";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await ConnectDb();
  const users = await User.find();
  return NextResponse.json(users); // Send the users data as JSON response
}
