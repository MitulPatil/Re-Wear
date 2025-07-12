import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  points: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);
