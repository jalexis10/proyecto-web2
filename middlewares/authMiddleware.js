const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/signin');
    }
};

module.exports = { ensureAuthenticated };