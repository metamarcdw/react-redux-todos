import prod_secrets from './prod_secrets';

const expected_keys = [ 'jwt_secret', 'mail_pswd' ];
const secret_keys = Object.keys(prod_secrets);
if (!expected_keys.every(k => secret_keys.includes(k)))
  throw new Error('\n * Production secret file is not complete.');

const productionConfig = {
  MAIL_SERVER: 'smtp.googlemail.com',
  MAIL_PORT: 587,
  MAIL_USERNAME: 'todos.fs.mailer',
  MAIL_PASSWORD: prod_secrets.mail_pswd,
  ADMINS: ['marcdw87@gmail.com'],

  DB_PSWD: prod_secrets.db_pswd,
  JWT_SECRET_KEY: prod_secrets.jwt_secret
};

const developmentConfig = {
  JWT_SECRET_KEY: "asecret"
};

export default function getConfig() {
  const mode = process.env.NODE_ENV || 'development';
  if (mode === 'production') {
    return productionConfig;
  } else if (mode === 'development' || mode === 'testing') {
    return developmentConfig;
  } else {
    throw new Error(' * Mode variable not set');
  }
}
