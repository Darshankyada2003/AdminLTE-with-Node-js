const sessionHelper = require('../helper/session-helper');

// Dashboard GET
const dashboard = async (req, res) => {
    // const user = await sessionHelper.loggedUserData(req);
    res.render('admin/dashboard', {
        title: "Dashboard",
        // user
    });
}

module.exports = {
    dashboard
}