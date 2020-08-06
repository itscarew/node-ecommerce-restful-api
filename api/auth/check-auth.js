const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, "secret");
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication Failed",
    });
  }
};
