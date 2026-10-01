const User = require('../models/User');
// ponytail: import Application model to support GDPR data deletion and portability
const Application = require('../models/Application');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      fullName: req.body.fullName,
      phone: req.body.phone,
      avatar: req.body.avatar,
      headline: req.body.headline,
      bio: req.body.bio,
      location: req.body.location,
      skills: req.body.skills,
      resumeUrl: req.body.resumeUrl,
      companyDetails: req.body.companyDetails,
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(
      (key) => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's saved/bookmarked jobs
// @route   GET /api/users/saved-jobs
// @access  Private
exports.getSavedJobs = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('savedJobs');

    res.status(200).json({
      success: true,
      count: user.savedJobs.length,
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get public user profile by username (Strictly sanitized)
// @route   GET /api/users/:username
// @access  Public
exports.getUserByUsername = async (req, res, next) => {
  try {
    const rawUsername = (req.params.username || '').trim().toLowerCase();

    let query = { username: rawUsername };
    if (rawUsername.match(/^[0-9a-fA-F]{24}$/)) {
      query = { $or: [{ username: rawUsername }, { _id: rawUsername }] };
    }

    // STRICT PROJECTION: Explicitly select ONLY public fields. NEVER expose email, password, phone, or savedJobs.
    const user = await User.findOne(query).select(
      'fullName username avatar headline bio location skills resumeUrl companyDetails role createdAt'
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Public profile for user '${rawUsername}' was not found`,
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user account and all personal data (GDPR Art. 17 Right to Erasure)
// @route   DELETE /api/users/profile
// @access  Private
exports.deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // ponytail: cascade remove user applications to prevent orphan PII records
    await Application.deleteMany({ applicant: userId });
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: 'Account and associated personal records have been permanently erased (GDPR Art. 17).',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export full machine-readable personal data dump (GDPR Art. 20 Data Portability)
// @route   GET /api/users/export-data
// @access  Private
exports.exportUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const applications = await Application.find({ applicant: req.user.id }).populate('job', 'title company location');

    res.status(200).json({
      success: true,
      metadata: {
        format: 'GDPR_ARTICLE_20_JSON_PORTABILITY',
        exportedAt: new Date().toISOString(),
        controller: 'JobFiesta Platform',
      },
      personalData: user,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

