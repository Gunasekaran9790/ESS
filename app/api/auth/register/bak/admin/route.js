import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const body = await request.json();
  const { email, password, role } = body;

  await dbConnect();

  const userExists = await User.findOne({ email });
  if (userExists) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    role: role || "user",
  });

  return new Response(JSON.stringify({ message: "User created" }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
