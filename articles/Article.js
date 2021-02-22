const Sequelize = require('sequelize');
const connection = require('../database/dbConnection');
const Category = require('../categories/Category');

const Article = connection.define('article', {
    title: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    } 
});

Category.hasMany(Article); // uma categoria tem muitos artigos
Article.belongsTo(Category); //Um artigo pertence a uma categoria

Article.sync({force: false}); // true quando for criar a primeira vez e depois mudar para false

module.exports = Article;