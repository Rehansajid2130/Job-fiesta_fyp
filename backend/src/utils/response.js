/**
 * Reusable API Response Formatter & Async Handler Utility
 * Follows /ponytail KISS principle for consistent JSON structures
 */

const sendSuccess = (res, data = {}, message = 'Success', statusCode = 200, meta = null) => {
  const response = {
    success: true,
    message,
    data,
  };
  if (meta) {
    response.meta = meta;
  }
  return res.status(statusCode).json(response);
};

const sendError = (res, message = 'An error occurred', statusCode = 400, errors = null) => {
  const response = {
    success: false,
    message,
  };
  if (errors) {
    response.errors = errors;
  }
  return res.status(statusCode).json(response);
};

/**
 * Async Handler Wrapper
 * Eliminates repetitive try-catch boilerplate in Express route controllers
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  sendSuccess,
  sendError,
  asyncHandler,
};
