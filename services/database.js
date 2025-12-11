const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 't24SSr6K',
  database: process.env.DB_NAME || 'Recipio',
  waitForConnections: true,
  connectionLimit: 10,
  authPlugins: {
    sha256_password: () => () => Buffer.from(require('crypto').createHash('sha256').update(process.env.DB_PASSWORD || 't24SSr6K').digest('hex'))
  }
});

module.exports = pool;
