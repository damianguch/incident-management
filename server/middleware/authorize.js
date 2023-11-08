const authorize = (requiredRole) => {
  return (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Access forbidden' });
    }
  };
};

module.exports = authorize;
