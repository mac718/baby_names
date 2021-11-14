const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");
const asyncWrapper = require("../middleware/async");

const checkToken = asyncWrapper(async (req, res, next) => {
  const token = req.cookies.token;
  console.log("token", token);

  if (!token) {
    console.log("what?");
    //next(createCustomError("Unauthorized: please log in.", 401));
    throw new UnauthorizedError("Unauthorized: please log in.");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      //next(createCustomError("Unauthorized: please log in.", 401));
      throw new UnauthorizedError("Unauthorized: please log in.");
    }
    let verifiedUser = decoded;

    if (!verifiedUser) {
      //next(createCustomError("Unauthorized: please log in.", 401));
      throw new UnauthorizedError("Unauthorized: please log in.");
    }
    req.user = verifiedUser;
    next();
  });
});

module.exports = checkToken;
