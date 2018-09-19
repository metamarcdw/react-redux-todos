import Joi from 'joi';

export const newUserSchema = Joi.object({
  name: Joi.string().alphanum().min(1).max(30).required(),
  password: Joi.string().min(1).max(250).required()
});

export const newTodoSchema = Joi.object({
  text: Joi.string().min(1).max(30).required()
});
