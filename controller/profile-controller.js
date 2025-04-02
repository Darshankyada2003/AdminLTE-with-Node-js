const sessionHelper = require('../helper/session-helper');
const users = require('../models/user');

// GET
const profile = async (req, res) => {
    const user = await sessionHelper.loggedUserData(req);
    res.render("admin/profile", { user });
}

// POST
const profilePage = async (req, res) => {
    try {

        const user = req.session.users;

        const { f_name, l_name, email, image, number, hobbies, dob, gender } = req.body;

        const userid = user.id;

        const updateDetail = await users.update(
            { f_name, l_name, email, image, number, hobbies, dob, gender },
            { where: { id: userid } },
        );

        // if (updateDetail > 0) {
            const newUpdate = await users.findOne({
                where: { id: userid }
            })
            req.session.users = newUpdate
            res.render('admin/profile', {
                user: newUpdate
            });
        // } else {
        //     res.status(400).json({
        //         error: "update failed"
        //     });
        // }

    } catch (error) {
        console.error("user update failed..!", error)
    }
}

module.exports = {
    profile,
    profilePage
}