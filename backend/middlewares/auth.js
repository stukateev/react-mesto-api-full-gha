const token = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');

module.exports = (req, res, next) => {
  const  { jwt } = req.cookies

  if(!jwt){
    throw next(new UnauthorizedError('Authorization required'))
  }

  const { NODE_ENV, JWT_SECRET } = process.env;

  let payload;
  try {
    payload = token.verify(
      jwt,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : '1ce9ec7dd68836579e4ffcb80e1ea34ae6e9707c6b36a0c247e501d339a5ec0b',
    );
  } catch (err) {
    throw new UnauthorizedError('Authorization required');
  }

  req.user = payload;
  next();
};