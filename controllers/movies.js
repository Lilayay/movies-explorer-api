const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  NO_MOVIES,
  MOVIE_INCORRECT,
  MOVIE_NOT_FOUND,
  MOVIE_WRONG_OWNER,
  MOVIE_WRONG_ID,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError(NO_MOVIES);
      }
      return res.send(movies);
    })
    .catch((err) => next(err));
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
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(MOVIE_NOT_FOUND);
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (req.user._id === owner) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        throw new ForbiddenError(MOVIE_WRONG_OWNER);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(MOVIE_WRONG_ID));
      } else {
        next(err);
      }
    });
};
