const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

const NotFoundError = require('../errors/NotFoundError');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.use(auth);

router.use('/', usersRouter);
router.use('/', moviesRouter);

router.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
