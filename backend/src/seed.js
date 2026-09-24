const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Job = require('./models/Job');
const Application = require('./models/Application');

dotenv.config();

const sampleJobs = [
  {
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA',
    workplaceType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Development',
    salaryMin: 130000,
    salaryMax: 160000,
    salaryPeriod: 'year',
    description:
      'We are looking for an experienced Senior Full Stack Developer to lead the architecture and implementation of our enterprise SaaS platform. You will work with React, Node.js, and cloud native architectures.',
    requirements: [
      '5+ years experience with React, Node.js, and TypeScript',
      'Strong knowledge of relational and NoSQL databases (MongoDB, PostgreSQL)',
      'Experience in designing and deploying RESTful and GraphQL APIs',
      'Familiarity with Docker, Kubernetes, and AWS cloud environments',
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'AWS'],
    status: 'active',
    applicantsCount: 14,
    viewsCount: 230,
  },
  {
    title: 'Senior UI/UX Product Designer',
    company: 'PixelCraft Studio',
    companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&auto=format&fit=crop&q=80',
    location: 'New York, NY',
    workplaceType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Design',
    salaryMin: 110000,
    salaryMax: 140000,
    salaryPeriod: 'year',
    description:
      'PixelCraft is looking for a creative UI/UX Product Designer to design intuitive, aesthetically pleasing user interfaces for web and mobile products.',
    requirements: [
      '4+ years designing web and mobile user interfaces',
      'Expertise in Figma, design systems, and prototyping',
      'Demonstrated portfolio showing end-to-end design thinking',
      'Strong understanding of design accessibility and micro-interactions',
    ],
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'User Research'],
    status: 'active',
    applicantsCount: 28,
    viewsCount: 410,
  },
  {
    title: 'Frontend React Engineer',
    company: 'FinPulse Systems',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    location: 'Austin, TX',
    workplaceType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Mid-level',
    category: 'Development',
    salaryMin: 95000,
    salaryMax: 120000,
    salaryPeriod: 'year',
    description:
      'Join our fast-growing fintech team building real-time analytics dashboards and high-speed financial trading tools using React, Vite, and TailwindCSS.',
    requirements: [
      '3+ years professional frontend development experience with React',
      'Solid grasp of modern CSS, responsive layouts, and state management',
      'Experience with WebSocket data streams and real-time visualization',
    ],
    skills: ['React', 'JavaScript', 'CSS3', 'Vite', 'TailwindCSS'],
    status: 'active',
    applicantsCount: 9,
    viewsCount: 165,
  },
  {
    title: 'DevOps & Cloud Infrastructure Engineer',
    company: 'CloudMatrix Inc',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    location: 'Seattle, WA',
    workplaceType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'DevOps',
    salaryMin: 140000,
    salaryMax: 175000,
    salaryPeriod: 'year',
    description:
      'CloudMatrix is seeking a seasoned DevOps Engineer to build and optimize CI/CD pipelines, manage Kubernetes clusters, and scale cloud infrastructure.',
    requirements: [
      'Experience with Terraform, Kubernetes, Helm, and AWS / GCP',
      'Strong scripting background in Python, Bash, or Go',
      'Proven track record in setting up automated deployment pipelines',
    ],
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD'],
    status: 'active',
    applicantsCount: 12,
    viewsCount: 190,
  },
  {
    title: 'Junior Backend Developer (Node.js)',
    company: 'Apex Digital Labs',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&auto=format&fit=crop&q=80',
    location: 'Chicago, IL',
    workplaceType: 'On-site',
    jobType: 'Full-time',
    experienceLevel: 'Junior',
    category: 'Development',
    salaryMin: 65000,
    salaryMax: 85000,
    salaryPeriod: 'year',
    description:
      'Looking for a passionate Junior Backend Developer eager to learn and build scalable REST APIs with Node.js, Express, and MongoDB.',
    requirements: [
      '1+ years coding experience with Node.js and Express',
      'Basic understanding of database schemas, indexes, and queries',
      'Strong problem-solving mindset and eagerness to grow',
    ],
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
    status: 'active',
    applicantsCount: 45,
    viewsCount: 520,
  },
  {
    title: 'Product Marketing Manager',
    company: 'GrowthForge',
    companyLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=80',
    location: 'Boston, MA',
    workplaceType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Mid-level',
    category: 'Marketing',
    salaryMin: 85000,
    salaryMax: 110000,
    salaryPeriod: 'year',
    description:
      'Drive product positioning, messaging, and go-to-market strategies for our suite of developer productivity and recruitment tools.',
    requirements: [
      '3+ years in B2B SaaS product marketing',
      'Strong analytical capabilities and content creation skills',
      'Experience collaborating with sales and engineering teams',
    ],
    skills: ['Product Marketing', 'Go-to-market', 'Content Strategy', 'Analytics'],
    status: 'active',
    applicantsCount: 19,
    viewsCount: 310,
  },
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/jobfiesta';
    console.log(`Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing test data...');
    await User.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});

    console.log('Seeding demo users...');
    const employer = await User.create({
      fullName: 'Sarah Jenkins',
      email: 'recruiter@jobfiesta.com',
      password: 'password123',
      role: 'employer',
      phone: '+1 (555) 234-5678',
      headline: 'Senior Technical Recruiter at TechCorp',
      companyDetails: {
        companyName: 'TechCorp Solutions',
        companyWebsite: 'https://techcorp.example.com',
        industry: 'Software & Technology',
      },
    });

    const jobseeker = await User.create({
      fullName: 'Alex Morgan',
      email: 'jobseeker@jobfiesta.com',
      password: 'password123',
      role: 'jobseeker',
      phone: '+1 (555) 987-6543',
      headline: 'Full Stack Software Engineer | React & Node.js',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      location: 'San Francisco, CA',
    });

    console.log('Seeding sample jobs...');
    const jobsWithEmployer = sampleJobs.map((job) => ({
      ...job,
      postedBy: employer._id,
    }));

    const createdJobs = await Job.insertMany(jobsWithEmployer);

    // Seed one sample application
    await Application.create({
      job: createdJobs[0]._id,
      applicant: jobseeker._id,
      coverLetter: 'I am thrilled to apply for the Senior Full Stack Developer position. My background in React and Node.js aligns perfectly with your requirements.',
      status: 'applied',
    });

    console.log('Seeding completed successfully!');
    console.log('--------------------------------------------------');
    console.log('Demo Credentials:');
    console.log('  Jobseeker: jobseeker@jobfiesta.com / password123');
    console.log('  Employer:  recruiter@jobfiesta.com  / password123');
    console.log(`  Jobs created: ${createdJobs.length}`);
    console.log('--------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
