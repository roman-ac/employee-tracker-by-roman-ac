
const mysql = require ('mysql2');

require('dotenv').config();
 

const db = mysql.createConnection (
    {
        host: 'localhost',
        port: 3301,
        user: 'root',
        password: process.env.DB_PASSWORD || '',
        database: 'employee_db'
    },
    console.log(`Connected to employee_db database.`)
);

module.exports = db;