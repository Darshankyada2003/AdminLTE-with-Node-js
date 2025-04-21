const sessionHelper = require('../helper/session-helper');

const isAdmin = async (req, res, next) => {

    const user = await sessionHelper.loggedUserData(req);

    if (!user || user.roleId !== 1) {
        res.redirect('/');
    }
    next();
}

module.exports = { isAdmin }