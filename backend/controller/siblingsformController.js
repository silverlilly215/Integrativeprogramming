const db = require('../db'); // Your database connection module

const addSibling = (req, res) => {
  const {
    siblingName,
    siblingAge,
    relationship,
    educationLevel,
    schoolName,
    schoolAddress,
  } = req.body;

  // Validate required fields
  if (!siblingName || !siblingAge || !relationship || !educationLevel || !schoolName || !schoolAddress) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = `
    INSERT INTO siblings_info 
    (sibling_name, sibling_age, relationship, education_level, school_name, school_address) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [siblingName, siblingAge, relationship, educationLevel, schoolName, schoolAddress];

  // Execute query
  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting sibling data:', err.message, err.stack);
      return res.status(500).json({ error: 'An error occurred while submitting sibling information.' });
    }
    res.status(201).json({ message: 'Sibling information submitted successfully.' });
  });
};

module.exports = {
  addSibling,
};
