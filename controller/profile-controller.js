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
        const { f_name, l_name, email, image, number, hobbies, dob, gender } = req.body;
        const userid = user.id;

        const hobbiesFormate = Array.isArray(hobbies) ? hobbies.join(",") : hobbies;

        await users.update(
            { f_name, l_name, email, image, number, hobbies: hobbiesFormate, dob, gender },
            { where: { id: userid } },
        );

        const newUpdate = await users.findOne({
            where: { id: userid }
        });
        
        req.session.users = newUpdate.get({ plain: true });
        
        const hobbiesArray = newUpdate.hobbies ? newUpdate.hobbies.split(",") : [];

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