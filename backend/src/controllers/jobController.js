const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Get all jobs with search, filtering, sorting, pagination
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res, next) => {
  try {
    const {
      q,
      keyword,
      location,
      workplaceType,
      jobType,
      experienceLevel,
      minSalary,
      maxSalary,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    const query = { status: 'active' };

    // Search query keyword
    const searchTerm = q || keyword;
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { company: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { skills: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    // Location filter
    if (location && location !== 'All' && location.trim() !== '') {
      query.location = { $regex: location.trim(), $options: 'i' };
    }

    // Workplace type filter (Remote, On-site, Hybrid)
    if (workplaceType && workplaceType !== 'All') {
      const types = workplaceType.split(',').map((t) => t.trim());
      query.workplaceType = { $in: types };
    }

    // Job type filter (Full-time, Part-time, Contract, Internship)
    if (jobType && jobType !== 'All') {
      const types = jobType.split(',').map((t) => t.trim());
      query.jobType = { $in: types };
    }

    // Experience level filter
    if (experienceLevel && experienceLevel !== 'All') {
      const levels = experienceLevel.split(',').map((l) => l.trim());
      query.experienceLevel = { $in: levels };
    }

    // Salary filter
    if (minSalary) {
      query.salaryMax = { $gte: Number(minSalary) };
    }
    if (maxSalary) {
      query.salaryMin = { $lte: Number(maxSalary) };
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // default newest
    if (sort === 'popular') {
      sortOption = { applicantsCount: -1, viewsCount: -1 };
    } else if (sort === 'salary_high') {
      sortOption = { salaryMax: -1 };
    } else if (sort === 'salary_low') {
      sortOption = { salaryMin: 1 };
    } else if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    }

    // Pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const total = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .populate('postedBy', 'fullName email companyDetails avatar');

    res.status(200).json({
      success: true,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum) || 1,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewsCount: 1 } },
      { new: true }
    ).populate('postedBy', 'fullName email companyDetails avatar');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new job posting
// @route   POST /api/jobs
// @access  Private (Employer/Admin)
exports.createJob = async (req, res, next) => {
  try {
    const jobData = {
      ...req.body,
      postedBy: req.user.id,
    };

    const job = await Job.create(jobData);

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a job posting
// @route   PUT /api/jobs/:id
// @access  Private (Employer/Admin)
exports.updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    // Verify ownership or admin role
    if (
      job.postedBy &&
      job.postedBy.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this job posting',
      });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a job posting
// @route   DELETE /api/jobs/:id
// @access  Private (Employer/Admin)
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

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
        message: 'You are not authorized to delete this job posting',
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Job posting removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle bookmark/save a job
// @route   POST /api/jobs/:id/save
// @access  Private
exports.toggleSaveJob = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const jobId = req.params.id;

    const isSaved = user.savedJobs.includes(jobId);

    if (isSaved) {
      user.savedJobs = user.savedJobs.filter(
        (id) => id.toString() !== jobId.toString()
      );
    } else {
      user.savedJobs.push(jobId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      isSaved: !isSaved,
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    next(error);
  }
};
