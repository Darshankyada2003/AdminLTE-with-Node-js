const sessionHelper = require('../helper/session-helper');

const roleUser = async (req, res) => {
    const user = await sessionHelper.loggedUserData(req);
    return res.render('admin/role',{
        user
    });
}

module.exports = {
    roleUser
}