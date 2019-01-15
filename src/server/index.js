import express from 'express';
import morgan from 'morgan';
import nodemailer from 'nodemailer';
import cors from 'cors';

import passport from 'passport';
import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt';

import { getConfig } from './config';
import { User } from './models';
import { userRoutes, todoRoutes, loginRoute } from './routes';

const app = express();
const config = getConfig();

function createErrorLog () {
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
        });
      }
    }
  });

  return errorLog;
}

const corsOptions = {
  origin: [
    'https://metamarcdw.github.io',
    'http://localhost:3000'
  ],
  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
  preflightContinue: true
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET_KEY
};
const strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  const user = await User.findOne({
    where: { name: payload.name }
  });
  return done(null, user || false);
});

app.use(express.json());

const ENV = process.env.NODE_ENV || 'development';
if (ENV === 'production') {
  app.use(createErrorLog());
}

app.use(userRoutes);
app.use(todoRoutes);
app.use(loginRoute);

passport.use(strategy);
app.use(passport.initialize());

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` * Running api in ${ENV} mode`);
  console.log(` * Listening on port ${PORT}`);
});
