const { check } = require("express-validator");

const validationRegister = [
    check("f_name", "Full name is required").notEmpty().trim(),
    check("email", "Email is required").isEmail().withMessage("Enter a valid Email"),
    check("password", "Password must be at least 6 character long").isLength({ min: 6 }),
    check("confirmPassword", "Does not match password").custom(
        (value, { req }) => value === req.body.password
    ),
    check("terms", "Agree is required").notEmpty(),
];

const validationLogin = [
    check("email", "Email is required").notEmpty(),
    check("password", "password is required").notEmpty(),
    // check("remember", "Remember me is required").notEmpty()
]

const validationForgotpassword = [
    check("email", "Email is required").notEmpty()
]

const validationChangepassword = [
    check("password", "Password must be at least 6 character long").isLength({ min: 6 }),
    check("confirmPassword", "Does not match password").custom(
        (value, { req }) => value === req.body.password
    )
]

module.exports = {
    validationRegister,
    validationLogin,
    validationForgotpassword,
    validationChangepassword
}