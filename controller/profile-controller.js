const sessionHelper = require('../helper/session-helper');

const profile = async (req, res) => {
    const user = await sessionHelper.loggedUserData(req);
    res.render("admin/profile", {
        user
    });
}

module.exports = {
    profile
}