const mysql = require('mysql2');
require('dotenv').config();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'roy',
    password: process.env.DB_PASSWORD,
    database: "healthcare"
})

module.exports = { db }