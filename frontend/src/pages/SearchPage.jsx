import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import JobFilterSidebar from '../components/jobs/JobFilterSidebar';
import SearchSideNav from '../components/jobs/SearchSideNav';
import FigmaJobCard from '../components/jobs/FigmaJobCard';
import FigmaTalentCard from '../components/jobs/FigmaTalentCard';
import FigmaApplicationCard from '../components/jobs/FigmaApplicationCard';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Send, 
  Briefcase, 
  User, 
  Layers,
  ArrowRight,
  Star
} from 'lucide-react';

const figmaMockJobs = [
  {
    id: 'figma-job-1',
    title: 'Senior Frontend Engineer',
    company: 'Google',
    logo: '/assets/images/google_logo.png',
    location: 'Mountain View, CA (Hybrid)',
    type: 'PART-TIME',
    category: 'tech',
    workMode: 'Hybrid',
    experience: 'Senior Level',
    salary: '$130k - $160k',
    salaryMin: 130000,
    salaryMax: 160000,
    postedDate: '2 days ago',
    applicantsCount: 45,
    description: 'Build high-performance web applications using modern React, TypeScript, and state-of-the-art web performance tools at Google scale.'
  },
  {
    id: 'figma-job-2',
    title: 'Lead Product Designer',
    company: 'Apple',
    logo: '/assets/images/applelogo_1.png',
    location: 'Cupertino, CA (On-site)',
    type: 'FULL-TIME',
    category: 'design',
    workMode: 'On-site',
    experience: 'Expert / Lead',
    salary: '$140k - $180k',
    salaryMin: 140000,
    salaryMax: 180000,
    postedDate: 'Just now',
    applicantsCount: 32,
    description: 'Design breathtaking digital experiences and interface ecosystems for Apple products and developer frameworks.'
  },
  {
    id: 'figma-job-3',
    title: 'Hardware Systems Architect',
    company: 'Intel',
    logo: '/assets/images/group_14049_1.svg',
    location: 'Santa Clara, CA (Hybrid)',
    type: 'FULL-TIME',
    category: 'engineering',
    workMode: 'Hybrid',
    experience: 'Mid-Senior',
    salary: '$150k - $190k',
    salaryMin: 150000,
    salaryMax: 190000,
    postedDate: '3 days ago',
    applicantsCount: 19,
    description: 'Architect next-generation silicon architectures, microcode performance layers, and power-efficient edge hardware.'
  },
  {
    id: 'figma-job-4',
    title: 'Cloud Infrastructure Engineer',
    company: 'Google',
    logo: '/assets/images/google_logo.png',
    location: 'New York, NY (Remote)',
    type: 'FULL-TIME',
    category: 'tech',
    workMode: 'Remote',
    experience: 'Senior Level',
    salary: '$145k - $175k',
    salaryMin: 145000,
    salaryMax: 175000,
    postedDate: '4 days ago',
    applicantsCount: 58,
    description: 'Scale Google Cloud Platform distributed clusters, global load balancers, and resilient storage networks.'
  },
  {
    id: 'figma-job-5',
    title: 'Design Systems Specialist',
    company: 'Apple',
    logo: '/assets/images/applelogo_1.png',
    location: 'Austin, TX (Remote)',
    type: 'PART-TIME',
    category: 'design',
    workMode: 'Remote',
    experience: 'Mid-Senior',
    salary: '$115k - $145k',
    salaryMin: 115000,
    salaryMax: 145000,
    postedDate: '5 days ago',
    applicantsCount: 24,
    description: 'Craft harmonious component libraries, tokens, and multi-platform accessible design guidelines.'
  },
  {
    id: 'figma-job-6',
    title: 'AI Silicon Performance Engineer',
    company: 'Intel',
    logo: '/assets/images/group_14049_1.svg',
    location: 'San Jose, CA (Hybrid)',
    type: 'FULL-TIME',
    category: 'ai',
    workMode: 'Hybrid',
    experience: 'Expert / Lead',
    salary: '$165k - $210k',
    salaryMin: 165000,
    salaryMax: 210000,
    postedDate: '1 week ago',
    applicantsCount: 67,
    description: 'Optimize deep neural network inference acceleration across Intel Gaudi, Xeon, and GPU matrix engines.'
  }
];

