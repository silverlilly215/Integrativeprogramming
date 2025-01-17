const bcrypt = require('bcrypt');
const db = require('../db'); // Import database connection

// Controller function to handle registration
const registerUser = async (req, res) => {
  const { firstName, middleName, lastName, email, password, confirmPassword, idNumber } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !password || !confirmPassword || !idNumber) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password with a salt rounds of 10

    // Check if the email already exists in the database
    const checkEmailQuery = 'SELECT * FROM tbl_registration WHERE email = ?';
    db.execute(checkEmailQuery, [email], (err, results) => {
      if (err) {
        console.error('Database error: ', err);
        return res.status(500).json({ message: 'Server error, please try again later.' });
      }

      // If email already exists, return error
      if (results.length > 0) {
        return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
      }

      // Insert user data into the database (including middle name and id number)
      const query = 'INSERT INTO tbl_registration (first_name, middle_name, last_name, email, password, id_number, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.execute(query, [firstName, middleName, lastName, email, hashedPassword, idNumber, 'pending'], (err, results) => {
        if (err) {
          console.error('Database error: ', err);
          return res.status(500).json({ message: 'Server error, please try again later.' });
        }

        res.status(201).json({ message: 'User registered successfully! Please await approval.' });
      });
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    return res.status(500).json({ message: 'Internal server error during password hashing.' });
  }
};

module.exports = {
  registerUser,
};
