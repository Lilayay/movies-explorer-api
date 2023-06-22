const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  MOVIE_INCORRECT,
  MOVIE_NOT_FOUND,
  MOVIE_WRONG_OWNER,
  MOVIE_WRONG_ID,
  MOVIE_DELETED,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movies) => res.send({ movies }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MOVIE_INCORRECT));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError(MOVIE_WRONG_OWNER));
      }
      return Movie.deleteOne(movie._id)
        .then(() => {
          res.json({ message: MOVIE_DELETED });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(MOVIE_WRONG_ID));
      } else {
        next(err);
      }
    });
};
