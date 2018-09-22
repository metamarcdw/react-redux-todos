import express from 'express';
import jwt from 'jsonwebtoken';
import basicAuth from 'express-basic-auth';

import getConfig from '../config';
import { users } from '../mock_db';
import { findItem } from '../helpers';

const config = getConfig();
const router = express.Router();

const auth = basicAuth({
  authorizer: (username, password) => {
    if (!username || !password) return false;
    const { item: user } = findItem(username, users, 'name');
    if (!user) return false;
    return username === user.name && password === user.password_hash;
  },
  unauthorizedResponse: { msg: "Login attempt failed." }
});

router.get('/login', auth, (req, res) => {
  const { item: user } = findItem(req.auth.user, users, 'name');
  const payload = { id: user.public_id };
  const token = jwt.sign(payload, config.JWT_SECRET_KEY, { expiresIn: '30m' });
  res.json({ token });
});

export default router;