const figmaTalents = [
  {
    id: 'talent-1',
    name: 'Furqan Zeeshan',
    skills: 'Web Development, App Development',
    location: 'Lahore, PK',
    salaryRange: '20k - 25k PKR',
    experience: '3+ Years',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 'talent-2',
    name: 'Muhammad Ali',
    skills: 'Mern Stack Developer',
    location: 'Lahore, PK',
    salaryRange: '40k - 55k PKR',
    experience: '4+ Years',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 'talent-3',
    name: 'Sara Khan',
    skills: 'UI/UX Designer, Prototyping',
    location: 'Islamabad, PK',
    salaryRange: '35k - 45k PKR',
    experience: '3+ Years',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 'talent-4',
    name: 'Hamza Tariq',
    skills: 'Python & AI Engineer',
    location: 'Karachi, PK',
    salaryRange: '50k - 70k PKR',
    experience: '5+ Years',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'
  }
];

const initialApplicationsData = [
  {
    id: 'app-1',
    name: 'Rehan Sajid',
    appliedFor: 'UX Designer',
    status: 'Under Review',
    date: 'Sep 21, 2026',
    rating: 0
  },
  {
    id: 'app-2',
    name: 'Zeeshan',
    appliedFor: 'Web Developer',
    status: 'Under Review',
    date: 'Sep 20, 2026',
    rating: 0
  },
  {
    id: 'app-3',
    name: 'Shan',
    appliedFor: 'Graphic Designer',
    status: 'Reviewed',
    date: 'Sep 18, 2026',
    rating: 5
  },
  {
    id: 'app-4',
    name: 'Ahsan',
    appliedFor: 'Software Engineer',
    status: 'Reviewed',
    date: 'Sep 17, 2026',
    rating: 4
  }
];

