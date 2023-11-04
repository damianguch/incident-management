const { body } = require('express-validator');

exports.registerValidator = [
  body('email').isEmail().withMessage('invalid email').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 characters long')
];

exports.loginValidator = [
  body('email').isEmail().withMessage('invalid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Invalid password')
];
