

module.exports = function() {
    return function(req, res, next) {
        if (res.session.loggedIn) {
            next();
        } else {
            res.sendStatus(403);
        }
    };
};
