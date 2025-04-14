const Joi = require("joi");

exports.userRegisterValidation = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
});
