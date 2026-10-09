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

    // Search query: Use high-efficiency MongoDB text index
    const searchTerm = (q || keyword || '').trim();
    let isTextSearch = false;
    if (searchTerm) {
      query.$text = { $search: searchTerm };
      isTextSearch = true;
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
    if (isTextSearch && (!sort || sort === 'relevance')) {
      sortOption = { score: { $meta: 'textScore' } };
    } else if (sort === 'popular') {
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
    const jobs = await Job.find(query, isTextSearch ? { score: { $meta: 'textScore' } } : {})
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

    // Verify ownership or admin role (Strict IDOR Prevention)
    const isOwner = job.postedBy && job.postedBy.toString() === req.user.id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You are not authorized to update this job posting',
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

    // Verify ownership or admin role (Strict IDOR Prevention)
    const isOwner = job.postedBy && job.postedBy.toString() === req.user.id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You are not authorized to delete this job posting',
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

// @desc    Match candidate resume against a job for ATS scoring
// @route   POST /api/jobs/:id/match-resume
// @access  Public / Private
exports.matchResumeToJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    const { resumeText = '', skills = [] } = req.body;

    const normalizedResume = (resumeText + ' ' + skills.join(' ')).toLowerCase();
    const jobRequirements = [
      ...(job.requirements || []),
      ...(job.skills || []),
      ...(job.tags || []),
    ];

    const matchedSkills = [];
    const missingSkills = [];

    // Collect keywords from job
    const keywords = [
      'react', 'typescript', 'javascript', 'node', 'express', 'python', 'mongodb', 
      'docker', 'aws', 'kubernetes', 'figma', 'ui', 'ux', 'rest', 'graphql',
      'pytorch', 'sql', 'next.js', 'css', 'html', 'tailwind', 'git'
    ].filter((k) => 
      job.title.toLowerCase().includes(k) ||
      job.description.toLowerCase().includes(k) ||
      jobRequirements.some((r) => r.toLowerCase().includes(k))
    );

    keywords.forEach((keyword) => {
      if (normalizedResume.includes(keyword)) {
        matchedSkills.push(keyword);
      } else {
        missingSkills.push(keyword);
      }
    });

    const totalKeyCount = keywords.length || 1;
    const matchPercentage = Math.min(
      99,
      Math.max(50, Math.round((matchedSkills.length / totalKeyCount) * 100))
    );

    const feedback = [];
    if (matchPercentage >= 85) {
      feedback.push('High ATS alignment! Your profile strongly mirrors the role requirements.');
    } else if (matchPercentage >= 70) {
      feedback.push('Solid foundation. Adding keyword examples for missing skills will boost your ranking.');
    } else {
      feedback.push('Consider tailoring your resume summary and bullet points to include key role technologies.');
    }

    res.status(200).json({
      success: true,
      matchPercentage,
      matchedSkills,
      missingSkills,
      feedback,
      jobTitle: job.title,
      company: job.company,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate AI-assisted Job Description, Requirements, and Benefits
// @route   POST /api/jobs/generate-description
// @access  Private (Recruiter / Employer / Admin)
exports.generateJobDescription = async (req, res, next) => {
  try {
    const { title = '', category = 'tech', experienceLevel = 'Mid-Senior', type = 'Full-Time', company = 'Our Organization' } = req.body;

    if (!title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a job title to generate the description.'
      });
    }

    const cleanTitle = title.trim();
    const lowerTitle = cleanTitle.toLowerCase();

    // Contextual role-based generation
    let description = '';
    let requirements = '';
    let benefits = '';
    let tags = [];

    if (lowerTitle.includes('react') || lowerTitle.includes('frontend') || lowerTitle.includes('front-end') || lowerTitle.includes('ui developer')) {
      description = `We are seeking an innovative and detail-oriented ${cleanTitle} to lead the design and implementation of modern, high-performance web applications at ${company}. In this role, you will collaborate closely with product managers, UX designers, and backend architects to deliver responsive, accessible, and delightful digital experiences for hundreds of thousands of users. You will champion frontend architecture standards, component reusability, and Core Web Vitals optimization across our platform.`;
      requirements = [
        `Proven hands-on experience building production-grade web applications with React, TypeScript, and modern JavaScript (ES6+).`,
        `Deep understanding of state management (Zustand, Redux, or React Context) and responsive styling frameworks.`,
        `Track record of optimizing Core Web Vitals, browser rendering performance, and bundle size reduction.`,
        `Experience with modern build pipelines (Vite, Webpack), unit testing (Vitest, Jest), and CI/CD workflows.`,
        `Strong eye for UX craftsmanship, micro-interactions, and accessibility (WCAG AA compliance).`
      ].join('\n');
      benefits = [
        `Competitive salary package with annual performance incentives.`,
        `Comprehensive medical, dental, and vision health coverage.`,
        `Flexible remote / hybrid work arrangements with home office stipend.`,
        `$2,500 annual continuing education & tech conference budget.`,
        `Generous paid time off (PTO) plus wellness recharge days.`
      ].join('\n');
      tags = ['React', 'TypeScript', 'JavaScript', 'TailwindCSS', 'REST APIs', 'Frontend Architecture'];
    } else if (lowerTitle.includes('backend') || lowerTitle.includes('node') || lowerTitle.includes('python') || lowerTitle.includes('api')) {
      description = `At ${company}, we are looking for an experienced ${cleanTitle} to architect, scale, and maintain our mission-critical backend services and APIs. You will own server-side logic, database query performance, asynchronous task queues, and third-party integrations, ensuring our infrastructure operates reliably with 99.95%+ uptime under heavy traffic loads.`;
      requirements = [
        `Strong backend development background with Node.js/Express, Python/FastAPI, or Go in distributed environments.`,
        `Expertise in relational (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) database design and query tuning.`,
        `Experience designing secure, RESTful and GraphQL APIs with robust rate limiting and OAuth2/JWT authentication.`,
        `Familiarity with containerization (Docker), cloud infrastructure (AWS/GCP), and message brokers (RabbitMQ/Kafka).`,
        `Commitment to clean architecture, automated integration testing, and defensive security practices.`
      ].join('\n');
      benefits = [
        `Top-tier compensation package with equity options.`,
        `Premium health, dental, and disability coverage for you and your family.`,
        `Work anywhere flexibility with async-first team culture.`,
        `Hardware budget: High-spec laptop plus monitor setup of your choice.`,
        `401(k) matching up to 5% with immediate vesting.`
      ].join('\n');
      tags = ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'RESTful APIs', 'AWS'];
    } else if (lowerTitle.includes('full stack') || lowerTitle.includes('fullstack') || lowerTitle.includes('software engineer')) {
      description = `${company} is looking for a versatile ${cleanTitle} to bridge the gap between dynamic frontend interfaces and robust backend architectures. You will drive feature initiatives end-to-end—from schema modeling and microservice communication to crafting responsive user journeys. You thrive in high-autonomy environments and take genuine pride in shipping clean, tested software.`;
      requirements = [
        `Solid full-stack engineering track record working across React/Next.js frontend and Node/Express or Python backend.`,
        `Demonstrated skill in database modeling, ORM/ODM management, and indexed query optimization.`,
        `Experience deploying and maintaining cloud applications using Docker, GitHub Actions, and cloud services.`,
        `Strong communication skills and enthusiasm for collaborating with cross-functional design and product squads.`,
        `Comfortable mentoring junior engineers and leading collaborative code reviews.`
      ].join('\n');
      benefits = [
        `Competitive salary with bi-annual performance bonuses.`,
        `Full health insurance coverage and mental health wellness benefits.`,
        `Flexible working hours and supportive work-life balance.`,
        `Paid parental leave and continuous learning stipends.`,
        `Annual team retreats and social hackathons.`
      ].join('\n');
      tags = ['Full Stack', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'System Design'];
    } else if (lowerTitle.includes('design') || lowerTitle.includes('ui') || lowerTitle.includes('ux') || lowerTitle.includes('product designer')) {
      description = `We are searching for an empathetic and visually exceptional ${cleanTitle} to elevate our product experience at ${company}. You will translate complex user workflows into intuitive, beautiful interfaces that drive conversion and engagement. You will lead design systems, conduct user testing, and partner seamlessly with frontend engineers to see your vision realized in production.`;
      requirements = [
        `Compelling portfolio demonstrating modern UI/UX product design, interactive prototypes, and scalable design systems.`,
        `Expert proficiency in Figma, component tokenization, auto-layout, and interactive micro-animations.`,
        `Experience conducting qualitative user interviews, usability testing, and heuristic evaluations.`,
        `Strong understanding of frontend engineering constraints (HTML/CSS/React) and responsive web breakpoints.`,
        `Excellent visual storytelling and stakeholder presentation skills.`
      ].join('\n');
      benefits = [
        `Generous salary and equity compensation.`,
        `100% employer-covered health and wellness plan.`,
        `Dedicated creative software budget (Figma, Adobe Suite, AI design tools).`,
        `Flexible remote working schedule.`,
        `Generous holiday allowance and flexible time off.`
      ].join('\n');
      tags = ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Prototyping'];
    } else {
      // General dynamic template
      description = `We are excited to welcome a talented and ambitious ${cleanTitle} to the growing team at ${company}. In this role, you will be instrumental in executing strategic objectives, collaborating across disciplines, and delivering high-impact outcomes that elevate our market presence and customer satisfaction.`;
      requirements = [
        `Demonstrated professional experience in ${cleanTitle} or closely related ${category} disciplines.`,
        `Strong analytical, organizational, and critical-thinking capabilities with a track record of meeting deadlines.`,
        `Superb communication skills and ability to thrive in fast-paced, collaborative team environments.`,
        `Proficiency with modern productivity tools and industry-standard workflows.`,
        `Proactive approach to continuous learning and solving complex operational challenges.`
      ].join('\n');
      benefits = [
        `Competitive industry salary with career growth pathways.`,
        `Comprehensive health coverage and paid wellness days.`,
        `Flexible work arrangements (Hybrid / Remote options).`,
        `Professional growth allowances and mentorship programs.`,
        `Collaborative and inclusive company culture.`
      ].join('\n');
      tags = [cleanTitle, category.toUpperCase(), 'Collaboration', 'Problem Solving'];
    }

    res.status(200).json({
      success: true,
      data: {
        title: cleanTitle,
        description,
        requirements,
        benefits,
        tags: tags.join(', ')
      }
    });
  } catch (error) {
    next(error);
  }
};


