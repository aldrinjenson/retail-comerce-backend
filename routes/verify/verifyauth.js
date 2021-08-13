const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authToken = req.header("auth-token");

  if (!authToken) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verifiedUser = jwt.verify(authToken, process.env.TOKEN_SECRET);
    req.user = verifiedUser; //created a user field for the req which contains username
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
