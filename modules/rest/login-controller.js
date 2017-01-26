var userService = require('../service/userService');
var auth = require('./auth');

module.exports = function(app, getApiUrl) {

    app.get(getApiUrl('/login'), auth(), function(req, res, next) {
        res.send(res.session.user);
    });

    app.get(getApiUrl('/logout'), auth(), function(req, res, next) {
        res.session.loggedIn = false;
        res.session.user = null;
        res.send(true);
    });

    app.post(getApiUrl('/login'), function(req, res) {
        if (req.body.username && req.body.password) {
            userService.check({
                username: req.body.username,
                password: req.body.password,
            }).then(function(user) {
                res.session.loggedIn = true;
                res.session.user = user;
                res.send(user);
            }).catch(function(err) {
                console.log(err);
                res.status(403);
            })
        } else {
            res.send(false);
        }
    });
}
