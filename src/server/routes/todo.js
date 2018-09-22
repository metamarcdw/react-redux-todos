import express from 'express';
import serialize from 'express-serializer';
import Joi from 'joi';
import passport from 'passport';

import { Todo } from '../models';
import { todoSerializer } from '../serializers';
import { newTodoSchema } from '../schemas';

const router = express.Router();
const auth = passport.authenticate('jwt', { session: false });

async function getMyTodos(myId) {
  return await Todo.findAll({
    where: { user_id: myId },
    attributes: {
      exclude: ['userId']
    }
  });
}

router.get('/todo', auth, async (req, res) => {
  const myTodos = await getMyTodos(req.user.id);
  if (myTodos.length < 1)
    return res.status(404).json({ msg: 'No todos found.' });
  res.json(await serialize(req, myTodos, todoSerializer));
});

router.get('/todo/:id', auth, async (req, res) => {
  const myTodos = await getMyTodos(req.user.id);
  const id = parseInt(req.params.id);
  const todo = myTodos.find(t => t.id === id);
  if (!todo)
    return res.status(404).json({ msg: 'Todo not found' });

  res.json(await serialize(req, todo, todoSerializer));
});

router.post('/todo', auth, async (req, res) => {
  const { value, error } = Joi.validate(req.body, newTodoSchema);
  if (error)
    return res.status(400).json({ msg: error.details[0].message });

  const { text } = value;
  const newTodo = await Todo.create({
    text,
    complete: false,
    user_id: req.user.id
  });
  res.json({
    new_todo: await serialize(req, newTodo, todoSerializer)
  });
});

router.put('/todo/:id', auth, async (req, res) => {
  const myTodos = await getMyTodos(req.user.id);
  const id = parseInt(req.params.id);
  const todo = myTodos.find(t => t.id === id);
  if (!todo)
    return res.status(404).json({ msg: 'Todo not found' });

  todo.complete = true;
  await todo.save();
  res.json({
    completed_todo: await serialize(req, todo, todoSerializer)
  });
});

router.delete('/todo/:id', auth, async (req, res) => {
  const myTodos = await getMyTodos(req.user.id);
  const id = parseInt(req.params.id);
  const todo = myTodos.find(t => t.id === id);
  if (!todo)
    return res.status(404).json({ msg: 'Todo not found' });

  await todo.destroy();
  res.json({
    deleted_todo: await serialize(req, todo, todoSerializer)
  });
});

export default router;
