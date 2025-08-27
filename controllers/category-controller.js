import { StatusCodes } from "http-status-codes";
import categoryModel from "../models/category.js";
import {
  customApiError,
  notFoundError,
  unauthenticatedError,
} from "../errors/index.js";

const createCategory = async (req, res, next) => {
  const { name } = req.body;
  const { role } = req.user;
  if (role !== "admin") {
    const err = new unauthenticatedError("Only Admin can create category");
    return next(err);
  }
  try {
    const isExisting = await categoryModel.findOne({
      name: name.toLowerCase(),
    });
    if (isExisting) {
      const err = new customApiError("Category already exists");
      err.statusCode = StatusCodes.CONFLICT;
      return next(err);
    }

    const category = new categoryModel({ name: name.toLowerCase() });
    const saveCategory = await category.save();

    res
      .status(StatusCodes.CREATED)
      .json({ msg: "created", name: saveCategory.name });
  } catch (error) {
    return next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const { name } = req.query;
  const { role } = req.user;
  if (role !== "admin") {
    const err = new unauthenticatedError("Only admin can delete category");
    return next(err);
  }

  try {
    const category = await categoryModel.findOne({ name: name.toLowerCase() });
    if (!category) {
      const err = new notFoundError("category does not exist");
      return next(err);
    }

    await categoryModel.findOneAndDelete({ name: name.toLowerCase() });

    return res.status(StatusCodes.OK).json({ msg: "category deleted" });
  } catch (error) {
    return next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const category = await categoryModel.find().select("-_id name");
    return res
      .status(StatusCodes.OK)
      .json({ totalcategories: category.length, category });
  } catch (error) {
    return next(error);
  }
};
export { createCategory, deleteCategory, getCategories };
