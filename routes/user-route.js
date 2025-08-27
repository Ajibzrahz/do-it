import express from "express";
import {
  deleteProfile,
  login,
  register,
  updateProfile,
} from "../controllers/user-controller.js";
import validateRequest from "../middlewares/validator.js";
import {
  loginValidator,
  RegisterValidator,
  updateValidator,
} from "../validators/user-validator.js";
import Authentication from "../middlewares/auth.js";
import { Profile } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter
  .route("/register")
  .post(validateRequest(RegisterValidator), register);
userRouter.route("/login").post(validateRequest(loginValidator), login);
userRouter
  .route("/profile")
  .get(Authentication, Profile)
  .delete(Authentication, deleteProfile)
  .put(Authentication, validateRequest(updateValidator), updateProfile);

export default userRouter;
