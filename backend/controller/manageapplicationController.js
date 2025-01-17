const db = require('../db');

const getAllApplications = (req, res) => {
  const query = 'SELECT id, name_of_august_sister, first_name, middle_name, last_name, relationship, dob, fathers_name, mothers_name, address, school_last_attended, school_address, level_of_education, status, asas_school_applied_for FROM tbl_asolc_scholarship';
  
  db.execute(query, (err, results) => {
    if (err) {
      console.error('Database error: ', err);
      return res.status(500).json({ message: 'Error fetching applications.' });
    }

    // Ensure that level_of_education is parsed as a JSON object
    results = results.map(app => {
      if (app.level_of_education) {
        try {
          app.level_of_education = JSON.parse(app.level_of_education);
        } catch (e) {
          console.error('Error parsing level_of_education:', e);
          app.level_of_education = null;
        }
      }
      return app;
    });

    res.status(200).json({ applications: results });
  });
};

const getPendingApplications = (req, res) => {
  const query = 'SELECT id, name_of_august_sister, first_name, middle_name, last_name, relationship, dob, fathers_name, mothers_name, address, school_last_attended, school_address, level_of_education, status, asas_school_applied_for FROM tbl_asolc_scholarship WHERE status = "pending"';
  
  db.execute(query, (err, results) => {
    if (err) {
      console.error('Database error: ', err);
      return res.status(500).json({ message: 'Error fetching pending applications.' });
    }

    // Ensure that level_of_education is parsed as a JSON object
    results = results.map(app => {
      if (app.level_of_education) {
        try {
          app.level_of_education = JSON.parse(app.level_of_education);
        } catch (e) {
          console.error('Error parsing level_of_education:', e);
          app.level_of_education = null;
        }
      }
      return app;
    });

    res.status(200).json({ applications: results });
  });
};


const updateApplicationStatus = (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ message: 'Application ID and status are required.' });
  }

  if (!['approved', 'declined'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }

  const query = 'UPDATE tbl_asolc_scholarship SET status = ? WHERE id = ?';
  db.execute(query, [status, id], (err, results) => {
    if (err) {
      console.error('Database error: ', err);
      return res.status(500).json({ message: 'Error updating application status.' });
    }

    res.status(200).json({ message: `Application status updated to ${status}.` });
  });
};


const editApplication = (req, res) => {
  const { id, first_name, middle_name, last_name, fathers_name, mothers_name, address, school_last_attended, school_address, level_of_education, status, asas_school_applied_for } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Application ID is required.' });
  }

  const query = `
    UPDATE tbl_asolc_scholarship 
    SET 
      first_name = ?, 
      middle_name = ?, 
      last_name = ?, 
      fathers_name = ?, 
      mothers_name = ?, 
      address = ?, 
      school_last_attended = ?, 
      school_address = ?, 
      level_of_education = ?, 
      status = ?, 
      asas_school_applied_for = ?
    WHERE id = ?`;

  db.execute(
    query,
    [
      first_name,
      middle_name,
      last_name,
      fathers_name,
      mothers_name,
      address,
      school_last_attended,
      school_address,
      JSON.stringify(level_of_education), // Save as JSON string
      status,
      asas_school_applied_for,
      id
    ],
    (err, results) => {
      if (err) {
        console.error('Database error: ', err);
        return res.status(500).json({ message: 'Error updating application.' });
      }

      res.status(200).json({ message: 'Application updated successfully.' });
    }
  );
};

// Delete an application
const deleteApplication = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Application ID is required.' });
  }

  const query = 'DELETE FROM tbl_asolc_scholarship WHERE id = ?';

  db.execute(query, [id], (err, results) => {
    if (err) {
      console.error('Database error: ', err);
      return res.status(500).json({ message: 'Error deleting application.' });
    }

    res.status(200).json({ message: 'Application deleted successfully.' });
  });
};

module.exports = {
  getAllApplications,
  getPendingApplications,
  updateApplicationStatus,
  editApplication,
  deleteApplication,
};
