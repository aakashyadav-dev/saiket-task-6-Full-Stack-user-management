// middleware/validateUser.js
const { body } = require('express-validator');

/**
 * Validation rules for user operations
 * Used for both POST and PUT requests
 */
const validateUser = [
  // Name validation
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .trim(),

  // Email validation
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  // Age validation
  body('age')
    .optional()
    .isInt({ min: 18, max: 100 })
    .withMessage('Age must be an integer between 18 and 100')
    .toInt()
];

module.exports = validateUser;