import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your username"],
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiryDate: Date,
  verifyToken: String,
  verifyTokenExpiryDate: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
