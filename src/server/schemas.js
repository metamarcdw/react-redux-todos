import Joi from 'joi';

export const user_schema = Joi.object({
    id: Joi.string().max(40).required(),
    name: Joi.string().alphanum().max(30).required(),
    password_hash: Joi.string().max(100).required(),
    admin: Joi.boolean().required()
});

export const new_user_schema = Joi.object({
    name: Joi.string().alphanum().min(1).max(30).required(),
    password: Joi.string().min(1).max(250).required()
});

export const todo_schema = Joi.object({
    id: Joi.number().required(),
    text: Joi.string().max(30).required(),
    complete: Joi.boolean().required()
});

export const new_todo_schema = Joi.object({
    text: Joi.string().min(1).max(30).required()
});
