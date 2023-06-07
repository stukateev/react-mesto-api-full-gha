class ServerError extends Error {
  constructor() {
    super();
    this.message = 'Internal Server Error';
    this.statusCode = 500;
  }
}

module.exports = ServerError;
