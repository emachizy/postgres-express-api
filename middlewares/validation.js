const { body, param, validationResult } = require("express-validator");

const validateUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name must be ≤ 100 chars"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .isLength({ max: 100 })
    .withMessage("Email must be ≤ 100 chars"),
  body("age")
    .optional()
    .isInt({ min: 0, max: 120 })
    .withMessage("Age must be an integer 0–120"),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(422).json({ errors: errs.array() });
    }
    next();
  },
];

const validateUserId = [
  param("id")
    .notEmpty()
    .withMessage("ID param is required")
    .isInt({ gt: 0 })
    .withMessage("ID must be a positive integer"),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).json({ errors: errs.array() });
    }
    next();
  },
];

module.exports = {
  validateUser,
  validateUserId,
};
