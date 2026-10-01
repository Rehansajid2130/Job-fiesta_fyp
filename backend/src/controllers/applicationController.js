const Application = require('../models/Application');
const Job = require('../models/Job');
const Notification = require('../models/Notification');
const { sendSuccess, sendError, asyncHandler } = require('../utils/response');

/**
 * @desc    Apply to a job with resume, salary expectation & screening answers
 * @route   POST /api/applications/:jobId
 * @access  Private (Jobseeker)
 */
exports.applyToJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const {
    resumeUrl,
    coverLetter,
    expectedSalary,
    portfolioUrl,
    githubUrl,
    experience,
    skills,
    screeningAnswers,
  } = req.body;

  const job = await Job.findById(jobId);
  if (!job) {
    return sendError(res, 'Job posting not found', 404);
  }

  if (job.status !== 'active') {
    return sendError(res, 'This job posting is no longer active', 400);
  }

  // Check if already applied
  const existing = await Application.findOne({
    job: jobId,
    applicant: req.user.id,
  });
  if (existing) {
    return sendError(res, 'You have already applied for this position', 400);
  }

  // Calculate ATS Match Score based on candidate skills vs job requirements/tags
  let matchScore = 85;
  const candidateSkills = Array.isArray(skills) ? skills : (req.user.skills || []);
  const jobRequirements = [...(job.skills || []), ...(job.tags || [])];
  
  if (jobRequirements.length > 0 && candidateSkills.length > 0) {
    const matched = candidateSkills.filter((s) =>
      jobRequirements.some((reqSkill) => reqSkill.toLowerCase().includes(s.toLowerCase()))
    );
    matchScore = Math.min(
      98,
      Math.max(70, Math.round(75 + (matched.length / jobRequirements.length) * 23))
    );
  }

  const application = await Application.create({
    job: jobId,
    applicant: req.user.id,
    resumeUrl: resumeUrl || req.user.resumeUrl || '',
    coverLetter: coverLetter || '',
    expectedSalary: expectedSalary || '',
    portfolioUrl: portfolioUrl || '',
    githubUrl: githubUrl || '',
    experience: experience || '',
    skills: candidateSkills,
    matchScore,
    screeningAnswers: Array.isArray(screeningAnswers) ? screeningAnswers : [],
    status: 'applied',
  });

  // Increment applicantsCount on the job
  await Job.findByIdAndUpdate(jobId, { $inc: { applicantsCount: 1 } });

  // Create notification for recruiter / job creator if available
  if (job.postedBy) {
    await Notification.create({
      recipient: job.postedBy,
      sender: req.user.id,
      title: 'New Candidate Applied 📄',
      message: `${req.user.fullName || 'A candidate'} applied for ${job.title} (${matchScore}% Match).`,
      type: 'application',
      link: '/candidates',
    });
  }

  return sendSuccess(res, application, 'Application submitted successfully', 201);
});

/**
 * @desc    Get current user's submitted applications
 * @route   GET /api/applications/my
 * @access  Private (Jobseeker)
 */
exports.getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ applicant: req.user.id })
    .populate('job')
    .sort({ createdAt: -1 });

  return sendSuccess(res, applications, 'My applications retrieved successfully', 200, {
    count: applications.length,
  });
});

/**
 * @desc    Get candidate pipeline grouped for ATS Kanban board
 * @route   GET /api/applications/candidate-pipeline
 * @access  Private (Employer/Recruiter/Admin)
 */
exports.getCandidatePipeline = asyncHandler(async (req, res) => {
  const { stage, jobId } = req.query;

  const query = {};
  if (stage && stage !== 'all') {
    query.status = stage;
  }
  if (jobId) {
    query.job = jobId;
  }

  // If user is a recruiter with specific posted jobs, filter by those jobs unless admin
  if (req.user.role === 'recruiter' || req.user.role === 'employer') {
    const recruiterJobs = await Job.find({ postedBy: req.user.id }).select('_id');
    const jobIds = recruiterJobs.map((j) => j._id);
    if (jobIds.length > 0 && !query.job) {
      query.job = { $in: jobIds };
    }
  }

  const applications = await Application.find(query)
    .populate('job', 'title company location salary jobType')
    .populate('applicant', 'fullName email avatar phone location headline skills')
    .sort({ createdAt: -1 });

  // Map to unified ATS candidate format
  const candidates = applications.map((app) => ({
    id: app._id,
    applicationId: app._id,
    name: app.applicant?.fullName || 'Anonymous Applicant',
    email: app.applicant?.email || '',
    avatar:
      app.applicant?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
    role: app.job?.title || 'Applicant',
    company: app.job?.company || '',
    jobId: app.job?._id,
    stage: app.status,
    appliedDate: app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Recent',
    experience: app.experience || '3+ Years',
    matchScore: app.matchScore || 85,
    expectedSalary: app.expectedSalary || 'Competitive',
    location: app.applicant?.location || 'Remote',
    skills: app.skills?.length > 0 ? app.skills : app.applicant?.skills || [],
    notes: app.notes || '',
    screeningAnswers: app.screeningAnswers || [],
    resumeUrl: app.resumeUrl || '',
    coverLetter: app.coverLetter || '',
  }));

  return sendSuccess(res, candidates, 'Candidate pipeline retrieved successfully', 200, {
    count: candidates.length,
  });
});

