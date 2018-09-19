import prod_secrets from './prod_secrets';

const expected_keys = [ 'jwt_secret', 'db_pswd', 'mail_pswd' ];
const secret_keys = Object.keys(prod_secrets);
if (!expected_keys.every(k => secret_keys.includes(k)))
  throw new Error("\n * Production secret file is not complete.");

const productionConfig = {
  MAIL_SERVER: "smtp.googlemail.com",
  MAIL_PORT: 587,
  MAIL_USERNAME: "todos.fs.mailer",
  MAIL_PASSWORD: prod_secrets.mail_pswd,
  ADMINS: ["marcdw87@gmail.com"],

  db_user: "metamarcdw",
  db_pswd: prod_secrets.db_pswd,
  db_host: "metamarcdw.mysql.pythonanywhere-services.com",
  db_name: "todos_fs",
  get SQLALCHEMY_DATABASE_URI() {
    return `mysql://${this.db_user}:${this.db_pswd}@${this.db_host}/${this.db_user}$${this.db_name}`;
  },

  SQLALCHEMY_POOL_SIZE: 10,
  SQLALCHEMY_POOL_RECYCLE: 280,
  JWT_SECRET_KEY: prod_secrets.jwt_secret
};

export default function getConfig() {
  const mode = process.env.TODOS_FS_MODE;
  if (mode === 'production') {
    return productionConfig;
  // } else if (mode === 'development') {
  //   return developmentConfig;
  } else {
    throw new Error(' * Mode variable not set');
  }
}
