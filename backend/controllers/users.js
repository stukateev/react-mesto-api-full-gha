const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { handleError } = require('../utils/errors');
const Users = require('../models/user');

const getUsers = (req, res, next) => {
  Users.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      handleError(err, next);
    });
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  return Users.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      handleError(err, next);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash) => Users.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      handleError(err, next);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  return Users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      handleError(err, next);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return Users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      handleError(err, next);
    });
};

const getCurrentUser = (req, res, next) => Users.findById(req.user._id)
  .orFail()
  .then((user) => res.send(user))
  .catch((err) => {
    handleError(err, next);
  });

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production'
          ? JWT_SECRET
          : '1ce9ec7dd68836579e4ffcb80e1ea34ae6e9707c6b36a0c247e501d339a5ec0b',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: `Welcome back, ${user.name}` });
    })
    .catch((err) => {
      handleError(err, next);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
  login,
};
