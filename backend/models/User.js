import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profilePicture: { type: String, default: "/uploads/profile.png" }, // New field for profile picture
});

const User = mongoose.model("User", userSchema);

export default User;
