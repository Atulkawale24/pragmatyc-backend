const Joi = require("joi");

exports.updateTodoValidation = Joi.object().keys({
  id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
});
