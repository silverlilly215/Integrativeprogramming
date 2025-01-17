const express = require('express');
const router = express.Router();
const { loginUser } = require('../controller/loginController');

// POST route for login
router.post('/', loginUser);

module.exports = router;
