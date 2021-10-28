const {
  createCutomError,
  createCustomError,
} = require("../errors/customAPIError");
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log("snarf", error);
      // if (error.name) {
      //   next(createCustomError(error.message, 500));
      // } else {
      //   next(error);
      // }
      next(error);
    }
  };
};

module.exports = asyncWrapper;
