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


const login = async (req, res) => {
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
            return res.render('login', {
                errorMsg,
                FormData: req.body
            })
        }

        const { email, password } = req.body;

        const checkUser = await users.findOne({ where: { email } });
        if (!checkUser) {
            errorMsg.push({
                path: "email",
                msg: "Invalid Email"
            })
            return res.render('login', {
                errorMsg,
                FormData: req.body
            })
        }

        const userPassword = await bcrypt.compare(password, checkUser.password);
        if (!userPassword) {
            errorMsg.push({
                path: "password",
                msg: "Invalid Password"
            });
            return res.render('login', {
                errorMsg,
                FormData: req.body
            });
        }

        // Store session
        req.session.users = { id: checkUser.id, name: checkUser.fullName };

        // Store user data in a cookie
        const userData = {
            name: checkUser.fullName,
            email: checkUser.email
        };

        res.cookie("UserData", JSON.stringify(userData), { httpOnly: true });

        console.log("Login successful");
        return res.redirect('/');

    } catch (error) {
        console.error("User login error", error);
    }
}

// Login GET
const loginPage = (req, res) => {
    res.render('login', {
        errorMsg: [],
        FormData: {}
    })
}

// Dashboard GET
const dashboard = (req, res) => {
    res.render('dashboard');
}


module.exports = { registration, registerPage, loginPage, login, dashboard }