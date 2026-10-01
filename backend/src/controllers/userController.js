const User = require('../models/User');

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
