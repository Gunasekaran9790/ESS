import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { NextResponse } from 'next/server';


//export default async function handler(req, res) {
  export async function POST(req) {
  //if (req.method !== "POST") return res.status(405).end();
  //const { email, password } = await req.json();
  const body = await req.json();
  const { email, password } = body;

  await dbConnect();

  const useracess = await User.findOne({ email });
    if (!useracess){
    return new Response(JSON.stringify({ message:"Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const valid = await bcrypt.compare(password, useracess.password);
  if (!valid){
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  } 
  //return res.status(401).json({ error: "Invalid credentials" });

  /*const token = jwt.sign(
    { id: useracess._id, email: useracess.email, role: useracess.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );*/

  // Generate simple random token
  const token = crypto.randomBytes(32).toString("hex");
  return new Response(JSON.stringify({ token,email }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}


export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return NextResponse.json({ users });
}
