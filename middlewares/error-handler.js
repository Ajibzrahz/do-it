import Joi from "joi";
import {customApiError} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
const errorMiddleware = (err, req, res, next) => {
  console.log(err)
  if (err instanceof customApiError) {
    res.status(err.statusCode).json({ msg: err.message });
  }
  if (Joi.isError(err)) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }

  res.status(500).json({ msg: "something went wrong, Try again" });
};
export default errorMiddleware;
