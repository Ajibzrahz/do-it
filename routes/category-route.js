import express from "express";
import validateRequest from "../middlewares/validator.js";
import { categoryValidator } from "../validators/category-validator.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controllers/category-controller.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(validateRequest(categoryValidator), createCategory)
  .delete(deleteCategory)
  .get(getCategories);

export default categoryRouter;
