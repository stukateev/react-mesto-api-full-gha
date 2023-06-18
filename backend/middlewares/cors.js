const allowedCors = [
  'http://idler.studio.nomoredomains.rocks',
  'https://idler.studio.nomoredomains.rocks',
  'http://api.idler.studio.nomoredomains.rocks',
  'https://api.idler.studio.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.set({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true
    });
  }
  if (method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Methods': DEFAULT_ALLOWED_METHODS,
      'Access-Control-Allow-Headers': requestHeaders
    });
    res.end();
    return
  }

  return next();
};