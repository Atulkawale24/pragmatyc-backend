const Joi = require("joi");

exports.todoValidation = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
