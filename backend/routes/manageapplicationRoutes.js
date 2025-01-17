const express = require('express');
const router = express.Router();
const manageapplicationController = require('../controller/manageapplicationController');

// Route to fetch all applications
router.get('/applications', manageapplicationController.getAllApplications);

// Route to fetch only pending applications
router.get('/pending-applications', manageapplicationController.getPendingApplications);

// Route to update application status (approve or decline)
router.post('/update-status', manageapplicationController.updateApplicationStatus);

// Route to edit an application
router.put('/edit', manageapplicationController.editApplication);

// Route to delete an application
router.delete('/delete/:id', manageapplicationController.deleteApplication);

module.exports = router;
