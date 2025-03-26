const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const users = require('../models/user');

// Registration POST
const registration = async (req, res) => {
    try {
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
            })
            return res.render('registration',
                {
                    errorMsg,
                    FormData: req.body
                });
        }
        const { fullName, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            errorMsg.push({
                param: "password",
                msg: "Password do not match",
                value: confirmPassword,
                path: "password",
            })
            return res.render("registration", {
                errorMsg,
                FormData: req.body
            })
        }

        const checkEmail = await users.findOne({ where: { email } });
        if (checkEmail) {
            errorMsg.push({
                param: "email",
                msg: "User already Exists",
                value: email,
                path: "email"
            })
            return res.render('registration', {
                errorMsg,
                FormData: req.body
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const createUser = await users.create({
            fullName,
            email,
            password: hashPassword
        });
        if (createUser) {
            errorMsg.push({
                msg: "User Register Successfully.",
                path: "registerSuccess"
            })
        } else {
            errorMsg.push({
                msg: "user register failed.",
                path: "registerFailed"
            })
        }
        return res.render('registration', {
            errorMsg,
            FormData: req.body
        })
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).render('registration', {
        });
    }
}

// registration GET 
const registerPage = (req, res) => {
    res.render('registration', {
        errorMsg: [],
        FormData: {}
    })
}

// Login GET
const loginPage = (req, res) => {
    res.render('login', {
        errorMsg: [],
        FormData: {}
    })
}
module.exports = { registration, registerPage, loginPage }