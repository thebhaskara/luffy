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

module.exports = {
    handler: sequelize,
    type: {
        string: Sequelize.STRING,
        integer: Sequelize.INTEGER,
        boolean: Sequelize.BOOLEAN,
        text: Sequelize.TEXT,
    }
};
