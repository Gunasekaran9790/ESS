import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }, // or "super-admin"
  isBlocked: { type: Boolean, default: false },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);