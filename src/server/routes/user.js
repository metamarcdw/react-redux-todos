import express from 'express';
import serialize from 'express-serializer';
import Joi from 'joi';
import { UniqueConstraintError } from 'sequelize/lib/errors';
import passport from 'passport';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';

import { User } from '../models';
import { userSerializer } from '../serializers';
import { newUserSchema } from '../schemas';

const auth = passport.authenticate('jwt', { session: false });
const router = express.Router();

function requireAdmin (req, res, next) {
  if (!req.user.admin) {
    return res.status(401).json({ msg: 'Must be admin' });
  }
  next();
}

router.get('/user', auth, requireAdmin, async (req, res) => {
  const users = await User.findAll();
  if (!users) return res.status(404).json({ msg: 'No users found.' });
  res.json(await serialize(req, users, userSerializer));
});

router.get('/user/:id', auth, requireAdmin, async (req, res) => {
  const user = await User.findOne({
    where: { public_id: req.params.id }
  });
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json(await serialize(req, user, userSerializer));
});

router.post('/user', async (req, res) => {
  const { value, error } = Joi.validate(req.body, newUserSchema);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { name, password } = value;
  const passwordHash = await bcrypt.hash(password, 10);

  let newUser;
  try {
    newUser = await User.create({
      name,
      password_hash: passwordHash,
      public_id: uuid(),
      admin: false
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return res.status(400).json({ msg: 'A user with this name already exists' });
    } else {
      throw err;
    }
  }
  res.json({
    new_user: await serialize(req, newUser, userSerializer)
  });
});

router.put('/user/:id', auth, requireAdmin, async (req, res) => {
  const user = await User.findOne({
    where: { public_id: req.params.id }
  });
  if (!user) return res.status(404).json({ msg: 'User not found' });

  user.admin = true;
  await user.save();
  res.json({
    promoted_user: await serialize(req, user, userSerializer)
  });
});

router.delete('/user/:id', auth, requireAdmin, async (req, res) => {
  const user = await User.findOne({
    where: { public_id: req.params.id }
  });
  if (!user) return res.status(404).json({ msg: 'User not found' });

  await user.destroy();
  res.json({
    deleted_user: await serialize(req, user, userSerializer)
  });
});

export default router;
