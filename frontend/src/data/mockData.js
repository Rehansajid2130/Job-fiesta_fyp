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
    id: 'conv-suzana',
    participantName: 'Suzana Colin',
    participantRole: 'Executive Talent Partner',
    participantAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces',
    date: 'Dec 15',
    lastMessage: "Hi Furqan I saw your profile and thought you'd be a great fit for the CEO role. Are you interested?",
    messages: [
      { 
        id: 1, 
        sender: 'recruiter', 
        text: "Hi Furqan I saw your profile and thought you'd be a great fit for the CEO role. Are you interested?", 
        timestamp: 'Sat 5:10 AM' 
      },
      { 
        id: 2, 
        sender: 'jobseeker', 
        text: "thank you for reaching out! Yes, I'm interested. Could you share more details about the role?", 
        timestamp: 'Sat 5:15 AM' 
      }
    ],
    rated: false
  },
  {
    id: 'conv-hassan',
    participantName: 'Hassan',
    participantRole: 'Tech Lead @ CloudScale',
    participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
    date: 'Dec 15',
    lastMessage: 'Chris Martin reacted with 💙 love',
    messages: [
      { id: 1, sender: 'recruiter', text: 'Hey Furqan! Great work on the design challenge.', timestamp: 'Dec 14' },
      { id: 2, sender: 'recruiter', text: 'Chris Martin reacted with 💙 love', timestamp: 'Dec 15' }
    ],
    rated: false
  },
  {
    id: 'conv-talal',
    participantName: 'Talal',
    participantRole: 'Engineering Manager',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
    date: 'Dec 15',
    lastMessage: 'thank a lot for your good recommendati...',
    messages: [
      { id: 1, sender: 'recruiter', text: 'thank a lot for your good recommendation! The hiring committee was very impressed.', timestamp: 'Dec 15' }
    ],
    rated: false
  },
  {
    id: 'conv-zain',
    participantName: 'Zain Zeeshan',
    participantRole: 'Talent Acquisition Partner',
    participantAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces',
    date: 'Dec 15',
    lastMessage: 'Chris Martin reacted with 💙 love',
    messages: [
      { id: 1, sender: 'recruiter', text: 'We received your project files.', timestamp: 'Dec 14' },
      { id: 2, sender: 'recruiter', text: 'Chris Martin reacted with 💙 love', timestamp: 'Dec 15' }
    ],
    rated: false
  },
  {
    id: 'conv-mali',
    participantName: 'M ALI',
    participantRole: 'Product Director',
    participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces',
    date: 'Dec 15',
    lastMessage: 'thank a lot for your good recommendati...',
    messages: [
      { id: 1, sender: 'recruiter', text: 'thank a lot for your good recommendation! Let us connect later this week.', timestamp: 'Dec 15' }
    ],
    rated: false
  },
  {
    id: 'conv-furqan-z',
    participantName: 'Furqan Zeeshan',
    participantRole: 'Senior Recruiter',
    participantAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop&crop=faces',
    date: 'Dec 15',
    lastMessage: 'Thanks for your time',
    messages: [
      { id: 1, sender: 'recruiter', text: 'Thanks for your time today during the interview.', timestamp: 'Dec 15' }
    ],
    rated: false
  },
  {
    id: 'conv-rehan',
    participantName: 'Rehan Sajjid',
    participantRole: 'Full Stack Engineer',
    participantAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces',
    date: 'Dec 15',
    lastMessage: 'Looking forward to work with you',
    messages: [
      { id: 1, sender: 'recruiter', text: 'Excited about the roadmap!', timestamp: 'Dec 14' },
      { id: 2, sender: 'jobseeker', text: 'Looking forward to work with you', timestamp: 'Dec 15' }
    ],
    rated: false
  }
];

