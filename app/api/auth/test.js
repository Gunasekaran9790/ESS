import dbConnect from "@/utils/dbConnect";
//import User from "@/models/User"; // assuming you have a User model

export default async function handler(req, res) {
  await dbConnect(); // connect once

  const users = await User.find(); // do DB stuff
  res.status(200).json(users);
}