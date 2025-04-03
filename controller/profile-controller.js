const fs = require('fs');
const sessionHelper = require('../helper/session-helper');
const users = require('../models/user');

// GET
const profile = async (req, res) => {
    const user = await sessionHelper.loggedUserData(req);
    const hobbiesArray = user.hobbies ? user.hobbies.split(",") : [];
    res.render("admin/profile", {
        user,
        hobbiesArray
    });
};

// POST
const profilePage = async (req, res) => {
    try {

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

        const userData = {
            f_name: f_name,
            email: email,
            image: image
        }
        await users.update(
            { f_name, l_name, email, image: image, number, hobbies: hobbiesFormate, dob, gender },
            { where: { id: userid } },
        );

        const newUpdate = await users.findOne({
            where: { id: userid }
        });

        req.session.users = newUpdate.get({ plain: true });

        const hobbiesArray = newUpdate.hobbies ? newUpdate.hobbies.split(",") : [];
        res.cookie('userData', userData);
        res.render('admin/profile', {
            user: newUpdate,
            hobbiesArray
        });

    } catch (error) {
        console.error("user update failed..!", error)
    }
}

module.exports = {
    profile,
    profilePage
}