export const initialCompanies = [
  {
    id: 'nexus-innovations',
    name: 'Nexus Innovations',
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
    about: 'Nexus Innovations is a hyper-growth enterprise software studio delivering real-time collaboration engines for Fortune 500 engineering and design departments. We value high agency, engineering craftsmanship, and work-life balance.',
    culture: [
      'Asynchronous-first communication across global timezones',
      'Continuous mentorship and $3,000 annual learning stipends',
      'Bi-annual company retreats in worldwide destinations'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Go', 'GraphQL', 'AWS', 'Kubernetes'],
    benefits: [
      'Comprehensive Medical, Dental & Vision (100% covered)',
      'Generous Equity Package with 10-year exercise window',
      'Unlimited Paid Time Off + Paid Parental Leave',
      '$1,500 Home Office & Ergonomic Setup Reimbursement'
    ],
    openJobCount: 3
  },
  {
    id: 'aurora-creative-labs',
    name: 'Aurora Creative Labs',
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
    about: 'Aurora Creative Labs is an award-winning digital product studio that crafts high-fidelity brand identities, digital storefronts, and AI-assisted creative tooling. Our work has been recognized at Awwwards, FWA, and the Webby Awards.',
    culture: [
      'Obsession with micro-interactions and typographic precision',
      'Design critique culture founded on constructive radical candor',
      'Dedicated weekly "Innovation Fridays" for passion experiments'
    ],
    techStack: ['Figma', 'WebGL', 'Three.js', 'Next.js', 'TailwindCSS', 'GSAP'],
    benefits: [
      'Competitive Salary + Tier-1 Health Coverage',
      'Top-of-the-line Apple hardware suite (M3 Max)',
      'Quarterly performance bonuses & profit sharing',
      'Annual pass to international design conferences'
    ],
    openJobCount: 2
  },
  {
    id: 'cognitive-dynamics-ai',
    name: 'Cognitive Dynamics AI',
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
    about: 'Cognitive Dynamics AI is training specialized domain models that help enterprises extract instant value from unstructured text, code, and multimodal sensory data.',
    culture: [
      'Research-driven execution and paper reading clubs',
      'High ownership with zero micromanagement',
      'Direct compute access with thousands of H100 GPU clusters'
    ],
    techStack: ['PyTorch', 'Python', 'vLLM', 'Ray', 'CUDA', 'Docker', 'Google Cloud'],
    benefits: [
      'Top 5% market compensation + significant founder equity',
      'Flexible remote schedule with hybrid Austin lab access',
      'Full health, dental, mental health support',
      'Relocation assistance package'
    ],
    openJobCount: 2
  },
  {
    id: 'apex-financial-systems',
    name: 'Apex Financial Systems',
    logo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=faces',
    banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop',
    industry: 'Finance & Banking',
    location: 'Chicago, IL',
    size: '500+ Employees',
    founded: '2016',
    website: 'https://apexfinancial.com',
    rating: 4.6,
    reviewCount: 210,
    verified: true,
    tagline: 'Ultra-low latency clearing engines and modern fintech infrastructure.',
    about: 'Apex Financial Systems powers transactional clearance, automated treasury workflows, and compliance reporting for leading digital brokers and decentralized liquidity protocols.',
    culture: [
      'Zero-defect engineering mindset for financial security',
      'Merit-based promotion with clear career ladders',
      'Inclusive and diverse team from over 30 countries'
    ],
    techStack: ['Rust', 'Java', 'Kafka', 'PostgreSQL', 'AWS', 'Terraform'],
    benefits: [
      '401(k) matching up to 6% with immediate vesting',
      'Comprehensive wellness and fertility benefits',
      'Generous tuition reimbursement program',
      'Subsidized public transit and commuter perks'
    ],
    openJobCount: 2
  }
];

export const initialCandidates = [
  {
    id: 'cand-1',
    name: 'Furqan Zeeshan',
    email: 'furqan12@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
    role: 'Senior Frontend Engineer',
    company: 'Nexus Innovations',
    stage: 'screening',
    appliedDate: 'Sep 28, 2026',
    experience: '5 Years',
    matchScore: 94,
    expectedSalary: '$145,000 / yr',
    location: 'San Francisco, CA (Remote)',
    skills: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'REST APIs'],
    notes: 'Strong portfolio showcasing high-performance web apps. Great communication skills.',
    screeningAnswers: [
      { question: 'Why are you interested in Nexus Innovations?', answer: 'Nexus builds cutting-edge collaboration tools that align with my obsession for high-speed, 60fps web applications.' },
      { question: 'Describe your experience with TypeScript & React.', answer: 'Built enterprise SaaS design systems and architected state flows serving 100k+ daily users.' }
    ]
  },
  {
    id: 'cand-2',
    name: 'Rehan Sajjid',
    email: 'rehansajid.prof@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces',
    role: 'Full Stack Engineer',
    company: 'Nexus Innovations',
    stage: 'interviewing',
    appliedDate: 'Sep 26, 2026',
    experience: '4 Years',
    matchScore: 97,
    expectedSalary: '$140,000 / yr',
    location: 'Remote',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Three.js', 'CSS Architecture'],
    notes: 'Exceptional visual polish and full-stack capabilities. Completed technical screening with top marks.',
    screeningAnswers: [
      { question: 'What is your preferred fullstack stack?', answer: 'React 19 + Vite frontend paired with Node/Express and MongoDB, structured with clean separation of concerns.' },
      { question: 'Notice period?', answer: 'Available immediately.' }
    ]
  },
  {
    id: 'cand-3',
    name: 'Hassan Raza',
    email: 'hassan.raza@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
    role: 'Machine Learning Research Engineer',
    company: 'Cognitive Dynamics AI',
    stage: 'applied',
    appliedDate: 'Sep 29, 2026',
    experience: '3 Years',
    matchScore: 89,
    expectedSalary: '$165,000 / yr',
    location: 'Austin, TX',
    skills: ['PyTorch', 'Python', 'LLMs', 'Transformers', 'FastAPI'],
    notes: 'Published a paper on parameter-efficient fine-tuning (PEFT). Reviewing thesis work.',
    screeningAnswers: [
      { question: 'Experience with LLM deployment?', answer: 'Deployed Llama 3 models on vLLM clusters with continuous batching.' }
    ]
  },
  {
    id: 'cand-4',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces',
    role: 'Lead Product Designer',
    company: 'Aurora Creative Labs',
    stage: 'offered',
    appliedDate: 'Sep 20, 2026',
    experience: '6 Years',
    matchScore: 96,
    expectedSalary: '$135,000 / yr',
    location: 'New York, NY',
    skills: ['Figma', 'Design Systems', 'UX Strategy', 'Prototyping'],
    notes: 'Offer letter dispatched on Sep 28. Candidate reviewing term sheet.',
    screeningAnswers: [
      { question: 'What is your design philosophy?', answer: 'Form follows user intent; clarity over cleverness; delight in micro-interactions.' }
    ]
  },
  {
    id: 'cand-5',
    name: 'David Kim',
    email: 'dkim@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces',
    role: 'Senior Backend Architect',
    company: 'Apex Financial Systems',
    stage: 'rejected',
    appliedDate: 'Sep 15, 2026',
    experience: '2 Years',
    matchScore: 71,
    expectedSalary: '$150,000 / yr',
    location: 'Chicago, IL',
    skills: ['Java', 'Spring Boot', 'SQL'],
    notes: 'Not enough distributed systems latency experience for high-frequency trading team.',
    screeningAnswers: [
      { question: 'Years of low-latency Rust/C++ experience?', answer: 'Mainly Java experience, eager to learn Rust.' }
    ]
  }
];

