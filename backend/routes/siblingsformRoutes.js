// siblingsformRoutes.js
const express = require('express');
const { addSibling } = require('../controller/siblingsformController');

const router = express.Router();

// Route for adding sibling information
router.post('/add-sibling', addSibling);

module.exports = router;
