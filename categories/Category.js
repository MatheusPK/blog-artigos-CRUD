const Sequelize = require('sequelize');
const connection = require('../database/dbConnection');

const Category = connection.define('category', {
    title: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    } 
});

Category.sync({force: false}); // true quando for criar a primeira vez e depois mudar para false

module.exports = Category;