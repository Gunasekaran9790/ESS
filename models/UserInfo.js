import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  phone: {
    type: String,
    required: true,
    //match: [/^[0-9]{10}$/, "Phone must be 10 digits"],
  },
},
{ 
    collection: "UserInfo"
 }  // 👈 custom name
);

export default mongoose.models.UserInfo || mongoose.model("UserInfo", UserInfoSchema);
