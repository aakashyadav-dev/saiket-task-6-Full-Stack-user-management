// middleware/notFound.js
const { errorResponse } = require('../utils/response');

/**
 * 404 Not Found middleware
 * Handles requests to non-existent routes
 */
const notFound = (req, res, next) => {
  return errorResponse(
    res,
    404,
    `Route ${req.originalUrl} not found`
  );
};

module.exports = notFound;