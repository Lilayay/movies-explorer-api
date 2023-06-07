const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

const NotFoundError = require('../errors/NotFoundError');

const { PAGE_NOT_FOUND } = require('../utils/constants');

const { signupValidation, signinValidation } = require('../middlewares/validation');

router.post(
  '/signup',
  signupValidation,
  createUser,
);

router.post(
  '/signin',
  signinValidation,
  login,
);

router.use(auth);

router.use('/', usersRouter);
router.use('/', moviesRouter);

router.use((req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND)));

module.exports = router;
