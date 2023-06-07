class BadRequestError extends Error {
  constructor() {
    super();
    this.message = 'Invalid data sent';
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
