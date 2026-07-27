// middleware/errorHandler.js
const { errorResponse } = require('../utils/response');

/**
 * Global error handler middleware
 * Handles all errors and sends appropriate responses
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);

  // Default error status and message
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Send error response
  return errorResponse(
    res,
    status,
    message,
    process.env.NODE_ENV === 'development' ? err.stack : undefined
  );
};

module.exports = errorHandler;