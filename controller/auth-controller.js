const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const users = require('../models/user');

const registration = async (req, res) => {

    const errorMsg = [];
    const error = validationResult(req);
    if (!error.isEmpty()) {
        error.array().forEach((err) => {
            errorMsg.push({
                param: err.param,
                msg: err.msg,
                value: err.value,
                path: err.path
            })
        });
        return res.render('/registration', {
            errorMsg,
            FormData: req.body
        })
    }

    const { fullName, email, password } = req.body;

    const checkEmail = await users.findOne({ where: { email } });
    if (checkEmail) {
        errorMsg.push({
            msg: "Email is already exists."
        });
        return res.render("/registration", {
            errorMsg,
            FormData: req.body
        })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const userCreate = await users.create({
        fullName: fullName,
        email: email,
        password: hashPassword
    });
    if (!userCreate) {
        errorMsg.push({
            param: "registration",
            msg: "User Registration failed.",
            value: "null",
            path: "registration"
        });
        return res.render("/registration", {
            errorMsg,
            FormData: req.body
        })
    }
}

module.exports = { registration }