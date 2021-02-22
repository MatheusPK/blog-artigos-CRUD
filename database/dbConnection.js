// const Sequelize = require('sequelize');
// const connection = new Sequelize('db_krekBot', 'root', '25062001', {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false,
//     timezone: "-03:00"
// });

// module.exports = connection;

const Sequelize = require("sequelize");
const userHeroku = "babcd38cda6a7d";
const passwordHeroku = "2fd727f1";
const hostHeroku = "us-cdbr-east-03.cleardb.com";
const herokuDatabase = "heroku_6b668b0e99dc0fa";
const connection = new Sequelize(herokuDatabase, userHeroku, passwordHeroku, { //db_krekBot, root, senha
    host: hostHeroku, // host - onde esta rodando o db -> localhost
    dialect: 'mysql', // qual banco de dados estamos utilizando
    logging: false
});

module.exports = connection;