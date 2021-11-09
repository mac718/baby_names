const {
  createCutomError,
  createCustomError,
} = require("../errors/customAPIError");
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log("snarf", error.message);
      if (error.name === "MongoError") {
        //next(createCustomError(error.code, 500));
        next(error);
      } else {
        next(error);
      }
      next(error);
    }
  };
};

module.exports = asyncWrapper;