export const initialNotifications = [
  {
    id: 'notif-1',
    title: 'Application Shortlisted! 🎉',
    message: 'Nexus Innovations moved your Senior Frontend Engineer application to the Interviewing stage.',
    time: '12m ago',
    type: 'application',
    unread: true,
    link: '/jobseeker-dashboard'
  },
  {
    id: 'notif-2',
    title: 'New Message from Suzana Colin',
    message: 'Hi Furqan I saw your profile and thought you\'d be a great fit for the CEO role. Are you interested?',
    time: '35m ago',
    type: 'message',
    unread: true,
    link: '/chat?convId=conv-suzana'
  },
  {
    id: 'notif-3',
    title: 'Interview Scheduled 🗓️',
    message: 'Cognitive Dynamics AI confirmed your ML Engineer technical screening for Thursday at 2:00 PM EST.',
    time: '2h ago',
    type: 'interview',
    unread: true,
    link: '/jobseeker-dashboard'
  },
  {
    id: 'notif-4',
    title: 'New Role Matching Your Profile',
    message: 'Aurora Creative Labs posted a new opening: Senior UI Systems Engineer ($130k - $160k).',
    time: '1d ago',
    type: 'system',
    unread: false,
    link: '/job/job-2'
  },
  {
    id: 'notif-5',
    title: 'Profile Viewed by Recruiter',
    message: 'Talent Acquisition at Apex Financial Systems viewed your public resume.',
    time: '2d ago',
    type: 'system',
    unread: false,
    link: '/profile/furqan12'
  }
];