const SearchPage = () => {
  const { jobs: contextJobs, applyToJob } = useJobs();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Screen View Mode: 'all_jobs_filter' (Figma Screen 1), 'candidate_search' (Figma Screen 2), 'recruiter_search' (Figma Screen 3)
  const [viewMode, setViewMode] = useState(() => {
    const viewParam = searchParams.get('view');
    if (viewParam === 'candidate') return 'candidate_search';
    if (viewParam === 'recruiter') return 'recruiter_search';
    if (user?.userType === 'recruiter') return 'recruiter_search';
    return 'all_jobs_filter';
  });

  // Search Inputs
  const [keywordInput, setKeywordInput] = useState(searchParams.get('keyword') || '');
  const [locationInput, setLocationInput] = useState(searchParams.get('location') || '');

  // Filter state for Screen 1
  const [filters, setFilters] = useState({
    minSalary: '',
    maxSalary: '',
    jobTypes: [],
    workModes: [],
    experienceLevels: [],
    category: searchParams.get('category') || 'all'
  });

  // Applications list for Screen 3
  const [applications, setApplications] = useState(initialApplicationsData);

  // Modals
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyModalJob, setApplyModalJob] = useState(null);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Synchronize URL parameters
  useEffect(() => {
    const kw = searchParams.get('keyword');
    const loc = searchParams.get('location');
    const cat = searchParams.get('category');
    if (kw !== null) setKeywordInput(kw);
    if (loc !== null) setLocationInput(loc);
    if (cat !== null) setFilters(prev => ({ ...prev, category: cat }));
  }, [searchParams]);

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (keywordInput.trim()) {
      newParams.set('keyword', keywordInput.trim());
    } else {
      newParams.delete('keyword');
    }
    if (locationInput.trim()) {
      newParams.set('location', locationInput.trim());
    } else {
      newParams.delete('location');
    }
    setSearchParams(newParams);
  };

  // Combine mock Figma jobs with any user-posted context jobs
  const combinedJobs = [
    ...figmaMockJobs,
    ...(contextJobs || []).map(j => ({
      id: j.id,
      title: j.title,
      company: j.company,
      logo: j.logo || '/assets/images/google_logo.png',
      location: j.location,
      type: (j.type || 'Full-Time').toUpperCase(),
      category: j.category,
      workMode: j.location?.toLowerCase().includes('remote') ? 'Remote' : (j.location?.toLowerCase().includes('hybrid') ? 'Hybrid' : 'On-site'),
      experience: j.experience || 'Mid-Senior',
      salary: j.salary || '$120k - $150k',
      salaryMin: j.salaryMin || 120000,
      salaryMax: j.salaryMax || 150000,
      postedDate: j.postedDate || 'Recent',
      applicantsCount: j.applicantsCount || 28,
      description: j.description || 'Join our innovative engineering team.'
    }))
  ];

  // Filtering logic
  const filteredJobs = combinedJobs.filter(job => {
    if (keywordInput.trim()) {
      const q = keywordInput.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company.toLowerCase().includes(q);
      if (!matchTitle && !matchCompany) return false;
    }

    if (locationInput.trim()) {
      const locQ = locationInput.toLowerCase();
      if (!job.location.toLowerCase().includes(locQ)) return false;
    }

    if (filters.category && filters.category !== 'all') {
      if (job.category !== filters.category) return false;
    }

    if (filters.jobTypes.length > 0) {
      const matchesType = filters.jobTypes.some(t => job.type.toLowerCase().includes(t.toLowerCase()));
      if (!matchesType) return false;
    }

    if (filters.workModes.length > 0) {
      const matchesMode = filters.workModes.some(m => job.workMode.toLowerCase().includes(m.toLowerCase()));
      if (!matchesMode) return false;
    }

    if (filters.experienceLevels.length > 0) {
      const matchesExp = filters.experienceLevels.some(exp => job.experience.toLowerCase().includes(exp.toLowerCase()));
      if (!matchesExp) return false;
    }

    if (filters.minSalary) {
      const min = parseInt(filters.minSalary, 10);
      if (!isNaN(min) && (job.salaryMin || 0) < min) return false;
    }

    if (filters.maxSalary) {
      const max = parseInt(filters.maxSalary, 10);
      if (!isNaN(max) && (job.salaryMax || 999999) > max) return false;
    }

    return true;
  });

  const handleRateApplication = (appId, newRating) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, rating: newRating } : a));
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (applyModalJob) {
      applyToJob(applyModalJob.id, coverNote);
      setApplySuccess(true);
      setTimeout(() => {
        setApplySuccess(false);
        setApplyModalJob(null);
        setCoverNote('');
      }, 1500);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAF9' }}>
      <Navbar />

      {/* Top Banner / Hero Matching Figma */}
      <section style={{
        backgroundColor: '#F4FDF6',
        padding: '36px 0 32px 0',
        borderBottom: '1px solid rgba(12, 70, 59, 0.08)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: '800',
              color: '#0C463B',
              letterSpacing: '-0.02em',
              marginBottom: '8px',
              fontFamily: 'Inter, sans-serif'
            }}>
              Job Search
            </h1>
            <p style={{
              fontSize: '1rem',
              color: '#4B5563',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Search for your desired job matching your skills
            </p>
          </div>

          {/* Dual-Input Pill Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '9999px',
              boxShadow: '0 8px 30px rgba(12, 70, 59, 0.08)',
              padding: '8px 12px 8px 24px',
              display: 'flex',
              alignItems: 'center',
              maxWidth: '780px',
              margin: '0 auto',
              border: '1px solid rgba(12, 70, 59, 0.12)',
              gap: '12px',
              flexWrap: 'wrap'
            }}
          >
            {/* Input 1: Job title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '180px' }}>
              <Search size={18} color="#0C463B" style={{ flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Enter Job title"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '14px',
                  color: '#111827',
                  backgroundColor: 'transparent'
                }}
              />
            </div>

            {/* Vertical Divider */}
            <div style={{ width: '1px', height: '28px', backgroundColor: '#E5E7EB', display: 'none', sm: 'block' }} className="d-none d-sm-block" />

            {/* Input 2: Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '180px' }}>
              <MapPin size={18} color="#0C463B" style={{ flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Enter location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '14px',
                  color: '#111827',
                  backgroundColor: 'transparent'
                }}
              />
            </div>

            {/* Search Pill Button */}
            <button
              type="submit"
              style={{
                backgroundColor: '#0C463B',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '9999px',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
                boxShadow: '0 4px 12px rgba(12, 70, 59, 0.2)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#08332B'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0C463B'}
            >
              Search
            </button>
          </form>

          {/* Interactive Screen View Selector Tabs (Matches exact Figma 3 screens) */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '24px',
            flexWrap: 'wrap'
          }}>
            <button
              type="button"
              onClick={() => {
                setViewMode('all_jobs_filter');
                const p = new URLSearchParams(searchParams);
                p.delete('view');
                setSearchParams(p);
              }}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                border: viewMode === 'all_jobs_filter' ? '2px solid #0C463B' : '1px solid #D1D5DB',
                backgroundColor: viewMode === 'all_jobs_filter' ? '#0C463B' : '#FFFFFF',
                color: viewMode === 'all_jobs_filter' ? '#FFFFFF' : '#374151',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <SlidersHorizontal size={14} />
              Job Search & Filters (Figma 1)
            </button>

            <button
              type="button"
              onClick={() => {
                setViewMode('candidate_search');
                const p = new URLSearchParams(searchParams);
                p.set('view', 'candidate');
                setSearchParams(p);
              }}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                border: viewMode === 'candidate_search' ? '2px solid #0C463B' : '1px solid #D1D5DB',
                backgroundColor: viewMode === 'candidate_search' ? '#0C463B' : '#FFFFFF',
                color: viewMode === 'candidate_search' ? '#FFFFFF' : '#374151',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <Briefcase size={14} />
              Candidate Dashboard (Figma 2)
            </button>

            <button
              type="button"
              onClick={() => {
                setViewMode('recruiter_search');
                const p = new URLSearchParams(searchParams);
                p.set('view', 'recruiter');
                setSearchParams(p);
              }}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                border: viewMode === 'recruiter_search' ? '2px solid #0C463B' : '1px solid #D1D5DB',
                backgroundColor: viewMode === 'recruiter_search' ? '#0C463B' : '#FFFFFF',
                color: viewMode === 'recruiter_search' ? '#FFFFFF' : '#374151',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <User size={14} />
              Recruiter & Talent View (Figma 3)
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '36px 0 60px 0' }}>
        <div className="container">

          {/* ========================================================= */}
          {/* VIEW 1: Figma Screen 1 - Public Job Search with Filter Sidebar */}
          {/* ========================================================= */}
          {viewMode === 'all_jobs_filter' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 300px) 1fr', gap: '32px', alignItems: 'start' }} className="search-grid-layout">
              {/* Left Accordion Filter Sidebar */}
              <aside className="d-none d-lg-block">
                <JobFilterSidebar 
                  filters={filters} 
                  setFilters={setFilters} 
                  totalJobsCount={combinedJobs.length} 
                />
              </aside>

              {/* Mobile Filter Toggle Button */}
              <div className="d-block d-lg-none" style={{ gridColumn: '1 / -1', marginBottom: '12px' }}>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    color: '#0C463B',
                    fontWeight: '700',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <SlidersHorizontal size={18} />
                  {mobileFilterOpen ? 'Hide Filters' : 'Show All Job Filters'}
                </button>
                {mobileFilterOpen && (
                  <div style={{ marginTop: '16px' }}>
                    <JobFilterSidebar 
                      filters={filters} 
                      setFilters={setFilters} 
                      totalJobsCount={combinedJobs.length} 
                    />
                  </div>
                )}
              </div>

              {/* Right Jobs Area: Header + 2-Column Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{
                    fontSize: '22px',
                    fontWeight: '800',
                    color: '#111827',
                    margin: 0,
                    letterSpacing: '-0.01em'
                  }}>
                    All Jobs <span style={{ color: '#0C463B', fontWeight: '700', fontSize: '18px' }}>({filteredJobs.length || '2310'})</span>
                  </h2>
                </div>

                {filteredJobs.length === 0 ? (
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '48px 24px',
                    textAlign: 'center',
                    border: '1px dashed #CBD5E1'
                  }}>
                    <Briefcase size={40} color="#94A3B8" style={{ margin: '0 auto 16px auto' }} />
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>
                      No matching jobs found
                    </h3>
                    <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '420px', margin: '0 auto 20px auto' }}>
                      Try relaxing your salary range or unchecking some filter categories.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFilters({ minSalary: '', maxSalary: '', jobTypes: [], workModes: [], experienceLevels: [], category: 'all' })}
                      style={{
                        padding: '10px 24px',
                        backgroundColor: '#0C463B',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '9999px',
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px'
                  }}>
                    {filteredJobs.map((job) => (
                      <FigmaJobCard
                        key={job.id}
                        job={job}
                        onViewDetails={(j) => setSelectedJob(j)}
                        onApply={(j) => setApplyModalJob(j)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 2: Figma Screen 2 - Candidate Dashboard Search */}
          {/* ========================================================= */}
          {viewMode === 'candidate_search' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: '32px', alignItems: 'start' }} className="search-grid-layout">
              {/* Left Dark Green Vertical Nav */}
              <aside>
                <SearchSideNav activeKey="jobs" userRole="candidate" />
              </aside>

              {/* Right Content: Top Jobs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{
                    fontSize: '22px',
                    fontWeight: '800',
                    color: '#111827',
                    margin: 0,
                    letterSpacing: '-0.01em'
                  }}>
                    Top Jobs
                  </h2>
                  <button
                    type="button"
                    onClick={() => navigate('/resume-generator')}
                    style={{
                      backgroundColor: '#0C463B',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '8px 18px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    Generate Resume ✈️
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '20px'
                }}>
                  {figmaMockJobs.map((job) => (
                    <FigmaJobCard
                      key={job.id}
                      job={job}
                      onViewDetails={(j) => setSelectedJob(j)}
                      onApply={(j) => setApplyModalJob(j)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 3: Figma Screen 3 - Recruiter Talent Search & In Progress */}
          {/* ========================================================= */}
          {viewMode === 'recruiter_search' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: '32px', alignItems: 'start' }} className="search-grid-layout">
              {/* Left Dark Green Vertical Nav */}
              <aside>
                <SearchSideNav activeKey="jobs" userRole="recruiter" />
              </aside>

              {/* Right Recruiter Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                
                {/* Section A: Top Talent Suggestions */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{
                      fontSize: '22px',
                      fontWeight: '800',
                      color: '#111827',
                      margin: 0,
                      letterSpacing: '-0.01em'
                    }}>
                      Top Talent Suggestions
                    </h2>
                    <button
                      type="button"
                      onClick={() => navigate('/post-job')}
                      style={{
                        backgroundColor: '#0C463B',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '9999px',
                        padding: '8px 18px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      Post a Job ✈️
                    </button>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px'
                  }}>
                    {figmaTalents.map((talent) => (
                      <FigmaTalentCard
                        key={talent.id}
                        talent={talent}
                        onViewProfile={(t) => setSelectedTalent(t)}
                      />
                    ))}
                  </div>
                </div>

                {/* Section B: Applications in Progress */}
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <h2 style={{
                      fontSize: '22px',
                      fontWeight: '800',
                      color: '#111827',
                      margin: 0,
                      letterSpacing: '-0.01em'
                    }}>
                      Applications in Progress
                    </h2>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px'
                  }}>
                    {applications.map((app) => (
                      <FigmaApplicationCard
                        key={app.id}
                        application={app}
                        onViewApplication={(a) => setSelectedApplication(a)}
                        onRate={handleRateApplication}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

      {/* ========================================================= */}
      {/* MODAL 1: Quick Apply Modal */}
      {/* ========================================================= */}
      {applyModalJob && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '520px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button
              type="button"
              onClick={() => setApplyModalJob(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6B7280'
              }}
            >
              <X size={22} />
            </button>

            {applySuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <CheckCircle2 size={56} color="#10B981" style={{ margin: '0 auto 16px auto' }} />
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0C463B', marginBottom: '8px' }}>
                  Application Submitted!
                </h3>
                <p style={{ fontSize: '14px', color: '#4B5563' }}>
                  Your profile and cover note have been securely transmitted to {applyModalJob.company}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                  <img
                    src={applyModalJob.logo}
                    alt={applyModalJob.company}
                    style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', margin: 0 }}>
                      Apply to {applyModalJob.company}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                      {applyModalJob.title} • {applyModalJob.location}
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>
                    Candidate Name
                  </label>
                  <input
                    type="text"
                    disabled
                    value={user?.name || 'Rehan Sajid'}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      backgroundColor: '#F9FAFB',
                      fontSize: '14px',
                      color: '#4B5563'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || 'rehan.candidate@jobfiesta.io'}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      backgroundColor: '#F9FAFB',
                      fontSize: '14px',
                      color: '#4B5563'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>
                    Cover Note / Brief Introduction
                  </label>
                  <textarea
                    rows={4}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Describe how your experience aligns with this position..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '14px',
                      color: '#111827',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setApplyModalJob(null)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '9999px',
                      border: '1px solid #D1D5DB',
                      backgroundColor: '#FFFFFF',
                      color: '#4B5563',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 24px',
                      borderRadius: '9999px',
                      border: 'none',
                      backgroundColor: '#0C463B',
                      color: '#FFFFFF',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Send size={15} />
                    Confirm Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: View Job Details Modal */}
      {/* ========================================================= */}
      {selectedJob && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '640px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button
              type="button"
              onClick={() => setSelectedJob(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6B7280'
              }}
            >
              <X size={22} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <img
                src={selectedJob.logo}
                alt={selectedJob.company}
                style={{ width: '56px', height: '56px', objectFit: 'contain' }}
              />
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: 0 }}>
                  {selectedJob.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#0C463B', fontWeight: '600', margin: '4px 0 0 0' }}>
                  {selectedJob.company} • {selectedJob.location}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <span style={{ backgroundColor: '#0C463B', color: '#FFFFFF', fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '4px' }}>
                {selectedJob.type}
              </span>
              <span style={{ backgroundColor: '#F0FDF4', color: '#166534', fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '4px' }}>
                {selectedJob.salary}
              </span>
              <span style={{ backgroundColor: '#F3F4F6', color: '#374151', fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '4px' }}>
                {selectedJob.experience}
              </span>
            </div>

            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
              Position Overview
            </h4>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#4B5563', marginBottom: '24px' }}>
              {selectedJob.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '20px' }}>
              <span style={{ fontSize: '13px', color: '#6B7280' }}>
                {selectedJob.applicantsCount} professionals applied
              </span>
              <button
                type="button"
                onClick={() => {
                  const target = selectedJob;
                  setSelectedJob(null);
                  setApplyModalJob(target);
                }}
                style={{
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '10px 24px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Apply for this Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: View Talent Profile Modal */}
      {/* ========================================================= */}
      {selectedTalent && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '500px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            position: 'relative'
          }}>
            <button
              type="button"
              onClick={() => setSelectedTalent(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6B7280'
              }}
            >
              <X size={22} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img
                src={selectedTalent.avatar}
                alt={selectedTalent.name}
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px auto' }}
              />
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: '0 0 4px 0' }}>
                {selectedTalent.name}
              </h3>
              <p style={{ fontSize: '14px', color: '#0C463B', fontWeight: '600', margin: 0 }}>
                {selectedTalent.skills}
              </p>
            </div>

            <div style={{ backgroundColor: '#F9FAFB', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#6B7280' }}>Location:</span>
                <span style={{ fontWeight: '600', color: '#111827' }}>{selectedTalent.location}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#6B7280' }}>Expected Salary:</span>
                <span style={{ fontWeight: '600', color: '#0C463B' }}>{selectedTalent.salaryRange}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#6B7280' }}>Experience:</span>
                <span style={{ fontWeight: '600', color: '#111827' }}>{selectedTalent.experience}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedTalent(null);
                navigate('/chat');
              }}
              style={{
                width: '100%',
                backgroundColor: '#0C463B',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '9999px',
                padding: '12px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Message Candidate
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: View Application Details Modal */}
      {/* ========================================================= */}
      {selectedApplication && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '500px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            position: 'relative'
          }}>
            <button
              type="button"
              onClick={() => setSelectedApplication(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6B7280'
              }}
            >
              <X size={22} />
            </button>

            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', marginBottom: '16px' }}>
              Application Review
            </h3>

            <div style={{ backgroundColor: '#F4FDF6', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#4B5563' }}>Applicant:</span>
                <span style={{ fontWeight: '700', color: '#111827' }}>{selectedApplication.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#4B5563' }}>Role Applied:</span>
                <span style={{ fontWeight: '700', color: '#0C463B' }}>{selectedApplication.appliedFor}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#4B5563' }}>Status:</span>
                <span style={{ fontWeight: '700', color: '#047857' }}>{selectedApplication.status}</span>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
                Candidate's profile and qualifications match 92% of the requirement criteria. You can rate this candidate below or schedule an interview.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '9999px',
                  border: '1px solid #D1D5DB',
                  backgroundColor: '#FFFFFF',
                  color: '#4B5563',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedApplication(null);
                  navigate('/chat');
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive media query helper */}
      <style>{`
        @media (max-width: 991px) {
          .search-grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default SearchPage;
