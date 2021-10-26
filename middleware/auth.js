const jwt = require("jsonwebtoken");
const { createCustomError } = require("../errors/customAPIError");

const checkToken = asyncWrapper(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    next(createCustomError("Unauthorized: no token", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      next(createCustomError("Unauthorized: no token", 401));
    }
    let verifiedUser = decoded;
    if (!verifiedUser) {
      next(createCustomError("Unauthorized: no token", 401));
    }
    req.user = verifiedUser;
    next();
  });
});

module.exports = checkToken;
