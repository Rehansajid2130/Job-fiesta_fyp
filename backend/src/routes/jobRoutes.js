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
  generateJobDescription,
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

// Native in-memory rate limiter for AI Job Description Generation (prevents abuse)
const aiJobAttempts = new Map();
const aiJobRateLimiter = (req, res, next) => {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 20;
  const record = aiJobAttempts.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }
  record.count += 1;
  aiJobAttempts.set(ip, record);
  if (record.count > maxRequests) {
    return res.status(429).json({
      success: false,
      message: 'AI Job Description generation rate limit reached (max 20 requests per 10 mins). Please try again later.'
    });
  }
  next();
};

router.route('/')
  .get(getJobs)
  .post(protect, authorize('employer', 'recruiter', 'admin'), createJob);

router.post('/generate-description', protect, authorize('employer', 'recruiter', 'admin'), aiJobRateLimiter, generateJobDescription);

router.post('/:id/match-resume', matchResumeToJob);

router.route('/:id')
  .get(getJobById)
  .put(protect, authorize('employer', 'recruiter', 'admin'), updateJob)
  .delete(protect, authorize('employer', 'recruiter', 'admin'), deleteJob);

router.post('/:id/save', protect, toggleSaveJob);

module.exports = router;

