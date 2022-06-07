const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.sendStatus(404);
  }
  const accessToken = authHeader.split(" ")[1];
  jwt.verify(accessToken, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyToken;
