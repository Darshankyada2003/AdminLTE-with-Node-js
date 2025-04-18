const { validationResult, check } = require('express-validator');
const bcrypt = require('bcrypt')
const db = require('../models');


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
            return res.render('auth/registration',
                {
                    errorMsg,
                    FormData: req.body
                });
        }
        const { f_name, email, password, confirmPassword, terms } = req.body;

        if (password !== confirmPassword) {
            errorMsg.push({
                param: "password",
                msg: "Password do not match",
                value: confirmPassword,
                path: "password",
            })
            return res.render("auth/registration", {
                errorMsg,
                FormData: req.body
            })
        }

        if (!terms) {
            errorMsg.push({
                path: "terms",
                msg: "You must agree to the terms and conditions"
            });
            return res.render('auth/registration', {
                errorMsg,
                FormData: req.body
            })
        }

        const checkEmail = await db.users.findOne({ where: { email } });
        if (checkEmail) {
            errorMsg.push({
                param: "email",
                msg: "Email already Exists",
                value: email,
                path: "email"
            })
            return res.render('auth/registration', {
                errorMsg,
                FormData: req.body
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const createUser = await db.users.create({
            f_name,
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
        return res.render('auth/registration', {
            errorMsg
        })
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).render('auth/registration', {
        });
    }
}

// registration GET 
const registerPage = (req, res) => {
    res.render('auth/registration', {
        errorMsg: [],
        FormData: {},
        title : 'Registration'
    })
}

// Login POST
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
            return res.render('auth/login', {
                errorMsg,
                FormData: req.body
            })
        }

        const { email, password } = req.body;

        const checkUser = await db.users.findOne({ where: { email } });
        if (!checkUser) {
            errorMsg.push({
                path: "email",
                msg: "Invalid Email"
            })
            return res.render('auth/login', {
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
            return res.render('auth/login', {
                errorMsg,
                FormData: req.body
            });
        }

        // if (!rememberMe) {
        //     errorMsg.push({
        //         path: "rememberMe",
        //         msg: "You must select Remember Me to continue"
        //     })
        //     return res.render('auth/login', {
        //         errorMsg,
        //         FormData: req.body
        //     })
        // }

        // Store user data in a cookie
        const userData = {
            fullName: `${checkUser.f_name} ${checkUser.l_name}`,
            email: checkUser.email,
            image: checkUser.image,
            l_name: checkUser.l_name,
            number: checkUser.number,
            gender: checkUser.gender,
            dob: checkUser.dob,
            hobbies: checkUser.hobbies
        };

        // Store session
        req.session.users = {
            id: checkUser.id,
            f_name: checkUser.f_name,
            ...userData
        };

        const cookieData = { fullName: userData.fullName, image: userData.image };

        res.cookie("UserData", JSON.stringify(cookieData));

        console.log("Login successful");
        return res.redirect('/');

    } catch (error) {
        console.error("User login error", error);
    }
}

// Login GET
const loginPage = (req, res) => {
    res.render('auth/login', {
        errorMsg: [],
        FormData: {},
        title: 'Login'
    })
}

// forgotPassword GET
const forgotPassword = (req, res) => {
    res.render('auth/forgotpassword', {
        errorMsg: [],
        FormData: {}
    }
    );
};

// forgotPassword POST
const forgotPasswordPage = async (req, res) => {
    try {
        const errorMsg = [];
        const error = validationResult(req);
        if (!error.isEmpty()) {
            error.array().forEach((err) => {
                errorMsg.push({
                    param: err.param,
                    path: err.path,
                    value: err.value,
                    msg: err.msg
                });
            });
            return res.render('auth/forgotpassword', {
                errorMsg,
                FormData: req.body
            })
        }

        const { email } = req.body;
        const userEmailCheck = await db.users.findOne({ where: { email } });
        if (!userEmailCheck) {
            errorMsg.push({
                path: "email",
                msg: "Email does not exist"
            });
            return res.render('auth/forgotpassword', {
                errorMsg,
                FormData: req.body
            })
        }
        // res.redirect(`/changepassword/${userEmailCheck.id}`);
    } catch (error) {
        console.error("error in database")
    }
}

// Logout and session delete
const logout = async (req, res) => {

    res.clearCookie('UserData');
    res.clearCookie('connect.sid');
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.status(500).send('logout error');
        } else {
            res.redirect('/login')
        };
    });

}

module.exports = {
    registration,
    registerPage,
    loginPage,
    login,
    logout,
    forgotPassword,
    forgotPasswordPage
}