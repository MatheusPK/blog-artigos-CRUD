// const Sequelize = require('sequelize');
// const connection = new Sequelize('db_krekBot', 'root', '25062001', {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false,
//     timezone: "-03:00"
// });

// module.exports = connection;

const Sequelize = require("sequelize");
const userHeroku = "bf1fb496c0d7ca";
const passwordHeroku = "2e305c55";
const hostHeroku = "us-cdbr-east-03.cleardb.com";
const herokuDatabase = "heroku_96be19fccdb63e1";
const connection = new Sequelize(herokuDatabase, userHeroku, passwordHeroku, { //db_krekBot, root, senha
    host: hostHeroku, // host - onde esta rodando o db -> localhost
    dialect: 'mysql', // qual banco de dados estamos utilizando
    logging: false
});

module.exports = connection;