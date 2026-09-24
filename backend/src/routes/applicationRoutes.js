const express = require('express');
const router = express.Router();
const {
  applyToJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/:jobId', protect, authorize('jobseeker'), applyToJob);
router.get('/my', protect, authorize('jobseeker'), getMyApplications);
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getJobApplications);
router.patch('/:id/status', protect, authorize('employer', 'admin'), updateApplicationStatus);

module.exports = router;
