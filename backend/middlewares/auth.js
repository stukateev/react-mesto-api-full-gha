const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');

const { NODE_ENV, JWT_SECRET } = process.env;


module.exports = (req, res, next) => {
  const authorization = req.cookies.cookie;
  if (!authorization) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;

  try {
    payload = jwt.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : '1ce9ec7dd68836579e4ffcb80e1ea34ae6e9707c6b36a0c247e501d339a5ec0b');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};