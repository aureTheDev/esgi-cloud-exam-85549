require('dotenv').config();
const { Sequelize } = require('sequelize');

// database
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
);

// authentication and synchronization
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        sequelize.sync().catch((error) => console.log("Cannot sync the database:", error));
    })
    .catch((error) => console.log("Cannot connect to database, please check environment credentials:", error));

module.exports = sequelize;