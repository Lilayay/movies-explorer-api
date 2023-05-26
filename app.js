require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const serverError = require('./middlewares/serverError');
const limiter = require('./middlewares/rateLimit');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());

mongoose.set('strictQuery', true);
mongoose
  .connect('mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => {
    console.log('База данных подключена');
  })
  .catch((err) => {
    console.log('Ошибка при подключении базы данных');
    console.error(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(serverError);

app.listen(PORT);
