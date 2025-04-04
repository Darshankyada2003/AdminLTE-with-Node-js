const { check } = require('express-validator');

const userProfile = [
    check('f_name', "First Name is required").notEmpty().trim(),
    check('l_name', "Last Name is required").notEmpty(),
    check("email", "Email is required").isEmail().withMessage("Enter a valid Email"),
    check('number').isLength({ max: 10 }).withMessage("Enter only 10 digits")
        .isNumeric().withMessage("Enter only digits"),
];

module.exports = { userProfile }