import express from 'express';
import serialize from 'express-serializer';
import Joi from 'joi';
import uuid from 'uuid/v4';

import { users } from './db';
import { userSerializer } from './serializers';
import { newUserSchema } from './schemas';

const app = express();
app.use(express.json());

function findItem(id, items, res, attr = 'id') {
  if (!id) res.status(400).send({
    msg: 'No ID given'
  });

  const index = items.map(i => i[attr]).indexOf(id);
  const item = items[index];

  if (!item) res.status(404).send({
    msg: 'ID not found'
  });
  return { item, index };
}

app.get('/user', (req, res) => {
  if (users.length < 1) return res.status(404).send({
    msg: 'No users found.'
  });

  serialize(req, users, userSerializer)
    .then(json => {
      res.send(json);
    }).catch(err => console.log(err));
});

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const { item: user } = findItem(id, users, res, 'public_id');

  if (user) serialize(req, user, userSerializer)
    .then(json => {
      res.send(json);
    }).catch(err => console.log(err));
});

app.post('/user', (req, res) => {
  const { value, error } = Joi.validate(req.body, newUserSchema);
  if (error) return res.status(400).send({
    msg: error.details[0].message
  });

  const { name, password } = value;
  const newUser = {
    id: users.length + 1,
    public_id: uuid(),
    name,
    password_hash: password,
    admin: false
  };
  users.push(newUser);

  serialize(req, newUser, userSerializer)
    .then(json => {
      res.send({ new_user: json });
    }).catch(err => console.log(err));
});

app.put('/user/:id', (req, res) => {
  const { id } = req.params;
  const { item: user } = findItem(id, users, res, 'public_id');
  user.admin = true;

  if (user) serialize(req, user, userSerializer)
    .then(json => {
      res.send({ promoted_user: json });
    }).catch(err => console.log(err));
});

app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  const { item: user, index } = findItem(id, users, res, 'public_id');
  users.splice(index, 1);

  if (user) serialize(req, user, userSerializer)
    .then(json => {
      res.send({ deleted_user: json });
    }).catch(err => console.log(err));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
