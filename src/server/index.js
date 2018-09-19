import express from 'express';
import morgan from 'morgan';
import nodemailer from 'nodemailer';
import cors from 'cors';

import getConfig from './config';
import userRoutes from './routes/user';
import todoRoutes from './routes/todo';

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
  skip: (req, res) => res.statusCode < 500,
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

app.use(express.json());
app.use(errorLog);

app.use(userRoutes);
app.use(todoRoutes);

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
