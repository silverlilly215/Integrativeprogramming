const db = require('../db'); // Your MySQL connection

const addAcademicAchievement = (req, res) => {
  const { name, course, yearLevel, contact_number } = req.body;
  const files = req.files; // Array of uploaded files

  // Ensure required fields are present
  if (!name || !course || !yearLevel || !contact_number || !files || files.length === 0) {
    return res.status(400).json({ error: 'All fields are required and at least one document must be uploaded.' });
  }

  files.forEach((file) => {
    const query = `
      INSERT INTO academic_achievements 
      (name, course, year_level, contact_number, document_path)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const values = [
      name,
      course,
      yearLevel,
      contact_number,
      file.path, // Store the file path in the database
    ];

    db.query(query, values, (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ error: 'Error inserting data into database' });
      }
    });
  });

  return res.status(201).json({ message: 'Data submitted successfully!' });
};

module.exports = { addAcademicAchievement };
