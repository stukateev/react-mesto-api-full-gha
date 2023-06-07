const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res, next) => {
  const error = new Error('Service not found');
  error.statusCode = 404;
  next(error);
});

module.exports = router;
