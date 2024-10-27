const { db_host, db_username, db_password, db_name } = require('../config/environment');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(db_name, db_username, db_password, {
    host: db_host,
    dialect: 'mysql',
});

// Kiểm tra kết nối
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;
