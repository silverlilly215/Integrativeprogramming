const db = require("../db");  // Correctly import the database connection

const getApplicationStatus = (req, res) => {
  const userId = req.params.userId;

  // Validate userId
  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  // Use callback-based query (no async/await)
  db.query(`
    SELECT s.id, s.status
    FROM tbl_asolc_scholarship s
    INNER JOIN tbl_registration r ON r.id = s.registration_id
    WHERE r.id = ?
  `, [userId], (err, rows) => {
    // Error handling
    if (err) {
      console.error("Error fetching applications:", err);
      return res.status(500).json({ error: "Failed to fetch applications." });
    }

    // Check if no applications were found
    if (rows.length === 0) {
      return res.status(404).json({ message: "No applications found for this user." });
    }

    // Map the rows to a specific structure
    // Map the rows to a specific structure
const mappedRows = rows.map((row) => ({
  title: `Scholarship Application #${row.id}`,
  description: row.status.toLowerCase() === 'pending' ? 'Your application is under review.' :
               row.status.toLowerCase() === 'approved' ? 'Your application has been approved!' :
               'Unfortunately, your application has been declined.',
  status: row.status
}));


    // Send response with mapped data
    res.status(200).json(mappedRows);
  });
};

module.exports = { getApplicationStatus };
