const jwt = require("jsonwebtoken");

module.exports = function(role) {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.send("No token");

    const decoded = jwt.verify(token, "secret");

    if (role && decoded.role !== role)
      return res.send("Access denied");

    req.user = decoded;
    next();
  };
};