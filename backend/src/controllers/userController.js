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
