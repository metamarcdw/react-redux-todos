import express from 'express';
import jwt from 'jsonwebtoken';
import basicAuth from 'express-basic-auth';

import getConfig from '../config';
import { User } from '../models';

const config = getConfig();
const router = express.Router();

const auth = basicAuth({
  authorizer: async (username, password) => {
    if (!username || !password) return false;
    let user = await User.findOne({
      where: { name: username }
    });
    if (!user) return false;
    return username === user.name && password === user.password_hash;
  },
  unauthorizedResponse: { msg: 'Login attempt failed.' }
});

router.get('/login', auth, async (req, res) => {
  const payload = { name: req.auth.user };
  const token = jwt.sign(payload, config.JWT_SECRET_KEY, { expiresIn: '30m' });
  res.json({ token });
});

export default router;
