const loggedUserData = async (req, res) => {
    if (!req.session.users) return null;
    return req.session.users
}

module.exports = { loggedUserData }