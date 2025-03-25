const { check } = require("express-validator");

const validationRegister = [
    check("fullName", "fullName is required").notEmpty().trim(),
    check("email", "Email is required").isEmail().withMessage("Enter a valid Email"),
    check("password", "Password must be at least 6 character long").isLength({ min: 6 }),
    check("confirmPassword", "Does not match password").custom(
        (value, { req }) => value === req.body.password
    ),
];

const validationLogin = [
    check("email", "Email is required").notEmpty(),
    check("password", "password is required").notEmpty()
]

module.exports = { validationRegister, validationLogin }