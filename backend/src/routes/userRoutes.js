const express = require('express');
const router = express.Router();
const { updateProfile, getSavedJobs, getUserByUsername, deleteAccount, exportUserData } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.put('/profile', protect, updateProfile);
// ponytail: GDPR Art. 17 Right to Erasure & Art. 20 Data Portability endpoints
router.delete('/profile', protect, deleteAccount);
router.get('/export-data', protect, exportUserData);
router.get('/saved-jobs', protect, getSavedJobs);
router.get('/:username', getUserByUsername);

module.exports = router;
