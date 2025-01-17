const express = require('express');
const multer = require('multer');
const { submitVarsityApplication } = require('../controller/varsityController');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Only .pdf, .doc, .docx, .jpg, and .png files are allowed"));
        }
        cb(null, true);
    },
});

// Define the routes
router.post('/submit', upload.array('documents', 5), submitVarsityApplication);

module.exports = router;
