const Joi = require("joi");
exports.loginValidation = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
});
