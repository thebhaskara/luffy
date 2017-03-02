var db = require('./db');
var Table = db.handler.define('tag', {
    id: {
        type: db.type.integer,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
    },
    text: {
        type: db.type.string,
        field: 'text',
    }
});

module.exports = {
    getHandle: function() {
        return Table;
    },
    sync: function() {
        return Table.sync();
    },
    create: function(Obj) {
        return Table.create(Obj);
    },
}
