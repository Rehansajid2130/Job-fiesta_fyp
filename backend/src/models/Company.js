const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a company name'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
    },
    logo: {
      type: String,
      default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&h=120&fit=crop&crop=faces',
    },
    banner: {
      type: String,
      default: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop',
    },
    industry: {
      type: String,
      required: [true, 'Please provide an industry category'],
      trim: true,
      default: 'Software & Technology',
    },
    location: {
      type: String,
      required: [true, 'Please provide company headquarters location'],
      trim: true,
    },
    size: {
      type: String,
      default: '100 - 250 Employees',
    },
    founded: {
      type: String,
      default: '2020',
    },
    website: {
      type: String,
      trim: true,
      default: '',
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 120,
    },
    verified: {
      type: Boolean,
      default: true,
    },
    tagline: {
      type: String,
      trim: true,
      default: '',
    },
    about: {
      type: String,
      trim: true,
      default: '',
    },
    culture: {
      type: [String],
      default: [],
    },
    techStack: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Auto-generate slug before saving
companySchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

// Virtual populate for open jobs
companySchema.virtual('jobs', {
  ref: 'Job',
  localField: 'name',
  foreignField: 'company',
  justOne: false,
});

module.exports = mongoose.model('Company', companySchema);
