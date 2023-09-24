import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    company: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;