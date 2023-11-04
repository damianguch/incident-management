const jwt = require('jsonwebtoken');

function interceptor(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (token) {
    jwt.verify(token, ACCESS_SECRET_KEY, (err, user) => {
      if (!err) {
        req.user = user;
      }
      next();
    });
  } else {
    next();
  }
}

module.exports = interceptor;
