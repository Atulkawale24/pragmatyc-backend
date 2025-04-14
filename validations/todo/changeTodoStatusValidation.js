const Joi = require("joi");

exports.todoStatusValidation = Joi.object().keys({
  id: Joi.string().required(),
  status: Joi.string().required(),
});
