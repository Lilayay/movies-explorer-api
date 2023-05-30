const { PORT = '3000' } = process.env;
const { NODE_ENV } = process.env;
const DEV_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const { DB_URL } = process.env;
const endpoint = NODE_ENV === 'production' ? DB_URL : DEV_URL;

module.exports = {
  PORT,
  endpoint,
};
