import { StatusCodes } from "http-status-codes";
import {
  customApiError,
  notFoundError,
  unauthenticatedError,
} from "../errors/index.js";
import userModel from "../models/user.js";
import sendMail from "../utils/sendgrid.js";
import bcrypt from "bcryptjs";

const register = async (req, res, next) => {
  const payload = req.body;
  try {
    const isExisting = await userModel.findOne({ email: payload.email });
    if (isExisting) {
      const err = new customApiError("Email Already exist, LOGIN!!");
      err.statusCode = StatusCodes.CONFLICT;
      return next(err);
    }

    const createUser = new userModel(payload);
    const saveUser = await createUser.save();

    const token = saveUser.generate();

    sendMail({
      to: payload.email,
      from: "ajibonaraheem@gmail.com",
      subject: "Welcome to Task-Manager🎉🎉",
      text: "This is a site where you can set your to do. It's going to be really helpful.",
      html: "<h1><strong>Thanks for signing up</strong></h1><p style='font-size: 18px;'>You have taken a step in making your life a better one. This is just the beginning of great things. welcome!!!</p>",
    });

    return res
      .cookie("userToken", token, {
        maxAge: 1000 * 60 * 60 * 12,
        httpOnly: true,
        secure: true,
      })
      .status(StatusCodes.CREATED)
      .json({ msg: "Account Created", token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const payload = req.body;
  try {
    const user = await userModel.findOne({ email: payload.email });
    if (!user) {
      const err = new notFoundError("User not found");
      return next(err);
    }
    const comparePassword = bcrypt.compareSync(payload.password, user.password);
    if (!comparePassword) {
      const err = new unauthenticatedError("Incorrect Email or Password");
      return next(err);
    }

    const token = user.generate();

    return res
      .cookie("userToken", token, {
        maxAge: 1000 * 60 * 60 * 12,
        httpOnly: true,
        secure: true,
      })
      .status(StatusCodes.OK)
      .json({
        msg: `Welcome Back ${user.username}❤️`,
        username: user.username,
      });
  } catch (error) {
    next(error);
  }
};

const Profile = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      const err = new notFoundError("user does not exist");
      return next(err);
    }

    return res.status(StatusCodes.OK).json({ PROFILE: user });
  } catch (error) {
    return next(err);
  }
};

const deleteProfile = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      const err = new notFoundError("user does not exist");
      return next(err);
    }

    await userModel.findByIdAndDelete(id);

    sendMail({
      to: user.email,
      from: "ajibonaraheem@gmail.com",
      subject: "Your Task-Manager account has been deleted.",
      text: "Your account has been deleted",
      html: "<h1><strong>Thanks for your time</strong></h1><p>You have successfully deleted your account</p>",
    });

    return res.status(StatusCodes.OK).json({ msg: "deleted" });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const { id } = req.user;
  const payload = req.body;

  try {
    const user = await userModel.findById(id);
    if (!user) {
      const err = new notFoundError("user not found");
      return next(err);
    }
    if (payload.email) {
      if (payload.email === user.email) {
        const err = new customApiError("Email did not change");
        err.statusCode = StatusCodes.CONFLICT;
        return next(err);
      }

      const existingEmail = await userModel.findOne({ email: payload.email });
      if (existingEmail) {
        const err = new customApiError("Email already exist");
        err.statusCode = StatusCodes.CONFLICT;
        return next(err);
      }
    }
    const update = await userModel
      .findByIdAndUpdate(id, payload, {
        new: true,
      })
      .select("-password -_id -createdAt -updatedAt -__v");

    if (payload.email) {
      sendMail({
        to: [payload.email, user.email],
        from: "ajibonaraheem@gmail.com",
        subject: "Your Task-Manager profile has been updated.",
        text: "Your profile has been updated successfully.",
        html: `<h1><strong>Update alert</strong></h1><p>Your email has been updated from ${user.email} to ${payload.email}</p>`,
      });
    }

    return res
      .status(StatusCodes.OK)
      .json({ msg: "profile has been updated succesfully", update });
  } catch (error) {
    return next(error);
  }
};

export { register, login, Profile, deleteProfile, updateProfile };
