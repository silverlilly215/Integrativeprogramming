const bcrypt = require('bcrypt');
const db = require('../db'); // Import database connection

// Controller function to handle login
const loginUser = (req, res) => {
  const { idNumber, password } = req.body; // Using idNumber instead of email

  // Validate input
  if (!idNumber || !password) {
    return res.status(400).json({ message: 'Please fill in both fields' });
  }

  const query = 'SELECT * FROM tbl_registration WHERE id_number = ?'; // Change email to id_number
  db.execute(query, [idNumber], (err, results) => {
    if (err) {
      console.error('Database error: ', err);
      return res.status(500).json({ message: 'Server error, please try again later.' });
    }

    

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = results[0]; // Get the first user

    // Log the full user object to inspect the fields
   

    // Check if the account status is declined
    if (user.status === 'declined') {
      return res.status(400).json({ message: 'Your account has been declined. Please contact admin.' });
    }

    // Check if the account status is pending
    if (user.status === 'pending') {
      return res.status(400).json({ message: 'Your account is pending approval. Please wait for the admin to approve your account.' });
    }

    // Compare password with stored hash
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if user is admin
      const role = user.email === 'admin@yahoo.com' ? 'admin' : 'user';

      // Send user data (including userId and role) to the frontend
      res.status(200).json({
        success: true,
        role,
        user: {
          id: user.id, // Ensure the column name matches exactly
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
      });
    });
  });
};

module.exports = {
  loginUser,
};
