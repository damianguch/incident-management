const db = require('../config/db');

function getUser(email) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length === 0) {
        // No user found with this email
        resolve(null);
      } else {
        // User with this email found; now, verify the password
        console.log(results[0]);
        resolve(results[0]);
      }
    });
  });
}

function createUser(name, email, password) {
  return new Promise((resolve, reject) => {
    // Check if the user with the same email already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkQuery, [email], (checkError, results) => {
      if (checkError) {
        reject(checkError);
      } else if (results.length > 0) {
        reject('User with this email already exists.');
      } else {
        // User does not exist, proceed with insertion
        const insertQuery =
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(insertQuery, [name, email, password], (insertError) => {
          if (insertError) {
            reject(insertError.message);
          } else {
            resolve('User created successfully');
          }
        });
      }
    });
  });
}

module.exports = {
  createUser,
  getUser
};
