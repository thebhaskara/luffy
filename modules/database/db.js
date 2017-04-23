var Sequelize = require('sequelize');

var sequelize = new Sequelize('luffy', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    define: {
        timestamps: false,
        freezeTableName: true,
    }
});

var BasicOperations = function(table, idProperty) {
    this.table = table;
    this.idProperty = idProperty || 'id';
};
BasicOperations.prototype.getHandle = function() {
    return this.table;
};
BasicOperations.prototype.sync = function() {
    return this.table.sync();
};
BasicOperations.prototype.findAll = function() {
    return this.table.findAll();
};
BasicOperations.prototype.create = function(obj) {
    return this.table.create(obj);
};
BasicOperations.prototype.update = function(obj) {
    var condition = {},
        idProperty = this.idProperty;
    condition[idProperty] = obj[idProperty];

    return this.table.update(obj, {
        where: condition
    });
};
BasicOperations.prototype.delete = function(obj) {
    var condition = {},
        idProperty = this.idProperty;
    condition[idProperty] = obj[idProperty];
    
    return this.table.destroy({
        where: condition
    });
};

module.exports = {
    handler: sequelize,
    type: {
        string: Sequelize.STRING,
        integer: Sequelize.INTEGER,
        boolean: Sequelize.BOOLEAN,
        text: Sequelize.TEXT,
    },
    init: function() {
        return sequelize.sync();
    },
    getBasicOperations: function(table, idProperty) {
        return new BasicOperations(table, idProperty);
    }
};
