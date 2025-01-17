const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
  host: 'localhost',  // Your MySQL host (usually localhost)
  user: 'root',       // Your MySQL username
  password: '',       // Your MySQL password
  database: 'db_scholarship' // Your database name
});

module.exports = db;
