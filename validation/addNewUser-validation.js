const { check } = require('express-validator');

const addNewUserValidation = [
    check('f_name', "First Name is required").notEmpty().trim(),
    check('l_name', "Last Name is required").notEmpty(),
    check("email", "Email is required").isEmail().withMessage("Enter a valid Email"),
    check('password').notEmpty().withMessage('Password is Required').bail()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('roleId', 'Role is required').notEmpty()
]

module.exports = {
    addNewUserValidation
}