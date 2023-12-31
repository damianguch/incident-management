const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
};

con = mysql.createConnection(config.db);

con.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connection successful!');
  }
});

module.exports = con;
