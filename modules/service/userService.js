var bcrypt = require('bcrypt');

var encryptPassword = function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err)
            return callback(err);

        bcrypt.hash(password, salt, function(err, hash) {
            return callback(err, hash);
        });

    });
};

var comparePassword = function(password, userPassword, callback) {
    bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
        if (err)
            return callback(err);
        return callback(null, isPasswordMatch);
    });
};

var repos = require('../database/index.js')




module.exports = {
    getAll: function() {

    },
    get: function(id) {

    },
    create: function(userObj) {
        return new Promise(function(resolve, reject) {

            encryptPassword(userObj.password, function(err, hash) {

                if (err)
                    reject(err);

                userObj.password = hash;
                repos.user.create(userObj).then(resolve);

            });

        });
    },
    check: function(cred) {
        return new Promise(function(resolve, reject) {
            // repos.user.
            repos.user
                .getUserByUsername(cred.username)
                .then(function(user) {
                    comparePassword(cred.password, user.password, function(err, isMatch) {
                        if (err) {
                            reject({
                                reason: 'something went wrong',
                                error: err
                            });
                        } else {
                            if (isMatch) {
                                resolve(user);
                            } else {
                                reject({
                                    reason: 'invalid credentials',
                                });
                            }
                        }
                    })
                })
        });
    },
    
}
