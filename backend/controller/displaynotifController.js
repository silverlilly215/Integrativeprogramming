const db = require('../db'); // Import the db connection

const displayNotifController = {
  getASOLCScholarship: (req, res) => {
    const query = `
      SELECT 
        a.registration_id,
        a.name_of_august_sister,
        r.first_name,
        r.middle_name,
        r.last_name,
        a.relationship,
        a.dob
      FROM 
        tbl_asolc_scholarship a
      JOIN 
        tbl_registration r 
      ON 
        a.registration_id = r.id
    `;
    
    console.log("Executing query:", query); // Debugging query

    // Using query() with a callback
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching ASOLC Scholarship data:', error);  // Detailed error logging
        return res.status(500).json({ error: 'Failed to fetch ASOLC Scholarship data', details: error.message });
      }

      // Send results back as JSON
      res.status(200).json(results);
    });
  },
};

module.exports = displayNotifController;
