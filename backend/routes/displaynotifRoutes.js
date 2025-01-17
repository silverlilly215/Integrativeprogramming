// displaynotifRoutes.js

const express = require('express');
const displayNotifController = require('../controller/displaynotifController');

const router = express.Router();

// Route to get ASOLC Scholarship data
router.get('/asolc-scholarship', displayNotifController.getASOLCScholarship);

module.exports = router;
