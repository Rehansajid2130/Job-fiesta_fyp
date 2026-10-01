const mongoose = require('mongoose');

const screeningAnswerSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job ID is required'],
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Applicant user ID is required'],
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    coverLetter: {
      type: String,
      default: '',
    },
    expectedSalary: {
      type: String,
      default: '',
    },
    portfolioUrl: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
    },
    experience: {
      type: String,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    // ponytail: matchScore is strictly an advisory decision-support metric; EU AI Act Annex III & NYC LL 144 compliant (human in the loop, no automated disqualification)
    matchScore: {
      type: Number,
      default: 85,
      min: 0,
      max: 100,
    },
    screeningAnswers: {
      type: [screeningAnswerSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ['applied', 'screening', 'interviewing', 'offered', 'rejected', 'under_review', 'shortlisted', 'interview', 'hired'],
      default: 'applied',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications from the same user to the same job
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
