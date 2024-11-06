require('dotenv').config(); // Load environment variables

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_SERVER,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true, // Enable encryption for Azure SQL Database
      enableArithAbort: true,
    },
  },
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to Azure SQL Database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
