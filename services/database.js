const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',              // Your MySQL username
  password: 't24SSr6K',      // Your MySQL password
  database: 'Recipio',
  waitForConnections: true,
  connectionLimit: 10,
  authPlugins: {
    sha256_password: () => () => Buffer.from(require('crypto').createHash('sha256').update('t24SSr6K').digest('hex'))
  }
});

module.exports = pool;
