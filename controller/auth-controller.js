const { validationResult } = require('express-validator');
const user = require('../models/user');

const registeration = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.render('registeration',
            {
                error: error.array(),
                oldInput: req.body
            })
    }
}  