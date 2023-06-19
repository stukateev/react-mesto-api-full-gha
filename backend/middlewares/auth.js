const token = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    throw next(new UnauthorizedError('Authorization required'));
  }

  const { NODE_ENV, JWT_SECRET } = process.env;

  let payload;
  try {
    payload = token.verify(
      jwt,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : 'secret_key_num',
    );
  } catch (err) {
    return next(new UnauthorizedError('Authorization required'));
  }

  req.user = payload;
  return next();
};
