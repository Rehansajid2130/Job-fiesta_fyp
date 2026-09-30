const express = require('express');
const router = express.Router();
const {
  applyToJob,
  getMyApplications,
  getCandidatePipeline,
  getJobApplications,
  updateCandidateStage,
  getApplicationById,
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

// Candidate ATS Pipeline for recruiters/employers
router.get('/candidate-pipeline', protect, authorize('recruiter', 'employer', 'admin'), getCandidatePipeline);

// Jobseeker applications
router.get('/my', protect, authorize('jobseeker', 'admin'), getMyApplications);

// Apply to a specific job
router.post('/:jobId', protect, authorize('jobseeker', 'admin'), applyToJob);

// Applications for a specific job
router.get('/job/:jobId', protect, authorize('recruiter', 'employer', 'admin'), getJobApplications);

// Update candidate ATS Kanban stage
router.patch('/:id/stage', protect, authorize('recruiter', 'employer', 'admin'), updateCandidateStage);
router.patch('/:id/status', protect, authorize('recruiter', 'employer', 'admin'), updateCandidateStage);

// Single application details
router.get('/:id', protect, getApplicationById);

module.exports = router;
