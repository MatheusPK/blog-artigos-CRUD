const Sequelize = require('sequelize');
const connection = new Sequelize('db_krekBot', 'root', '25062001', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: "-03:00"
});

module.exports = connection;
