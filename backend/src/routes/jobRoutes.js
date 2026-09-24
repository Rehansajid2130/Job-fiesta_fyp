const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  toggleSaveJob,
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getJobs)
  .post(protect, authorize('employer', 'admin'), createJob);

router.route('/:id')
  .get(getJobById)
  .put(protect, authorize('employer', 'admin'), updateJob)
  .delete(protect, authorize('employer', 'admin'), deleteJob);

router.post('/:id/save', protect, toggleSaveJob);

module.exports = router;
