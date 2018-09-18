import Joi from 'joi';
import { users } from './db';
import { new_user_schema } from './schemas';

import express from 'express';
const app = express();
app.use(express.json());

function findItem(id, items, res) {
  if (!id || id < 1) res.status(400).send({
    msg: 'Bad ID given'
  });
  const item = items.find(i => i.id === parseInt(id));
  if (!item) res.status(404).send({
    msg: 'ID not found'
  });
  return item;
}

app.get('/user', (req, res) => {
  if (users.length < 1) return res.status(404).send({
    msg: 'No users found.'
  });
  res.send(users);
});

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const user = findItem(id, users, res);
  if (user) res.send(user);
});

app.post('/user', (req, res) => {
  const { value, error } = Joi.validate(req.body, new_user_schema);
  if (error) return res.status(400).send({
    msg: error.details[0].message
  })
  
  res.send({ new_user: value })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
