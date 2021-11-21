const Sequelize = require('sequelize')
    // Option 3: Passing parameters separately (other dialects)

// We read info from .env file for flexibility
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */ ,
    }
);

module.exports = {
    sequelize
}