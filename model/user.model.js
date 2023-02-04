import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: [true, "password is required"],
    trim: true,
    minLength: 8,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (oldPassword) {
  return await bcrypt.compare(oldPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
