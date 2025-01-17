const express = require('express');
const router = express.Router();
const { submitApplication, getUserInfo } = require('../controller/asolcformController');

// Route for submitting the application
router.post('/submit', submitApplication);

// Route for getting user info by userId
router.get('/user/:userId', getUserInfo);

module.exports = router;
