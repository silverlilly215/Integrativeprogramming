const db = require('../db'); // Import database connection

// Controller function to fetch all users (including approved and declined)
const getAllUsers = (req, res) => {
  const query = 'SELECT id, first_name, middle_name, last_name, email, status FROM tbl_registration';
  db.execute(query, (err, results) => {
    if (err) {
      console.error('Database error: ', err);
      return res.status(500).json({ message: 'Error fetching users.' });
    }

    res.status(200).json({ users: results });
  });
};

// Controller function to fetch all users with pending status
const getPendingUsers = (req, res) => {
  const query = 'SELECT id, first_name, middle_name, last_name, email, status FROM tbl_registration WHERE status = "pending"';
  db.execute(query, (err, results) => {
    if (err) {
      console.error('Database error: ', err);
      return res.status(500).json({ message: 'Error fetching pending users.' });
    }

    res.status(200).json({ users: results });
  });
};

// Controller function to update user status (approve or decline)
const updateUserStatus = (req, res) => {
  const { id, status } = req.body; // `id` is user ID, `status` is the new status

  if (!id || !status) {
    return res.status(400).json({ message: 'User ID and status are required.' });
  }

  // Ensure valid status
  if (!['approved', 'declined'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }

  const query = 'UPDATE tbl_registration SET status = ? WHERE id = ?';
  db.execute(query, [status, id], (err, results) => {
    if (err) {
      console.error('Database error: ', err);
      return res.status(500).json({ message: 'Error updating user status.' });
    }

    res.status(200).json({ message: `User status updated to ${status}.` });
  });
};

module.exports = {
  getAllUsers, // New function to fetch all users
  getPendingUsers,
  updateUserStatus,
};
