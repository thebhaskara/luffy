var db = require('./db'),
    PasswordTable = db.handler.define('password', {
        id: {
            type: db.type.integer,
            autoIncrement: true,
            primaryKey: true,
            field: 'id',
        },
        password: {
            type: db.type.string,
            field: 'password'
        }
    });

module.exports = {
    getHandle: function() {
        return PasswordTable;
    },
    sync: function() {
        return PasswordTable.sync();
    },
    create: function(obj) {
        return PasswordTable.create(obj);
    },

}
