var userService = require('../service/userService');
var auth = require('./auth');

module.exports = function(app, getApiUrl) {

    app.post(getApiUrl('/signup'), function(req, res) {
        userService.create(req.body).then(function(user) {
            res.send(user);
        }).catch(function(err) {
            console.log(err);
            res.status(500).send(err);
        });
    });
}
