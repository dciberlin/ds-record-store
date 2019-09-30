const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Your email looks funky..."),
    body("password")
      .isLength({ min: 10 })
      .withMessage("Minimum password length is 10"),
    body("firstName")
      .exists()
      .trim()
      .escape()
      .withMessage("Please give us your first name.")
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  userValidationRules,
  validate
};
