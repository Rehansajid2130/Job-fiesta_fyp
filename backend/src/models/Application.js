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
    // ponytail: store pre-computed matched and missing skills arrays to avoid re-running match loops on every view
    matchedSkills: {
      type: [String],
      default: [],
    },
    missingSkills: {
      type: [String],
      default: [],
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
    interview: {
      date: { type: String, default: '' },
      time: { type: String, default: '' },
      roundType: { type: String, default: '' },
      location: { type: String, default: '' },
      notes: { type: String, default: '' },
      interviewer: { type: String, default: '' },
      meetingLink: { type: String, default: '' },
      status: { type: String, default: 'Scheduled' },
    },
    timeline: [
      {
        stage: { type: String, required: true },
        note: { type: String, default: '' },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications from the same user to the same job
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });
applicationSchema.index({ applicant: 1, createdAt: -1 });
applicationSchema.index({ job: 1, status: 1 });
applicationSchema.index({ applicant: 1, status: 1 });

module.exports = mongoose.model('Application', applicationSchema);
