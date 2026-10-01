const express = require('express');
const router = express.Router();
const { updateProfile, getSavedJobs, getUserByUsername } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.put('/profile', protect, updateProfile);
router.get('/saved-jobs', protect, getSavedJobs);
router.get('/:username', getUserByUsername);

module.exports = router;
