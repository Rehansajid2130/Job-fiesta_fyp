export const categories = [
  { id: 'tech', name: 'Software & Technology', count: 485, icon: 'Code' },
  { id: 'design', name: 'UI / UX & Product Design', count: 218, icon: 'Palette' },
  { id: 'marketing', name: 'Digital Marketing & Content', count: 164, icon: 'TrendingUp' },
  { id: 'finance', name: 'Finance & Banking', count: 129, icon: 'DollarSign' },
  { id: 'health', name: 'Healthcare & Biotech', count: 94, icon: 'Activity' },
  { id: 'engineering', name: 'Civil & Hardware Engineering', count: 142, icon: 'Wrench' },
  { id: 'sales', name: 'Sales & Customer Success', count: 203, icon: 'Users' },
  { id: 'ai', name: 'AI & Data Science', count: 310, icon: 'Cpu' }
];

export const initialJobs = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer',
    company: 'Nexus Innovations',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=faces',
    location: 'San Francisco, CA (Remote)',
    type: 'Full-Time',
    category: 'tech',
    salary: '$130k - $160k',
    salaryMin: 130000,
    salaryMax: 160000,
    experience: 'Senior (5+ yrs)',
    postedDate: '2 days ago',
    featured: true,
    tags: ['React', 'TypeScript', 'Vite', 'TailwindCSS'],
    description: `Nexus Innovations is looking for a passionate Senior Frontend Engineer to lead the architecture and user experience of our next-generation cloud collaboration platform. You will work closely with design and backend teams to ship fluid, 60fps web apps.`,
    requirements: [
      '5+ years of production experience with modern React, JavaScript (ESNext), and TypeScript',
      'Strong understanding of component-driven architecture, responsive design, and state management',
      'Proven track record of optimizing Core Web Vitals and frontend rendering performance',
      'Familiarity with RESTful APIs, WebSockets, and modern CI/CD tooling'
    ],
    benefits: [
      'Competitive salary + substantial equity package',
      'Full health, dental, and vision coverage',
      'Annual $3,000 learning & conference stipend',
      'Flexible remote work setup & $1,000 home office budget'
    ]
  },
  {
    id: 'job-2',
    title: 'Lead Product Designer',
    company: 'Aurora Creative Labs',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop&crop=faces',
    location: 'New York, NY (Hybrid)',
    type: 'Full-Time',
    category: 'design',
    salary: '$115k - $145k',
    salaryMin: 115000,
    salaryMax: 145000,
    experience: 'Mid-Senior (4+ yrs)',
    postedDate: 'Just now',
    featured: true,
    tags: ['Figma', 'Design Systems', 'UX Research', 'Prototyping'],
    description: `Join Aurora Creative Labs to redefine how modern professionals interact with AI-driven creative tools. You will own product design from concept discovery to pixel-perfect design systems.`,
    requirements: [
      'Portfolio showcasing end-to-end UX/UI workflows, design systems, and user research',
      'Mastery of Figma, component variants, auto-layout, and interactive prototyping',
      'Experience conducting user interviews and usability tests',
      'Strong collaboration skills with engineering teams'
    ],
    benefits: [
      'Comprehensive healthcare and wellness reimbursement',
      'Unlimited paid time off (PTO) policy',
      'Top-of-the-line MacBook Pro & 4K monitor setup',
      'Quarterly company team offsites'
    ]
  },
  {
    id: 'job-3',
    title: 'Machine Learning Research Engineer',
    company: 'Cognitive Dynamics AI',
    logo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=100&h=100&fit=crop&crop=faces',
    location: 'Austin, TX (Remote)',
    type: 'Full-Time',
    category: 'ai',
    salary: '$150k - $190k',
    salaryMin: 150000,
    salaryMax: 190000,
    experience: 'Senior (4+ yrs)',
    postedDate: '1 day ago',
    featured: true,
    tags: ['PyTorch', 'LLMs', 'Python', 'HuggingFace'],
    description: `Cognitive Dynamics AI is pioneering specialized language models for recruitment and resume intelligence. We need an ML Engineer to fine-tune open models, deploy high-throughput inference endpoints, and build RAG pipelines.`,
    requirements: [
      'Solid background in NLP, Transformer architectures, and vector embeddings',
      'Proficiency in Python, PyTorch, HuggingFace transformers, and vLLM',
      'Hands-on experience deploying ML models to AWS or Google Cloud at scale',
      'MS or PhD in Computer Science, AI, or equivalent practical experience'
    ],
    benefits: [
      'Top-tier base salary & high-growth equity grant',
      '401(k) matching up to 5%',
      'Flexible working hours across all US time zones',
      'Patent bonus program'
    ]
  },
  {
    id: 'job-4',
    title: 'Growth Marketing Manager',
    company: 'Pulse Digital Media',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop&crop=faces',
    location: 'Chicago, IL (Hybrid)',
    type: 'Full-Time',
    category: 'marketing',
    salary: '$90k - $120k',
    salaryMin: 90000,
    salaryMax: 120000,
    experience: 'Mid (3+ yrs)',
    postedDate: '3 days ago',
    featured: false,
    tags: ['SEO', 'Google Ads', 'Content Strategy', 'HubSpot'],
    description: `We are seeking an analytical and creative Growth Marketing Manager to oversee multi-channel customer acquisition funnels, campaign tracking, and content distribution.`,
    requirements: [
      '3+ years managing paid media, organic growth, and conversion funnels',
      'Experience with Google Analytics 4, Meta Ads Manager, and SEO tools (Ahrefs/Semrush)',
      'Data-driven mindset with A/B testing methodology',
      'Excellent copywriting and communication skills'
    ],
    benefits: [
      'Generous performance-based bonus structure',
      'Health & dental insurance',
      'Work from home two days per week',
      'Professional mentorship opportunities'
    ]
  },
  {
    id: 'job-5',
    title: 'Full Stack JavaScript Developer',
    company: 'Veritas Technologies',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&crop=faces',
    location: 'Remote',
    type: 'Contract',
    category: 'tech',
    salary: '$60 - $80 / hr',
    salaryMin: 95000,
    salaryMax: 135000,
    experience: 'Mid-Level (3+ yrs)',
    postedDate: '4 days ago',
    featured: false,
    tags: ['Node.js', 'Express', 'React', 'MongoDB'],
    description: `Contract role for a Full Stack JavaScript Developer to assist in building API integrations and real-time chat modules for our enterprise talent platform.`,
    requirements: [
      '3+ years experience with Node.js, Express, MongoDB/PostgreSQL',
      'Experience with Socket.io / WebSocket real-time event systems',
      'Ability to write clean, unit-tested code and clear documentation',
      'Self-starter capable of managing contract milestones'
    ],
    benefits: [
      'Flexible hourly schedule',
      'Possibility of conversion to full-time position',
      'Global remote eligible'
    ]
  },
  {
    id: 'job-6',
    title: 'DevOps & Cloud Architect',
    company: 'Skyline Cloud Systems',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=faces',
    location: 'Seattle, WA (Remote)',
    type: 'Full-Time',
    category: 'engineering',
    salary: '$140k - $175k',
    salaryMin: 140000,
    salaryMax: 175000,
    experience: 'Senior (5+ yrs)',
    postedDate: '5 days ago',
    featured: false,
    tags: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
    description: `Help build and secure resilient cloud infrastructure supporting millions of daily active users. Automate deployment pipelines and manage zero-downtime releases.`,
    requirements: [
      'Deep hands-on experience with Kubernetes, Terraform, and AWS/GCP services',
      'Strong scripting skills in Python, Bash, or Go',
      'Expertise in monitoring tools (Prometheus, Grafana, Datadog)',
      'Understanding of modern zero-trust security practices'
    ],
    benefits: [
      'Comprehensive medical, dental, vision insurance',
      'Cell phone & internet reimbursement',
      'Generous paid parental leave',
      'Matching charitable donations'
    ]
  }
];

