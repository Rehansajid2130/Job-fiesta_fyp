const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
      trim: true,
    },
    companyLogo: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      required: [true, 'Please provide job location'],
      trim: true,
    },
    workplaceType: {
      type: String,
      enum: ['Remote', 'On-site', 'Hybrid'],
      default: 'On-site',
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
      default: 'Full-time',
    },
    experienceLevel: {
      type: String,
      enum: ['Fresher', 'Junior', 'Mid-level', 'Senior', 'Director / Executive'],
      default: 'Mid-level',
    },
    category: {
      type: String,
      trim: true,
      default: 'Development',
    },
    salaryMin: {
      type: Number,
      default: 0,
    },
    salaryMax: {
      type: Number,
      default: 0,
    },
    salaryPeriod: {
      type: String,
      enum: ['year', 'month', 'hour'],
      default: 'year',
    },
    currency: {
      type: String,
      default: 'USD',
    },
    description: {
      type: String,
      required: [true, 'Please provide a job description'],
    },
    requirements: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    status: {
      type: String,
      enum: ['active', 'closed', 'draft'],
      default: 'active',
    },
    applicantsCount: {
      type: Number,
      default: 0,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for fast keyword search and filtering
jobSchema.index({ title: 'text', company: 'text', description: 'text', skills: 'text' });

module.exports = mongoose.model('Job', jobSchema);
