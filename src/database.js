const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aztektec321',
    port: 3306,
    database: 'electron'
});

function getConnection() { 
    return connection;
}

module.exports = { getConnection }