export const initialApplications = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior Frontend Engineer',
    company: 'Nexus Innovations',
    appliedDate: '2026-09-18',
    status: 'Interview Scheduled', // 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Offer Extended'
    matchScore: 94
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    jobTitle: 'Lead Product Designer',
    company: 'Aurora Creative Labs',
    appliedDate: '2026-09-15',
    status: 'Under Review',
    matchScore: 88
  },
  {
    id: 'app-3',
    jobId: 'job-3',
    jobTitle: 'Machine Learning Research Engineer',
    company: 'Cognitive Dynamics AI',
    appliedDate: '2026-09-10',
    status: 'Shortlisted',
    matchScore: 91
  }
];

export const initialConversations = [
  {
    id: 'conv-1',
    participantName: 'Sarah Jenkins',
    participantRole: 'Technical Recruiter @ Nexus Innovations',
    participantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    jobTitle: 'Senior Frontend Engineer',
    messages: [
      { id: 1, sender: 'recruiter', text: 'Hi Alice! We were really impressed by your profile and resume.', timestamp: '10:15 AM' },
      { id: 2, sender: 'jobseeker', text: 'Thank you Sarah! I am very excited about Nexus Innovations.', timestamp: '10:18 AM' },
      { id: 3, sender: 'recruiter', text: 'Would you be available for a preliminary 30-minute intro call this Thursday?', timestamp: '10:22 AM' },
      { id: 4, sender: 'jobseeker', text: 'Yes, Thursday 2:00 PM EST works perfectly for me.', timestamp: '10:25 AM' },
      { id: 5, sender: 'recruiter', text: 'Terrific! I will send over the calendar invite and details shortly.', timestamp: '10:30 AM' }
    ],
    rated: false
  },
  {
    id: 'conv-2',
    participantName: 'David Chen',
    participantRole: 'Head of Talent @ Aurora Labs',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    jobTitle: 'Lead Product Designer',
    messages: [
      { id: 1, sender: 'recruiter', text: 'Hello! Thanks for submitting your application.', timestamp: 'Yesterday' },
      { id: 2, sender: 'jobseeker', text: 'Happy to apply, David. Let me know if you need any additional portfolio samples.', timestamp: 'Yesterday' }
    ],
    rated: false
  }
];
