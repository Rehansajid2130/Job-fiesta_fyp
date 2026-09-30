const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  toggleSaveJob,
  matchResumeToJob,
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getJobs)
  .post(protect, authorize('employer', 'recruiter', 'admin'), createJob);

router.post('/:id/match-resume', matchResumeToJob);

router.route('/:id')
  .get(getJobById)
  .put(protect, authorize('employer', 'recruiter', 'admin'), updateJob)
  .delete(protect, authorize('employer', 'recruiter', 'admin'), deleteJob);

router.post('/:id/save', protect, toggleSaveJob);

module.exports = router;

