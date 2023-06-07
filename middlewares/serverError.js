const { SERVER_ERROR } = require('../utils/constants');

const serverError = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: SERVER_ERROR });
  }
  next();
};

module.exports = serverError;
