var db = require('./db'),
    User = db.handler.define('user', {
        id: {
            type: db.type.integer,
            autoIncrement: true,
            primaryKey: true,
            field: 'id',
        },
        firstName: {
            type: db.type.string,
            field: 'first_name',
        },
        lastName: {
            type: db.type.string,
            field: 'last_name',
        },
        username: {
            type: db.type.string,
            field: 'username'
        },
        password: {
            type: db.type.string,
            field: 'password'
        }
    });

module.exports = {
    sync: function() {
        return User.sync();
    },
    create: function(userObj) {
        // User.sync().then(function() {
        // Table created
        // return User.create(userObj);
        return User.create(userObj);
        // });
    },
    getUserByUsername: function(username) {
        return User.findOne({ where: { username: username } });
    }
}
