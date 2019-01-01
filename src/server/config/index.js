import prodSecrets from './prod-secrets.json';

const expectedKeys = [ 'jwt_secret', 'mail_pswd' ];
const secretKeys = Object.keys(prodSecrets);
if (!expectedKeys.every(k => secretKeys.includes(k))) {
  throw new Error('\n * Production secret file is not complete.');
}

const productionConfig = {
  MAIL_SERVER: 'smtp.googlemail.com',
  MAIL_PORT: 587,
  MAIL_USERNAME: 'todos.fs.mailer',
  MAIL_PASSWORD: prodSecrets.mail_pswd,
  ADMINS: ['marcdw87@gmail.com'],
  JWT_SECRET_KEY: prodSecrets.jwt_secret
};

const developmentConfig = {
  JWT_SECRET_KEY: 'asecret'
};

export default function getConfig () {
  const mode = process.env.NODE_ENV || 'development';
  if (mode === 'production') {
    return productionConfig;
  } else if (mode === 'development' || mode === 'test') {
    return developmentConfig;
  } else {
    throw new Error(' * Mode variable not set');
  }
}