/**
 * State machine rules for candidate application progression
 * Prevents invalid stage skips (e.g. a rejected candidate cannot jump directly to hired)
 */
const ALLOWED_STAGE_TRANSITIONS = {
  applied: ['screening', 'rejected'],
  screening: ['interviewing', 'rejected'],
  interviewing: ['offered', 'rejected'],
  offered: ['hired', 'rejected'],
  hired: [], // Terminal state
  rejected: [], // Terminal state: rejected candidates cannot jump straight to hired
};

/**
 * @desc    Get all applications for a specific job
 * @route   GET /api/applications/job/:jobId
 * @access  Private (Employer/Admin)
 */
exports.getJobApplications = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId);

  if (!job) {
    return sendError(res, 'Job posting not found', 404);
  }

  // IDOR Security: Only the recruiter who created this job (or an admin) can view its applicants
  const isOwner = job.postedBy && job.postedBy.toString() === req.user.id.toString();
  if (!isOwner && req.user.role !== 'admin') {
    return sendError(res, 'Forbidden: You can only view applications for your own job postings', 403);
  }

  const applications = await Application.find({ job: jobId })
    .populate('applicant', 'fullName email avatar headline skills location')
    .sort({ createdAt: -1 });

  return sendSuccess(res, applications, 'Job applications retrieved successfully', 200, {
    count: applications.length,
  });
});

/**
 * @desc    Update candidate application stage in ATS Kanban board
 * @route   PATCH /api/applications/:id/stage
 * @access  Private (Employer/Recruiter/Admin)
 */
exports.updateCandidateStage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { stage, notes } = req.body;

  const validStages = ['applied', 'screening', 'interviewing', 'offered', 'rejected', 'hired'];
  if (stage && !validStages.includes(stage)) {
    return sendError(res, `Invalid stage. Must be one of: ${validStages.join(', ')}`, 400);
  }

  const application = await Application.findById(id).populate('job', 'title company postedBy');
  if (!application) {
    return sendError(res, 'Application not found', 404);
  }

  const job = application.job;
  if (!job) {
    return sendError(res, 'Associated job posting not found', 404);
  }

  // IDOR Security: Recruiter A cannot manipulate candidates for Recruiter B's jobs
  const isOwner = job.postedBy && job.postedBy.toString() === req.user.id.toString();
  if (!isOwner && req.user.role !== 'admin') {
    return sendError(res, 'Forbidden: You can only update candidates for job postings you created', 403);
  }

  // State Transition Machine Validation
  if (stage && stage !== application.status) {
    const allowedNext = ALLOWED_STAGE_TRANSITIONS[application.status] || [];
    if (!allowedNext.includes(stage) && req.user.role !== 'admin') {
      return sendError(
        res,
        `Invalid status transition: Cannot move an application from '${application.status}' directly to '${stage}'. Allowed transitions: [${allowedNext.join(', ')}]`,
        400
      );
    }
    application.status = stage;
  }

  if (notes !== undefined) application.notes = notes;

  await application.save();

  // Create real-time notification for candidate
  const stageLabels = {
    screening: 'Screening Round',
    interviewing: 'Interview Stage',
    offered: 'Offer Extended! 🎉',
    rejected: 'Application Update',
    hired: 'Hired! Welcome to the Team 🎉',
  };

  const stageLabel = stageLabels[stage] || stage;

  await Notification.create({
    recipient: application.applicant,
    sender: req.user.id,
    title: `Application Update: ${stageLabel}`,
    message: `${application.job?.company || 'The recruiter'} moved your application for ${application.job?.title || 'the position'} to ${stage.toUpperCase()}.`,
    type: stage === 'interviewing' ? 'interview' : 'application',
    link: '/jobseeker-dashboard',
  });

  return sendSuccess(res, application, `Candidate moved to ${stage.toUpperCase()}`);
});

/**
 * @desc    Get single application by ID
 * @route   GET /api/applications/:id
 * @access  Private
 */
exports.getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id)
    .populate('job')
    .populate('applicant', 'fullName email avatar phone location headline skills resumeUrl');

  if (!application) {
    return sendError(res, 'Application not found', 404);
  }

  return sendSuccess(res, application, 'Application details retrieved successfully');
});
