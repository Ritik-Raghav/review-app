const Sequelize = require('sequelize');

const sequelize = new Sequelize('blog', 'root', 'pass', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;