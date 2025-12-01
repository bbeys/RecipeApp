const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',              // Your MySQL username
  password: '',              // Your MySQL password
  database: 'Recipio',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
