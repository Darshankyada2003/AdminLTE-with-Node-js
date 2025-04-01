const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const users = require('../models/user');

// changePassword GET
const changePassword = (req, res) => {
    // const id = req.params.id;
    const user = req.session.users
    res.render("admin/changepassword", {
        title: "ChangePasswords",
        // userid: id,
        user,
        errorMsg: [],
        FormData: {}
    });
};

// changePassword POST
const changePasswordPage = async (req, res) => {
    try {
        // const id = req.params.id;
        const user = req.session.users;
        const errorMsg = [];
        const error = validationResult(req);
        if (!error.isEmpty()) {
            error.array().forEach((err) => {
                errorMsg.push({
                    param: err.param,
                    path: err.path,
                    value: err.value,
                    msg: err.msg
                })
            })
            return res.render('admin/changepassword', {
                // userid: id,
                errorMsg,
                user,
                FormData: req.body
            })
        }

        const { password } = req.body;

        const userid = user.id;

        const hashPassword = await bcrypt.hash(password, 10);
        const NewPassword = await users.update(
            { password: hashPassword },
            { where: { id: userid } }
        );

        if (NewPassword[0] > 0) {
            errorMsg.push({
                path : "passwordUpdated",
                msg: "Password update successfull.!"
            })
            return res.render('admin/changepassword', {
                errorMsg,
                user
            })
        } else {
            errorMsg.push({
                msg: "Password update failed"
            })
            return res.render('admin/changepassword', {
                errorMsg,
                userid: id,
                user,
                FormData: req.body
            })
        }
    } catch (error) {
        console.error("Password update failed", error);
    }
}

module.exports = {
    changePassword,
    changePasswordPage
}