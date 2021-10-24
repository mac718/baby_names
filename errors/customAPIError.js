class CustomAPIError extends error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, status) => {
  return new CustomAPIError(msg, status);
};

module.exports = { CustomAPIError, createCustomError };
