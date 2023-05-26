const express = require('express');

const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const {
  getUserInfo, updateUser,
} = require('../controllers/users');

router.get('/users/me', getUserInfo);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = router;
