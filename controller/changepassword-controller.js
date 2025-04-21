const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const db = require('../models');

// changePassword GET
const changePassword = (req, res) => {
    // const id = req.params.id;
    res.render("admin/changepassword", {
        title: "ChangePasswords",
        // userid: id,
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
                title : 'ChangePasswords',
                errorMsg,
                user,
                FormData: req.body
            })
        }

        const { password } = req.body;

        const userid = user.id;

        const hashPassword = await bcrypt.hash(password, 10);
        const NewPassword = await db.users.update(
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
                user,
                title : 'ChangePasswords'
            })
        } else {
            errorMsg.push({
                msg: "Password update failed"
            })
            return res.render('admin/changepassword', {
                errorMsg,
                title : 'ChangePasswords',
                userid,
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