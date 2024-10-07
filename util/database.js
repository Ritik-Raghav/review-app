const Sequelize = require('sequelize');

const sequelize = new Sequelize('review', 'root', 'pass', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;