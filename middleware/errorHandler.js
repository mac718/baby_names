//const { CustomAPIError } = require("../errors/customAPIError");
const CustomAPIError = require("../errors/customAPIError");
const errorHandlerMiddlerware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    console.log("thththh", err);
    return res.status(err.statusCode).json({ msg: err.message });
  }
  console.log(err);
  return res
    .status(500)
    .json({ msg: "Something went wrong. Please try again." });
};

module.exports = errorHandlerMiddlerware;
