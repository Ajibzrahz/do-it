import Joi from "joi";

const TaskValidator = Joi.object({
  title: Joi.string().max(50).required().messages({
    "any.required": "title of task is required",
    "string.max": "title must not exceed 50 characters",
  }),
  description: Joi.string().max(255).messages({
    "string.max": "description cannot exceed 255 characters",
  }),
  deadline: Joi.date().required().messages({
    "any.required": "deadline field is required",
  }),
  status: Joi.string()
    .valid("in-progress", "completed", "in-completed")
    .messages({
      "any.only":
        "category can only be either one of in-progress, completed, not-completed",
    }),
});

const updateTaskValidator = Joi.object({
  title: Joi.string().max(50).messages({
    "string.max": "title must not exceed 50 characters",
  }),
  description: Joi.string().max(255).messages({
    "string.max": "description cannot exceed 255 characters",
  }),
  category: Joi.string()
    .valid("work", "school", "personal")
    .messages({
      "any.only": "category can only be either one of work, school, prersonal",
    }),
  deadline: Joi.date().messages({

  }),
  status: Joi.string()
    .valid("in-progress", "completed", "in-completed")
    .messages({
      "any.only":
        "category can only be either one of in-progress, completed, not-completed",
    }),
});

export { TaskValidator, updateTaskValidator };
