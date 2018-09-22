import express from 'express';
import serialize from 'express-serializer';
import Joi from 'joi';
import passport from 'passport';

import { todos } from '../mock_db';
import { todoSerializer } from '../serializers';
import { newTodoSchema } from '../schemas';
import { findItem } from '../helpers';

const router = express.Router();
const auth = passport.authenticate('jwt', { session: false });

router.get('/todo', auth, (req, res) => {
  if (todos.length < 1) return res.status(404).json({
    msg: 'No todos found.'
  });
  const myTodos = todos.filter(t => t.user_id === req.user.id);
  serialize(req, myTodos, todoSerializer)
    .then(json => {
      res.json(json);
    }).catch(err => console.log(err));
});

router.get('/todo/:id', auth, (req, res) => {
  const { id } = req.params;
  const myTodos = todos.filter(t => t.user_id === req.user.id);
  const { item: todo } = findItem(parseInt(id), myTodos);
  if (!todo) return res.status(404).json({
    msg: 'Todo not found'
  });

  serialize(req, todo, todoSerializer)
    .then(json => {
      res.json(json);
    }).catch(err => console.log(err));
});

router.post('/todo', auth, (req, res) => {
  const { value, error } = Joi.validate(req.body, newTodoSchema);
  if (error) return res.status(400).json({
    msg: error.details[0].message
  });

  const { text } = value;
  const newTodo = {
    id: todos.length + 1,
    text,
    complete: false,
    user_id: req.user.id
  };
  todos.push(newTodo);

  serialize(req, newTodo, todoSerializer)
    .then(json => {
      res.json({ new_todo: json });
    }).catch(err => console.log(err));
});

router.put('/todo/:id', auth, (req, res) => {
  const { id } = req.params;
  const myTodos = todos.filter(t => t.user_id === req.user.id);
  const { item: todo } = findItem(parseInt(id), myTodos);
  if (!todo) return res.status(404).json({
    msg: 'Todo not found'
  });

  todo.complete = true;
  serialize(req, todo, todoSerializer)
    .then(json => {
      res.json({ completed_todo: json });
    }).catch(err => console.log(err));
});

router.delete('/todo/:id', auth, (req, res) => {
  const { id } = req.params;
  const myTodos = todos.filter(t => t.user_id === req.user.id);
  const { item: todo } = findItem(parseInt(id), myTodos);
  if (!todo) return res.status(404).json({
    msg: 'Todo not found'
  });

  todos.splice(index, 1);
  serialize(req, todo, todoSerializer)
    .then(json => {
      res.json({ deleted_todo: json });
    }).catch(err => console.log(err));
});

export default router;
