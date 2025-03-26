const isAuthenticated = (req, res, next) => {
    const { id } = req.session.user || {};
    if (!id) {
        return res.redirect('/login');
    }
    next();
};

const Authenticated = (req, res, next) => {
    const { id } = req.session.user || {};
    if (id) {
        return res.redirect('/');
    }
    next();
};

module.exports = { isAuthenticated, Authenticated }