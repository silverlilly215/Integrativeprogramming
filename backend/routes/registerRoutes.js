const express = require('express');
const router = express.Router();
const { registerUser } = require('../controller/registerController');

// POST route for registration
router.post('/', registerUser);

module.exports = router;
