const mongoose = require('mongoose');
const validator = require('validator');
const { reIsUrl } = require('../middlewares/validations');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: [
      {
        validator: (url) => reIsUrl.test(url),
        message: 'Некорректный URL',
      },
      {
        validator: (url) => validator.isURL(url),
        message: 'Некорректный URL',
      },
    ],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
