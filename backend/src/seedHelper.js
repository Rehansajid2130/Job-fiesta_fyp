const User = require('./models/User');
const Job = require('./models/Job');
const Company = require('./models/Company');
const Application = require('./models/Application');
const Conversation = require('./models/Conversation');
const Message = require('./models/Message');
const Notification = require('./models/Notification');

const seedHelper = async () => {
  console.log('[SeedHelper] Clearing existing collections...');
  await Promise.all([
    User.deleteMany({}),
    Job.deleteMany({}),
    Company.deleteMany({}),
    Application.deleteMany({}),
    Conversation.deleteMany({}),
    Message.deleteMany({}),
    Notification.deleteMany({}),
  ]);

  console.log('[SeedHelper] Creating demo users...');
  const users = await User.create([
    {
      fullName: 'Furqan Zeeshan',
      username: 'furqan12',
      email: 'furqan@jobfiesta.com',
      password: 'password123',
      role: 'jobseeker',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
      headline: 'Senior Frontend Engineer & UI Specialist',
      location: 'San Francisco, CA',
      skills: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'REST APIs', 'Node.js'],
      bio: 'Crafting responsive, high-performance web applications with modern React, TypeScript, and micro-interaction design systems.',
    },
    {
      fullName: 'Jobseeker Demo',
      username: 'jobseeker',
      email: 'jobseeker@jobfiesta.com',
      password: 'password123',
      role: 'jobseeker',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
      headline: 'Full Stack React Engineer & Candidate Demo',
      location: 'San Francisco, CA',
      skills: ['React', 'TypeScript', 'Node.js', 'Vite', 'TailwindCSS'],
      bio: 'Demo candidate account for exploring the Job Fiesta platform features.',
    },
    {
      fullName: 'Rehan Sajjid',
      username: 'rehansajid',
      email: 'rehansajid.prof@gmail.com',
      password: 'password123',
      role: 'jobseeker',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces',
      headline: 'Full Stack Engineer & UI Architect',
      location: 'Remote',
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Three.js', 'Vite', 'CSS Architecture'],
      bio: 'Specializing in Swiss-style typographic layouts, 3D Canvas integration, and fluid micro-transitions.',
    },
    {
      fullName: 'Suzana Colin',
      username: 'suzana',
      email: 'suzana@nexusinnovations.io',
      password: 'password123',
      role: 'recruiter',
      company: 'Nexus Innovations',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces',
      headline: 'Head of Talent Acquisition @ Nexus Innovations',
      location: 'San Francisco, CA',
    },
    {
      fullName: 'Recruiter Demo',
      username: 'recruiter',
      email: 'recruiter@jobfiesta.com',
      password: 'password123',
      role: 'recruiter',
      company: 'Nexus Innovations',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces',
      headline: 'Talent Acquisition Partner & Recruiter Demo',
      location: 'San Francisco, CA',
    },
    {
      fullName: 'Hassan Raza',
      username: 'hassan',
      email: 'hassan@cognitivedynamics.ai',
      password: 'password123',
      role: 'recruiter',
      company: 'Cognitive Dynamics AI',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
      headline: 'AI Research Director @ Cognitive Dynamics AI',
      location: 'Austin, TX',
    },
  ]);

  const [furqanUser, jobseekerDemoUser, rehanUser, suzanaUser, recruiterDemoUser, hassanUser] = users;

  console.log('[SeedHelper] Creating enterprise companies...');
  await Company.create([
    {
      name: 'Nexus Innovations',
      slug: 'nexus-innovations',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&h=120&fit=crop&crop=faces',
      banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop',
      industry: 'Software & Technology',
      location: 'San Francisco, CA',
      size: '250 - 500 Employees',
      founded: '2019',
      website: 'https://nexusinnovations.io',
      rating: 4.8,
      reviewCount: 142,
      verified: true,
      tagline: 'Building the next generation of intelligent collaborative cloud workspaces.',
      about: 'Nexus Innovations is a hyper-growth enterprise software studio delivering real-time collaboration engines for Fortune 500 engineering and design departments.',
      culture: [
        'Asynchronous-first communication across global timezones',
        'Continuous mentorship and $3,000 annual learning stipends',
        'Bi-annual company retreats in worldwide destinations',
      ],
      techStack: ['React', 'TypeScript', 'Node.js', 'Go', 'GraphQL', 'AWS', 'Kubernetes'],
      benefits: [
        'Comprehensive Medical, Dental & Vision (100% covered)',
        'Generous Equity Package with 10-year exercise window',
        'Unlimited Paid Time Off + Paid Parental Leave',
      ],
      creator: suzanaUser._id,
    },
    {
      name: 'Aurora Creative Labs',
      slug: 'aurora-creative-labs',
      logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=120&h=120&fit=crop&crop=faces',
      banner: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=400&fit=crop',
      industry: 'UI / UX & Product Design',
      location: 'New York, NY',
      size: '100 - 250 Employees',
      founded: '2021',
      website: 'https://auroracreative.design',
      rating: 4.9,
      reviewCount: 88,
      verified: true,
      tagline: 'Pioneering generative design systems and immersive user interfaces.',
      about: 'Aurora Creative Labs is an award-winning digital product studio that crafts high-fidelity brand identities, digital storefronts, and AI-assisted creative tooling.',
      culture: [
        'Obsession with micro-interactions and typographic precision',
        'Design critique culture founded on constructive radical candor',
      ],
      techStack: ['Figma', 'WebGL', 'Three.js', 'Next.js', 'TailwindCSS', 'GSAP'],
      benefits: [
        'Competitive Salary + Tier-1 Health Coverage',
        'Top-of-the-line Apple hardware suite (M3 Max)',
      ],
    },
    {
      name: 'Cognitive Dynamics AI',
      slug: 'cognitive-dynamics-ai',
      logo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=120&h=120&fit=crop&crop=faces',
      banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=400&fit=crop',
      industry: 'AI & Data Science',
      location: 'Austin, TX',
      size: '50 - 100 Employees',
      founded: '2022',
      website: 'https://cognitivedynamics.ai',
      rating: 4.7,
      reviewCount: 64,
      verified: true,
      tagline: 'Fine-tuned foundation models for autonomous multi-agent reasoning.',
      about: 'Cognitive Dynamics AI is training specialized domain models that help enterprises extract instant value from unstructured text, code, and multimodal data.',
      culture: [
        'Research-driven execution and paper reading clubs',
        'Direct compute access with thousands of H100 GPU clusters',
      ],
      techStack: ['PyTorch', 'Python', 'vLLM', 'Ray', 'CUDA', 'Docker', 'Google Cloud'],
      benefits: [
        'Top 5% market compensation + significant founder equity',
        'Full health, dental, mental health support',
      ],
      creator: hassanUser._id,
    },
  ]);

  console.log('[SeedHelper] Creating active job postings...');
  const jobs = await Job.create([
    {
      title: 'Senior Frontend Engineer',
      company: 'Nexus Innovations',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=faces',
      location: 'San Francisco, CA',
      workplaceType: 'Remote',
      jobType: 'Full-time',
      experienceLevel: 'Senior',
      category: 'tech',
      salaryMin: 130000,
      salaryMax: 160000,
      salaryPeriod: 'year',
      description: 'Nexus Innovations is looking for a passionate Senior Frontend Engineer to lead the architecture and user experience of our next-generation cloud collaboration platform.',
      requirements: [
        '5+ years of production experience with modern React, JavaScript, and TypeScript',
        'Strong understanding of component-driven architecture, responsive design, and state management',
        'Proven track record of optimizing Core Web Vitals and frontend rendering performance',
      ],
      skills: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'REST APIs'],
      tags: ['React', 'TypeScript', 'Vite', 'TailwindCSS'],
      status: 'active',
      applicantsCount: 18,
      viewsCount: 340,
      postedBy: suzanaUser._id,
    },
    {
      title: 'Lead Product Designer',
      company: 'Aurora Creative Labs',
      companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop&crop=faces',
      location: 'New York, NY',
      workplaceType: 'Hybrid',
      jobType: 'Full-time',
      experienceLevel: 'Mid-Senior',
      category: 'design',
      salaryMin: 115000,
      salaryMax: 145000,
      salaryPeriod: 'year',
      description: 'Join Aurora Creative Labs to redefine how modern professionals interact with AI-driven creative tools.',
      requirements: [
        'Portfolio showcasing end-to-end UX/UI workflows, design systems, and user research',
        'Mastery of Figma, component variants, auto-layout, and interactive prototyping',
      ],
      skills: ['Figma', 'Design Systems', 'UX Research', 'Prototyping'],
      tags: ['Figma', 'Design Systems', 'UX Research'],
      status: 'active',
      applicantsCount: 22,
      viewsCount: 290,
    },
    {
      title: 'Machine Learning Research Engineer',
      company: 'Cognitive Dynamics AI',
      companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=100&h=100&fit=crop&crop=faces',
      location: 'Austin, TX',
      workplaceType: 'Remote',
      jobType: 'Full-time',
      experienceLevel: 'Senior',
      category: 'ai',
      salaryMin: 150000,
      salaryMax: 190000,
      salaryPeriod: 'year',
      description: 'Cognitive Dynamics AI is pioneering specialized language models for recruitment and resume intelligence.',
      requirements: [
        'Solid background in NLP, Transformer architectures, and vector embeddings',
        'Proficiency in Python, PyTorch, HuggingFace transformers, and vLLM',
      ],
      skills: ['PyTorch', 'Python', 'LLMs', 'HuggingFace', 'Transformers'],
      tags: ['PyTorch', 'Python', 'LLMs'],
      status: 'active',
      applicantsCount: 15,
      viewsCount: 420,
      postedBy: hassanUser._id,
    },
  ]);

  const [frontendJob] = jobs;

  console.log('[SeedHelper] Creating ATS candidate applications...');
  await Application.create([
    {
      job: frontendJob._id,
      applicant: furqanUser._id,
      expectedSalary: '$145,000 / yr',
      experience: '5 Years',
      skills: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'REST APIs'],
      matchScore: 94,
      status: 'screening',
      notes: 'Strong portfolio showcasing high-performance web apps. Great communication skills.',
      screeningAnswers: [
        {
          question: 'Why are you interested in Nexus Innovations?',
          answer: 'Nexus builds cutting-edge collaboration tools that align with my obsession for high-speed, 60fps web applications.',
        },
        {
          question: 'Describe your experience with TypeScript & React.',
          answer: 'Built enterprise SaaS design systems and architected state flows serving 100k+ daily users.',
        },
      ],
    },
    {
      job: frontendJob._id,
      applicant: rehanUser._id,
      expectedSalary: '$140,000 / yr',
      experience: '4 Years',
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Three.js', 'CSS Architecture'],
      matchScore: 97,
      status: 'interviewing',
      notes: 'Exceptional visual polish and full-stack capabilities. Completed technical screening with top marks.',
      screeningAnswers: [
        {
          question: 'What is your preferred fullstack stack?',
          answer: 'React 19 + Vite frontend paired with Node/Express and MongoDB, structured with clean separation of concerns.',
        },
      ],
    },
  ]);

  console.log('[SeedHelper] Creating chat conversation & messages...');
  const suzanaConv = await Conversation.create({
    participants: [suzanaUser._id, furqanUser._id],
    lastMessage: {
      text: "thank you for reaching out! Yes, I'm interested. Could you share more details about the role?",
      sender: furqanUser._id,
      timestamp: new Date(),
    },
  });

  await Message.create([
    {
      conversation: suzanaConv._id,
      sender: suzanaUser._id,
      content: "Hi Furqan I saw your profile and thought you'd be a great fit for the CEO role. Are you interested?",
      createdAt: new Date(Date.now() - 3600000 * 2),
    },
    {
      conversation: suzanaConv._id,
      sender: furqanUser._id,
      content: "thank you for reaching out! Yes, I'm interested. Could you share more details about the role?",
      createdAt: new Date(Date.now() - 1800000),
    },
  ]);

  console.log('[SeedHelper] Creating activity notifications...');
  await Notification.create([
    {
      recipient: furqanUser._id,
      sender: suzanaUser._id,
      title: 'Application Shortlisted! 🎉',
      message: 'Nexus Innovations moved your Senior Frontend Engineer application to Technical Screening.',
      type: 'application',
      link: '/jobseeker-dashboard',
      read: false,
    },
    {
      recipient: furqanUser._id,
      sender: suzanaUser._id,
      title: 'New Message from Suzana Colin 💬',
      message: "Hi Furqan I saw your profile and thought you'd be a great fit for the CEO role. Are you interested?",
      type: 'message',
      link: '/chat',
      read: false,
    },
    {
      recipient: furqanUser._id,
      sender: hassanUser._id,
      title: 'Interview Scheduled 🗓️',
      message: 'Cognitive Dynamics AI confirmed your ML Engineer technical interview for Thursday at 2:00 PM EST.',
      type: 'interview',
      link: '/jobseeker-dashboard',
      read: true,
    },
  ]);

  console.log('[SeedHelper] Seeding completed successfully.');
};

module.exports = seedHelper;
