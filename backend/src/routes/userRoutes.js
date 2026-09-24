const express = require('express');
const router = express.Router();
const { updateProfile, getSavedJobs } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.put('/profile', protect, updateProfile);
router.get('/saved-jobs', protect, getSavedJobs);

module.exports = router;
