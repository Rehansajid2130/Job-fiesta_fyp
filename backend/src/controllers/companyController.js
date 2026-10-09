const Company = require('../models/Company');
const Job = require('../models/Job');
const { sendSuccess, sendError, asyncHandler } = require('../utils/response');

/**
 * @desc    Get all companies with search & industry filter
 * @route   GET /api/companies
 * @access  Public
 */
const getCompanies = asyncHandler(async (req, res) => {
  const { search, industry, sort, page = 1, limit = 20 } = req.query;

  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { tagline: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
      { techStack: { $regex: search, $options: 'i' } },
    ];
  }

  if (industry && industry !== 'all') {
    query.industry = industry;
  }

  let sortQuery = { rating: -1, createdAt: -1 };
  if (sort === 'name') {
    sortQuery = { name: 1 };
  } else if (sort === 'jobs') {
    sortQuery = { reviewCount: -1 };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [companies, total] = await Promise.all([
    Company.find(query).sort(sortQuery).skip(skip).limit(Number(limit)),
    Company.countDocuments(query),
  ]);

  // Attach dynamic open job counts from Job collection
  const companiesWithCounts = await Promise.all(
    companies.map(async (comp) => {
      const jobCount = await Job.countDocuments({
        company: { $regex: `^${comp.name}$`, $options: 'i' },
      });
      const obj = comp.toObject();
      obj.openJobCount = jobCount;
      return obj;
    })
  );

  return sendSuccess(
    res,
    companiesWithCounts,
    'Companies retrieved successfully',
    200,
    {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    }
  );
});

/**
 * @desc    Get single company by ID or Slug with active jobs
 * @route   GET /api/companies/:idOrSlug
 * @access  Public
 */
const getCompany = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  let company;
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    company = await Company.findById(idOrSlug);
  } else {
    company = await Company.findOne({
      $or: [{ slug: idOrSlug.toLowerCase() }, { name: { $regex: `^${idOrSlug}$`, $options: 'i' } }],
    });
  }

  if (!company) {
    return sendError(res, 'Company not found', 404);
  }

  // Find all active open jobs for this company
  const jobs = await Job.find({
    company: { $regex: `^${company.name}$`, $options: 'i' },
  }).sort({ createdAt: -1 });

  const result = company.toObject();
  result.openJobs = jobs;
  result.openJobCount = jobs.length;

  return sendSuccess(res, result, 'Company details retrieved successfully');
});

/**
 * @desc    Create new company profile
 * @route   POST /api/companies
 * @access  Private (Recruiter/Employer/Admin)
 */
const createCompany = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const existing = await Company.findOne({
    name: { $regex: `^${name}$`, $options: 'i' },
  });

  if (existing) {
    return sendError(res, 'A company with this name already exists', 400);
  }

  const company = await Company.create({
    ...req.body,
    creator: req.user ? req.user._id : undefined,
  });

  return sendSuccess(res, company, 'Company profile created successfully', 211);
});

/**
 * @desc    Update company profile
 * @route   PUT /api/companies/:id
 * @access  Private (Recruiter/Employer/Admin)
 */
const updateCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return sendError(res, 'Company not found', 404);
  }

  // IDOR Defense: Only the company creator or an admin can update this company profile
  const isCreator = company.creator && company.creator.toString() === req.user._id.toString();
  if (!isCreator && req.user.role !== 'admin') {
    return sendError(res, 'Forbidden: You are not authorized to edit this company profile', 403);
  }

  const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return sendSuccess(res, updatedCompany, 'Company profile updated successfully');
});

module.exports = {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
};
