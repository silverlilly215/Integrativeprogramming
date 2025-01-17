const express = require('express');
const multer = require('multer');
const { addAcademicAchievement } = require('../controller/academicController'); // Correct import

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/documents/', // Directory to save uploaded files
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only .pdf, .doc, .docx, .jpg, and .png files are allowed'));
    }
    cb(null, true);
  },
});

const router = express.Router();

// Route for submitting academic achievement form (for multiple files)
router.post('/submit', upload.array('documents', 5), addAcademicAchievement); // 5 is the max number of files allowed

module.exports = { router, upload };
