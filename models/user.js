import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 5,
      maxLength: 25,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    task: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.generate = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
