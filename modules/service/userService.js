var _ = require('lodash');
var bcrypt = require('bcryptjs');

var encryptPassword = function(password) {
    return new Promise(function(resolve, reject) {

        bcrypt.genSalt(10, function(err, salt) {
            if (err)
                return reject(err);

            bcrypt.hash(password, salt, function(err, hash) {
                if (err) reject(err);
                else resolve(hash);
                // return resolve(err, hash);
            });

        });
    });
};

var comparePassword = function(password, userPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
            if (err)
                return reject(err);
            else
                return resolve(isPasswordMatch);
        });
    });
};

var repos = require('../database/index.js')




module.exports = {
    getAll: function() {

    },
    get: function(id) {

    },
    create: function(userObj) {
        var _user, _hash;
        return encryptPassword(userObj.password).then(function(hash) {
            delete userObj.password;
            _hash = hash;
            return repos.user.create(userObj);
        }).then(function(user) {
            _user = user;
            return repos.password.create({
                password: _hash
            });
        }).then(function(password) {
            return _user.addPassword(password);
        });
    },
    check: function(cred) {
        var _user;
        var _isMatched = false;
        return repos.user
            .getUserByUsername(cred.username)
            .then(function(user) {
                _user = user;
                return user.getPasswords();
            }).then(function(passwords) {
                return checkPasswords(passwords, _user, cred.password);
            });

        function checkPasswords(passwords, user, inputPassword) {
            return new Promise(function(resolve, reject) {
                if (passwords.length > 0 && !_isMatched) {

                    var row = passwords.pop();
                    comparePassword(cred.password, row.password).catch(function(err) {
                        reject({
                            reason: 'something went wrong',
                            error: err
                        });
                    }).then(function(isMatch) {

                        if (isMatch) {
                            _isMatched = true;
                            resolve(user);
                        } else {
                            resolve(false);
                        }
                    });

                } else {

                    reject({
                        reason: 'invalid credentials',
                    });
                }
            }).then(function(_user) {
                if (_user == false) {
                    return checkPasswords(passwords, user, inputPassword);
                } else {
                    return _user;
                }
            });
        }
    },

}
