var db = require('./db');
var PasswordTable = require('./passwordRepo');
var UserTable = db.handler.define('user', {
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
    }
});

UserTable.hasMany(PasswordTable.getHandle());

var operations = db.getBasicOperations(UserTable);
operations.getUserByUsername = function(username) {
    return this.table.findOne({ where: { username: username } });
}

module.exports = operations;

// module.exports = {
//     getHandle: function() {
//         return UserTable;
//     },
//     sync: function() {
//         return UserTable.sync();
//     },
//     create: function(userObj) {
//         return UserTable.create(userObj);
//     },
//     getUserByUsername: function(username) {
//         return UserTable.findOne({ where: { username: username } });
//     }
// }
