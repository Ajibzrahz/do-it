import Joi from "joi";

const categoryValidator = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.empty": "Category name is required",
      "string.min": "Category name must be at least 3 characters",
      "string.max": "Category name cmust not exceed 50 characters",
    }),
});

export {categoryValidator}