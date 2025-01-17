// routes/viewapplicationRoutes.js
const express = require("express");
const router = express.Router();
const { getApplicationStatus } = require("../controller/viewapplicationController");

// Route to fetch application status for a specific user
router.get("/:userId", getApplicationStatus);

module.exports = router;
