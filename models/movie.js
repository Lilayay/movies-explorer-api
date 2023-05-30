const mongoose = require('mongoose');

const isURL = require('validator/lib/isURL');

const { LINK_ERROR } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [isURL, LINK_ERROR],
  },
  trailerLink: {
    type: String,
    required: true,
    validate: [isURL, LINK_ERROR],
  },
  thumbnail: {
    type: String,
    required: true,
    validate: [isURL, LINK_ERROR],
  },
  owner: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
