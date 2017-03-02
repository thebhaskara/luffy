var db = require('./db');
var UserTable = require('./userRepo');
var TagTable = require('./tagRepo');
var Table = db.handler.define('note', {
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

Table.hasMany(TagTable.getHandle());
Table.belongsTo(UserTable.getHandle());

module.exports = {
    getHandle: function() {
        return Table;
    },
    findAll: function() {
        return Table.findAll();
    },
    create: function(Obj) {
        return Table.create(Obj);
    },
    update: function(Obj) {
        return Table.update(Obj, {
            where: {
                id: Obj.id
            }
        });
    },
}
