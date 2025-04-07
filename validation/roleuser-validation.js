const { check } = require('express-validator');

const roleuserValidation = [
    check('title', 'Title is required').notEmpty(),
];

module.exports = { roleuserValidation };