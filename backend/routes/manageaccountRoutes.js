const express = require('express');
const router = express.Router();
const { getAllUsers, getPendingUsers, updateUserStatus } = require('../controller/manageaccountController');

// GET route to fetch all users
router.get('/all-users', getAllUsers);

// GET route to fetch pending users
router.get('/pending-users', getPendingUsers);

// PUT route to update user status
router.put('/update-status', updateUserStatus);

module.exports = router;
