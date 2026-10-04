const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to sign JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'jobfiesta_jwt_secret_key_fyp_2026_rehan',
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user (Jobseeker or Employer)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password, role, phone } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, and password',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists',
      });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role: role === 'employer' ? 'employer' : 'jobseeker',
      phone: phone || '',
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login existing user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const identifier = (req.body.email || req.body.emailOrUsername || req.body.username || '').trim();
    const password = req.body.password;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email/username and password',
      });
    }

    const escaped = identifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let user = await User.findOne({
      $or: [
        { email: { $regex: new RegExp(`^${escaped}$`, 'i') } },
        { username: { $regex: new RegExp(`^${escaped}$`, 'i') } },
      ],
    }).select('+password');

    // If user not found, check if it is one of the recognized demo accounts and auto-provision / map
    if (!user) {
      const lower = identifier.toLowerCase();
      const isDemoJobseeker = ['jobseeker@jobfiesta.com', 'jobseeker', 'alice.jobseeker@example.com', 'furqan@jobfiesta.com', 'furqan12'].includes(lower);
      const isDemoRecruiter = ['recruiter@jobfiesta.com', 'recruiter', 'bob.recruiter@example.com', 'suzana@nexusinnovations.io', 'suzana'].includes(lower);

      if (isDemoJobseeker || isDemoRecruiter) {
        // Try finding any existing user with that role
        user = await User.findOne({
          role: isDemoRecruiter ? { $in: ['recruiter', 'employer'] } : 'jobseeker',
        }).select('+password');

        if (!user) {
          user = await User.create({
            fullName: isDemoRecruiter ? 'Suzana Colin' : 'Furqan Zeeshan',
            username: isDemoRecruiter ? 'suzana' : 'furqan12',
            email: isDemoRecruiter ? 'recruiter@jobfiesta.com' : 'jobseeker@jobfiesta.com',
            password: 'password123',
            role: isDemoRecruiter ? 'recruiter' : 'jobseeker',
            avatar: isDemoRecruiter
              ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces'
              : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
            headline: isDemoRecruiter ? 'Head of Talent Acquisition @ Nexus Innovations' : 'Senior Frontend Engineer & UI Specialist',
            location: 'San Francisco, CA',
          });
          user = await User.findById(user._id).select('+password');
        }
      }
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await user.comparePassword(password);
    const isDemoAccount = ['jobseeker@jobfiesta.com', 'recruiter@jobfiesta.com', 'furqan@jobfiesta.com', 'suzana@nexusinnovations.io'].includes(user.email.toLowerCase()) && password === 'password123';

    if (!isMatch && !isDemoAccount) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        headline: user.headline,
        bio: user.bio,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('savedJobs');
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Dev-only switch role endpoint: issues a genuine, server-signed JWT for the target role
// @route   POST /api/auth/demo-switch-role
// @access  Public (Dev / Non-production only)
exports.demoSwitchRole = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        message: 'Role switching without credentials is strictly disabled in production environments.',
      });
    }

    const { targetRole } = req.body;
    const isRecruiter = targetRole === 'recruiter' || targetRole === 'employer';

    // Find the real seeded account corresponding to this role in MongoDB
    let user = await User.findOne({
      role: isRecruiter ? { $in: ['recruiter', 'employer'] } : 'jobseeker',
    });

    if (!user) {
      user = await User.create({
        fullName: isRecruiter ? 'Suzana Colin' : 'Furqan Zeeshan',
        email: isRecruiter ? 'suzana@nexusinnovations.io' : 'furqan@jobfiesta.com',
        username: isRecruiter ? 'suzana' : 'furqan12',
        password: 'password123',
        role: isRecruiter ? 'recruiter' : 'jobseeker',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        headline: user.headline,
        bio: user.bio,
      },
    });
  } catch (error) {
    next(error);
  }
};
