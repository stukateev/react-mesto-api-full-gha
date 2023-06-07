const BAD_REQUEST = require('./BadRequestError');
const CONFLICT = require('./ConflictError');
const FORBIDDEN = require('./ForbiddenError');
const NOT_FOUND = require('./NotFoundError');
const SERVER_ERROR = require('./ServerError');
const UnauthorizedError = require('./UnauthorizedError');

const handleError = (err, next) => {
  switch (err.name) {
    case 'CastError':
    case 'ValidationError':
      next(BAD_REQUEST);
      return;
    case 'DocumentNotFoundError':
      next(new NOT_FOUND('Item with specified id not found'));
      return;
    case 'MongoServerError':
      if (err.code === 11000) {
        next(new CONFLICT('User with this email is already registered'));
      } else {
        next(new SERVER_ERROR('Mongo Server Error'));
      }
      return;
    default:
      break;
  }
  next(err);
};

module.exports = {
  BAD_REQUEST,
  UnauthorizedError,
  FORBIDDEN,
  CONFLICT,
  NOT_FOUND,
  SERVER_ERROR,
  handleError,
};
