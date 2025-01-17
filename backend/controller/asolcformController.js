const db = require('../db'); // Import the db module

const submitApplication = (req, res) => {
  const {
    nameOfAugustSister,
    firstName,
    middleName,
    lastName,
    relationship,
    dob,
    fathersName,
    mothersName,
    address,
    schoolLastAttended,
    asasSchoolAppliedFor,
    schoolAddress,
    levelOfEducation,
    gradeLevelElementary,
    gradeLevelSecondary,
    courseYearCollege,
    status = 'pending',
    registration_id: userId,
  } = req.body;



  // Validate required fields
  if (!userId || !nameOfAugustSister || !firstName || !lastName || !dob || !fathersName || !mothersName || !address) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  // Validate registration_id existence
  const checkUserQuery = 'SELECT id FROM tbl_registration WHERE id = ?';
  db.query(checkUserQuery, [userId], (err, result) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).json({ message: 'Internal server error.' });
    }
    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid registration_id. User does not exist.' });
    }

    // Parse levelOfEducation
    let parsedLevelOfEducation = {};
    try {
      parsedLevelOfEducation = JSON.parse(levelOfEducation);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid levelOfEducation format.' });
    }

    // Insert application data
    const query = `
      INSERT INTO tbl_asolc_scholarship (
        registration_id,
        name_of_august_sister,
        first_name,
        middle_name,
        last_name,
        relationship,
        dob,
        fathers_name,
        mothers_name,
        address,
        school_last_attended,
        asas_school_applied_for,
        school_address,
        level_of_education,
        grade_level_elementary,
        grade_level_secondary,
        course_year_college,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      userId,
      nameOfAugustSister,
      firstName,
      middleName,
      lastName,
      relationship,
      dob,
      fathersName,
      mothersName,
      address,
      schoolLastAttended,
      asasSchoolAppliedFor,
      schoolAddress,
      JSON.stringify(parsedLevelOfEducation),
      gradeLevelElementary,
      gradeLevelSecondary,
      courseYearCollege,
      status,
    ];

    db.query(query, values, (error, results) => {
      if (error) {
        console.error('Error saving application:', error);
        return res.status(500).json({ message: 'Failed to submit application.' });
      }

      res.status(200).json({ message: 'Application submitted successfully!' });
    });
  });
};


const getUserInfo = (req, res) => {
  const { userId } = req.params;  // Retrieve the userId from the route parameter
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  const query = `
    SELECT first_name, middle_name, last_name
    FROM tbl_registration
    WHERE id = ?;
  `;

  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching user info:', error);
      return res.status(500).json({ message: 'Failed to fetch user information.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(results[0]);
  });
};




module.exports = {
  submitApplication,
  getUserInfo,
};
