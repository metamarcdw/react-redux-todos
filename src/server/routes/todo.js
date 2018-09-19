import express from 'express';
import serialize from 'express-serializer';
import Joi from 'joi';

import { todos } from '../db';
import { todoSerializer } from '../serializers';
import { newTodoSchema } from '../schemas';
import { findItem } from '../helpers';

const router = express.Router();

router.get('/todo', (req, res) => {
  if (todos.length < 1) return res.status(404).send({
    msg: 'No todos found.'
  });

  serialize(req, todos, todoSerializer)
    .then(json => {
      res.send(json);
    }).catch(err => console.log(err));
});

router.get('/todo/:id', (req, res) => {
  const { id } = req.params;
  const { item: todo } = findItem(parseInt(id), todos);
  if (!todo) return res.status(404).send({
    msg: 'Todo not found'
  });

  serialize(req, todo, todoSerializer)
    .then(json => {
      res.send(json);
    }).catch(err => console.log(err));
});

router.post('/todo', (req, res) => {
  const { value, error } = Joi.validate(req.body, newTodoSchema);
  if (error) return res.status(400).send({
    msg: error.details[0].message
  });

  const { text } = value;
  const newTodo = {
    id: todos.length + 1,
    text,
    complete: false,
    user_id: 1
  };
  todos.push(newTodo);

  serialize(req, newTodo, todoSerializer)
    .then(json => {
      res.send({ new_todo: json });
    }).catch(err => console.log(err));
});

router.put('/todo/:id', (req, res) => {
  const { id } = req.params;
  const { item: todo } = findItem(parseInt(id), todos);
  if (!todo) return res.status(404).send({
    msg: 'Todo not found'
  });

  todo.complete = true;
  serialize(req, todo, todoSerializer)
    .then(json => {
      res.send({ completed_todo: json });
    }).catch(err => console.log(err));
});

router.delete('/todo/:id', (req, res) => {
  const { id } = req.params;
  const { item: todo, index } = findItem(parseInt(id), todos);
  if (!todo) return res.status(404).send({
    msg: 'Todo not found'
  });

  todos.splice(index, 1);
  serialize(req, todo, todoSerializer)
    .then(json => {
      res.send({ deleted_todo: json });
    }).catch(err => console.log(err));
});

export default router;