export const salaryBenchmarks = [
  {
    id: 'sal-1',
    role: 'Senior Frontend Engineer',
    category: 'tech',
    median: 145000,
    p25: 125000,
    p75: 175000,
    growth: '+14% YoY',
    topLocations: ['San Francisco ($162k)', 'New York ($154k)', 'Austin ($138k)', 'Remote ($142k)'],
    topSkills: ['React', 'TypeScript', 'Next.js', 'Design Systems', 'Performance Optimization'],
    description: 'Frontend engineers build accessible, responsive, and performant user interfaces that run in modern web browsers.'
  },
  {
    id: 'sal-2',
    role: 'Machine Learning Engineer',
    category: 'ai',
    median: 170000,
    p25: 140000,
    p75: 210000,
    growth: '+28% YoY',
    topLocations: ['San Francisco ($188k)', 'Seattle ($176k)', 'New York ($168k)', 'Remote ($165k)'],
    topSkills: ['PyTorch', 'Python', 'LLMs', 'Transformer Architectures', 'CUDA', 'Vector DBs'],
    description: 'ML engineers train, optimize, and deploy predictive models and generative AI systems to production infrastructure.'
  },
  {
    id: 'sal-3',
    role: 'Lead Product Designer',
    category: 'design',
    median: 135000,
    p25: 115000,
    p75: 160000,
    growth: '+9% YoY',
    topLocations: ['New York ($148k)', 'San Francisco ($152k)', 'Los Angeles ($134k)', 'Remote ($132k)'],
    topSkills: ['Figma', 'Design Systems', 'User Research', 'Interactive Prototyping', 'Design Tokens'],
    description: 'Product designers lead visual strategy, design scalable design systems, and collaborate with product and engineering teams.'
  },
  {
    id: 'sal-4',
    role: 'Full Stack Engineer',
    category: 'tech',
    median: 138000,
    p25: 118000,
    p75: 165000,
    growth: '+11% YoY',
    topLocations: ['San Francisco ($155k)', 'New York ($145k)', 'Chicago ($130k)', 'Remote ($136k)'],
    topSkills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker', 'GraphQL'],
    description: 'Full stack engineers bridge client-side user experience with server-side architecture, APIs, and databases.'
  },
  {
    id: 'sal-5',
    role: 'DevOps & Cloud Engineer',
    category: 'engineering',
    median: 152000,
    p25: 130000,
    p75: 182000,
    growth: '+16% YoY',
    topLocations: ['Seattle ($164k)', 'San Francisco ($170k)', 'Austin ($146k)', 'Remote ($150k)'],
    topSkills: ['Kubernetes', 'Terraform', 'AWS', 'CI/CD Pipelines', 'Docker', 'Prometheus'],
    description: 'DevOps engineers automate continuous deployment, configure cloud infrastructure, and ensure 99.99% system reliability.'
  }
];

export const publicProfiles = {
  'furqan12': {
    username: 'furqan12',
    name: 'Furqan Zeeshan',
    title: 'Senior Frontend Engineer & UI Specialist',
    location: 'San Francisco, CA (Open to Remote)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
    bio: 'Crafting responsive, high-performance web applications with modern React, TypeScript, and micro-interaction design systems. Obsessed with 60fps animations, accessible UX, and modular code architecture.',
    verified: true,
    availableForHire: true,
    experienceYears: 5,
    education: 'B.S. in Computer Science — Fast NUCES',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    portfolio: 'https://jobfiesta.io',
    skills: ['React', 'TypeScript', 'Vite', 'Next.js', 'TailwindCSS', 'CSS Architecture', 'Jest', 'REST & GraphQL'],
    experiences: [
      {
        role: 'Senior Frontend Developer',
        company: 'CloudScale Technologies',
        period: '2023 - Present',
        description: 'Led a team of 4 engineers rebuilding the customer analytics dashboard, cutting initial page load time by 42% and implementing a unified design token system.'
      },
      {
        role: 'Frontend Engineer',
        company: 'Digital Horizon Labs',
        period: '2021 - 2023',
        description: 'Developed responsive, accessible web portals for enterprise fintech clients utilizing React, Redux Toolkit, and WebSocket real-time feeds.'
      }
    ],
    projects: [
      {
        name: 'Job Fiesta Portal',
        tag: 'Fullstack Job Ecosystem',
        description: 'Next-gen job hunting platform featuring live recruiter chat, AI resume builder, and ATS candidate screening.',
        tech: ['React', 'Vite', 'Express', 'Socket.io']
      },
      {
        name: 'Fluid Design System',
        tag: 'Open Source UI Library',
        description: 'Zero-dependency accessible component library with origin-aware micro-transitions and dark mode support.',
        tech: ['TypeScript', 'CSS Tokens', 'Storybook']
      }
    ]
  },
  'rehansajid': {
    username: 'rehansajid',
    name: 'Rehan Sajjid',
    title: 'Frontend Developer & UI Engineer',
    location: 'Remote (Worldwide)',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces',
    bio: 'Specializing in Swiss-style typographic layouts, 3D Canvas integration, and fluid micro-transitions. Building web products that feel alive.',
    verified: true,
    availableForHire: true,
    experienceYears: 4,
    education: 'B.S. Software Engineering',
    github: 'https://github.com/Rehansajid2130',
    linkedin: 'https://linkedin.com',
    portfolio: 'http://localhost:8080',
    skills: ['React', 'JavaScript', 'CSS3', 'Three.js', 'Figma', 'Node.js', 'Express', 'Vite'],
    experiences: [
      {
        role: 'UI Engineer & Creative Dev',
        company: 'Independent Studio',
        period: '2022 - Present',
        description: 'Designing and building high-performance creative portfolios, 3D product visualizers, and web platforms.'
      }
    ],
    projects: [
      {
        name: 'Job Fiesta FYP',
        tag: 'Enterprise Web Application',
        description: 'Full-featured job portal with real-time recruiter chat, AI resume generation, and ATS pipeline.',
        tech: ['React', 'Node.js', 'Express', 'Socket.io']
      }
    ]
  }
};
