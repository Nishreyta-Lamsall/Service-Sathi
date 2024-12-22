const createError = (statusCode, message) => {
  const err = new Error(message);

  err.statusCode = typeof statusCode === "number" ? statusCode : 500;

  err.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

  return err;
};

module.exports = createError;
