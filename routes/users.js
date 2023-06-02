const express = require('express');

const { userValidation } = require('../middlewares/validation');

const router = express.Router();

const {
  getUserInfo, updateUser,
} = require('../controllers/users');

router.get('/users/me', getUserInfo);

router.patch('/users/me', userValidation, updateUser);

module.exports = router;
