class ForbiddenError extends Error {
  constructor() {
    super();
    this.message = 'Access denied';
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
