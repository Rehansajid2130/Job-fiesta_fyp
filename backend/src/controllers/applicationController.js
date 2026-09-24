const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply to a job
// @route   POST /api/applications/:jobId
// @access  Private (Jobseeker)
exports.applyToJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { resumeUrl, coverLetter } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    if (job.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This job posting is no longer active',
      });
    }

    // Check if already applied
    const existing = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this position',
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      resumeUrl: resumeUrl || req.user.resumeUrl,
      coverLetter: coverLetter || '',
    });

    // Increment applicantsCount on the job
    await Job.findByIdAndUpdate(jobId, { $inc: { applicantsCount: 1 } });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's submitted applications
// @route   GET /api/applications/my
// @access  Private (Jobseeker)
exports.getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all applications for a specific job
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer/Admin)
exports.getJobApplications = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    if (
      job.postedBy &&
      job.postedBy.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view applications for this job',
      });
    }

    const applications = await Application.find({ job: jobId })
      .populate('applicant', 'fullName email phone avatar headline location skills resumeUrl')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status
// @route   PATCH /api/applications/:id/status
// @access  Private (Employer/Admin)
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;

    const application = await Application.findById(req.params.id).populate('job');
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    if (
      application.job.postedBy &&
      application.job.postedBy.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this application',
      });
    }

    if (status) application.status = status;
    if (notes !== undefined) application.notes = notes;

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application updated successfully',
      application,
    });
  } catch (error) {
    next(error);
  }
};
