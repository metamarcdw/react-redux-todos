import express from 'express';
import morgan from 'morgan';
import nodemailer from 'nodemailer';
import cors from 'cors';

import passport from 'passport';
import passportJwt from 'passport-jwt';

import getConfig from './config';
import { users } from './db';
import { findItem } from './helpers';
import { userRoutes, todoRoutes, loginRoute } from './routes';

const app = express();
const config = getConfig();

const gmailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.MAIL_USERNAME,
    pass: config.MAIL_PASSWORD
  }
});

const errorLog = morgan('common', {
  skip: (req, res) => true, // res.statusCode < 500,
  stream: {
    write: str => {
      const mailOptions = {
        from: config.MAIL_USERNAME,
        to: config.ADMINS,
        subject: 'ExpressJS server error',
        html: str
      };
      gmailer.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        console.log(`Sent error log to admins:\n${info}`);
      })
    }
  }
});

const corsOptions = {
  origin: [
    'https://metamarcdw.github.io',
    'http://localhost:3000'
  ],
  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ],
  credentials: true
};

const jwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET_KEY
};
const strategy = new jwtStrategy(jwtOptions, (payload, next) => {
  const user = findItem(payload.id, users, 'public_id');
  next(null, user);
});

app.use(express.json());
app.use(errorLog);

app.use(userRoutes);
app.use(todoRoutes);
app.use(loginRoute);

passport.use(strategy);
app.use(passport.initialize());

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
