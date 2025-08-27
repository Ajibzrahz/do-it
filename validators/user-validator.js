import Joi from "joi";

const RegisterValidator = Joi.object({
  username: Joi.string()
    .min(6)
    .max(25)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9_@-]+$"))
    .messages({
      "any.required": "username is required",
      "string.min": "username cannot be less than 5 characters",
      "string.max": "username must be less than 25 characters",
      "string.pattern.base":
        "user name can only contain (_-@) special characters",
    }),
  email: Joi.string()
    .email({
      tlds: { allow: ["com", "ng", "edu", "net"] },
      minDomainSegments: 2,
    })
    .required()
    .messages({
      "any.required": "email is required",
      "string.email": "invalid Email format",
    }),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!~#$&])[a-zA-Z0-9@!~#$*]{8,16}$"
      )
    )
    .messages({
      "any.required": "password is required",
      "string.pattern.base":
        "Password must be 8-16 characters, include upper & lowercase, a number, and a special symbol (@!~#$&)",
    }),
  repeat_password: Joi.valid(Joi.ref("password")).required().messages({
    "any.only": "Password does not match",
    "any.required": "repeat_password is required",
  }),
  role: Joi.string().valid("user", "admin").messages({
    "any.only": "category can only be either one of admin or user",
  }),
});

const loginValidator = Joi.object({
  email: Joi.string()
    .email({
      tlds: { allow: ["com", "ng", "edu", "net"] },
      minDomainSegments: 2,
    })
    .required()
    .messages({
      "any.required": "email is required",
      "string.email": "invalid Email format",
    }),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!~#$&])[a-zA-Z0-9@!~#$*]{8,16}$"
      )
    )
    .messages({
      "any.required": "password is required",
      "string.pattern.base":
        "Password must be 8-16 characters, include upper & lowercase, a number, and a special symbol (@!~#$&)",
    }),
});

const updateValidator = Joi.object({
  username: Joi.string()
    .min(6)
    .max(25)
    .pattern(new RegExp("^[a-zA-Z0-9_@-]+$"))
    .messages({
      "string.min": "username cannot be less than 5 characters",
      "string.max": "username must be less than 25 characters",
      "string.pattern.base":
        "user name can only contain (_-@) special characters",
    }),
  email: Joi.string()
    .email({
      tlds: { allow: ["com", "ng", "edu", "net"] },
      minDomainSegments: 2,
    })
    .messages({
      "string.email": "invalid Email format",
    }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!~#$&])[a-zA-Z0-9@!~#$*]{8,16}$"
      )
    )
    .messages({
      "string.pattern.base":
        "Password must be 8-16 characters, include upper & lowercase, a number, and a special symbol (@!~#$&)",
    }),
});

export { RegisterValidator, loginValidator, updateValidator };
