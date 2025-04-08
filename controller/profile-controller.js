const fs = require('fs');
const sessionHelper = require('../helper/session-helper');
const users = require('../models/user');
const { validationResult } = require('express-validator');

// GET
const profile = async (req, res) => {
    const user = await sessionHelper.loggedUserData(req);
    const hobbiesArray = user.hobbies ? user.hobbies.split(",") : [];
    res.render("admin/profile", {
        user,
        hobbiesArray,
        errorMsg: [],
        title: "Profile",
    });
};

// POST
const profilePage = async (req, res) => {
    const error = validationResult(req);
    const errorMsg = [];

    if (!error.isEmpty()) {
        const errorArray = error.array();
        return res.render('admin/profile', {
            user: req.body,
            hobbiesArray: req.body.hobbies,
            errorMsg: errorArray,
            title: "Profile",
        })
    }
    try {
        // const errorMsg = [];
        const user = req.session.users;
        const { f_name, l_name, email, number, hobbies, dob, gender, old_image } = req.body;
        const userid = user.id;

        let image = req.file ? req.file.filename : old_image;

        if (req.file && old_image) {
            fs.unlink(`public/img/userImages/${old_image}`, (err) => {
                if (err) {
                    console.error('old is not delete', err);
                }
            })
        }

        const hobbiesFormate = hobbies ? (Array.isArray(hobbies) ? hobbies.join(",") : hobbies) : "null";

        const checkEmail = await users.findOne({ where: { email } });
        if (checkEmail && checkEmail.id !== userid) {
            errorMsg.push({
                path: "alreadyEmail",
                msg: "Email already exists.!"
            });
            return res.render('admin/profile', {
                errorMsg,
                user: req.body,
                hobbiesArray: req.body.hobbies,
                FormData: req.body,
                title: "Profile",
            })
        }

        await users.update(
            { f_name, l_name, email, image: image, number, hobbies: hobbiesFormate, dob, gender },
            { where: { id: userid } },
        );

        const newUpdate = await users.findOne({
            where: { id: userid }
        });
        const userData = {
            f_name: f_name,
            l_name: l_name,
            email: email,
            image: image,
        }
        req.session.users = newUpdate.get({ plain: true })

        const hobbiesArray = newUpdate.hobbies ? newUpdate.hobbies.split(",") : [];
        res.cookie('UserData', userData);

        if (newUpdate) {
            errorMsg.push({
                path: "profileEdit",
                msg: "User Profile edit successfull.!"
            });
            res.render('admin/profile', {
                user: newUpdate,
                hobbiesArray,
                errorMsg,
                title: "Profile",
            });
        }

    } catch (error) {
        console.error("user update failed..!", error)
    }
}


module.exports = {
    profile,
    profilePage
}