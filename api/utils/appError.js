class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Calls the parent Error class' constructor with the message

    this.statusCode = statusCode; // Sets the status code for the error
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // Determines whether the error is a 'fail' or 'error' based on the status code
    Error.captureStackTrace(this, this.constructor); // Captures the stack trace and points it to the AppError constructor
  }
}

module.exports = AppError; // Export the class
