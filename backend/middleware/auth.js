const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
      }

      // REMOVE "Bearer " prefix safely
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

      if (role && decoded.role !== role) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = decoded;
      next();

    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
