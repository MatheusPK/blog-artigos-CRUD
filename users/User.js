const Sequelize = require('sequelize');
const connection = require('../database/dbConnection')

const User = connection.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync({force: true}); //remover  a linha dps de criar a tabela, para n ficar tentando criar toda hora

module.exports = User;