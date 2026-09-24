import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import JobFilterSidebar from '../components/jobs/JobFilterSidebar';
import FigmaJobCard from '../components/jobs/FigmaJobCard';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  CheckCircle2, 
  X, 
  Send, 
  Briefcase,
  ChevronDown,
  Loader2
} from 'lucide-react';

const figmaMockJobs = [
  {
    id: 'figma-job-1',
    title: 'Technical Support Specialist',
    company: 'Google Inc.',
    logo: '/assets/images/google_logo.png',
    location: 'New Delhi, India',
    type: 'PART-TIME',
    category: 'tech',
    workMode: 'On-site',
    experience: 'Junior',
    salary: '20,000 INR - 25,000 INR',
    salaryMin: 20000,
    salaryMax: 25000,
    postedDate: '2 days ago',
    applicantsCount: 10,
    description: 'Provide technical assistance and troubleshooting support for enterprise infrastructure.'
  },
  {
    id: 'figma-job-2',
    title: 'Senior UI/UX Designer',
    company: 'Apple',
    logo: '/assets/images/applelogo_1.png',
    location: 'Boston, USA',
    type: 'FULL-TIME',
    category: 'design',
    workMode: 'On-site',
    experience: 'Senior Level',
    salary: '$30,000 - $55,000',
    salaryMin: 30000,
    salaryMax: 55000,
    postedDate: 'Just now',
    applicantsCount: 9,
    description: 'Design breathtaking digital experiences and interface ecosystems for Apple products.'
  },
  {
    id: 'figma-job-3',
    title: 'Marketing Officer',
    company: 'Intel Corp',
    logo: '/assets/images/group_14049_1.svg',
    location: 'Bangalore, India',
    type: 'PART-TIME',
    category: 'engineering',
    workMode: 'Hybrid',
    experience: 'Mid-Level',
    salary: '15,000 INR - 35,000 INR',
    salaryMin: 15000,
    salaryMax: 35000,
    postedDate: '3 days ago',
    applicantsCount: 30,
    isBookmarked: true,
    description: 'Lead digital outreach, technical product campaigns, and regional partner engagements.'
  },
  {
    id: 'figma-job-4',
    title: 'Technical Support Specialist',
    company: 'Google Inc.',
    logo: '/assets/images/google_logo.png',
    location: 'Mumbai, India',
    type: 'PART-TIME',
    category: 'tech',
    workMode: 'Remote',
    experience: 'Junior',
    salary: '20,000 INR - 28,000 INR',
    salaryMin: 20000,
    salaryMax: 28000,
    postedDate: '4 days ago',
    applicantsCount: 15,
    description: 'Resolve client system requests, perform diagnostics, and maintain internal services.'
  },
  {
    id: 'figma-job-5',
    title: 'Senior UI/UX Designer',
    company: 'Apple',
    logo: '/assets/images/applelogo_1.png',
    location: 'New York, USA',
    type: 'FULL-TIME',
    category: 'design',
    workMode: 'Remote',
    experience: 'Senior Level',
    salary: '$35,000 - $60,000',
    salaryMin: 35000,
    salaryMax: 60000,
    postedDate: '5 days ago',
    applicantsCount: 12,
    description: 'Lead user experience design systems, user flows, and high fidelity interactive prototypes.'
  },
  {
    id: 'figma-job-6',
    title: 'Marketing Officer',
    company: 'Intel Corp',
    logo: '/assets/images/group_14049_1.svg',
    location: 'Hyderabad, India',
    type: 'PART-TIME',
    category: 'ai',
    workMode: 'Hybrid',
    experience: 'Mid-Level',
    salary: '18,000 INR - 32,000 INR',
    salaryMin: 18000,
    salaryMax: 32000,
    postedDate: '1 week ago',
    applicantsCount: 25,
    description: 'Promote semiconductor developer tools and developer events across key tech hubs.'
  }
];

const SearchPage = () => {
  const { jobs: contextJobs, applyToJob, toggleSaveJob, savedJobIds } = useJobs();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search Inputs
  const [keywordInput, setKeywordInput] = useState(searchParams.get('keyword') || '');
  const [locationInput, setLocationInput] = useState(searchParams.get('location') || '');

  // Filter state aligned with JobFilterSidebar
  const [filters, setFilters] = useState({
    minSalary: '',
    maxSalary: '',
    type: 'all',
    workMode: 'all',
    experience: 'all',
    category: searchParams.get('category') || 'all'
  });

  const [selectedSort, setSelectedSort] = useState('popular');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [liveJobs, setLiveJobs] = useState([]);
  const [isLiveLoading, setIsLiveLoading] = useState(false);
  const [usingLiveApi, setUsingLiveApi] = useState(false);

  // Modal state for applying
  const [applyModalJob, setApplyModalJob] = useState(null);
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

  const handleResetFilters = () => {
    setFilters({
      minSalary: '',
      maxSalary: '',
      type: 'all',
      workMode: 'all',
      experience: 'all',
      category: 'all'
    });
    setKeywordInput('');
    setLocationInput('');
    setSelectedSort('popular');
    setSearchParams(new URLSearchParams());
  };

  // Fetch live jobs from backend API whenever search/filter criteria change
  useEffect(() => {
    let isCancelled = false;
    const fetchLiveJobs = async () => {
      setIsLiveLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const params = {};
        if (keywordInput.trim()) params.keyword = keywordInput.trim();
        if (locationInput.trim()) params.location = locationInput.trim();
        if (filters.category && filters.category !== 'all') params.category = filters.category;
        if (filters.type && filters.type !== 'all') params.jobType = filters.type;
        if (filters.workMode && filters.workMode !== 'all') params.workplaceType = filters.workMode;
        if (filters.experience && filters.experience !== 'all') {
          params.experienceLevel = filters.experience.replace(' Level', '').replace(' level', '');
        }
        if (filters.minSalary) params.minSalary = filters.minSalary;
        if (filters.maxSalary) params.maxSalary = filters.maxSalary;
        if (selectedSort) params.sort = selectedSort;

        const res = await axios.get(`${apiUrl}/api/jobs`, { params, timeout: 3500 });
        if (!isCancelled && res.data?.jobs) {
          const mapped = res.data.jobs.map((job) => ({
            id: job._id,
            title: job.title,
            company: job.company,
            logo: job.companyLogo || '/assets/images/google_logo.png',
            location: job.location,
            type: (job.jobType || 'Full-time').toUpperCase(),
            category: job.category?.toLowerCase() || 'tech',
            workMode: job.workplaceType || 'On-site',
            experience: job.experienceLevel || 'Mid-Level',
            salary: job.currency === 'INR'
              ? `${Number(job.salaryMin).toLocaleString()} INR - ${Number(job.salaryMax).toLocaleString()} INR`
              : `$${Number(job.salaryMin).toLocaleString()} - $${Number(job.salaryMax).toLocaleString()}`,
            salaryMin: job.salaryMin,
            salaryMax: job.salaryMax,
            postedDate: 'Recently',
            applicantsCount: job.applicantsCount || 0,
            description: job.description,
            isBookmarked: savedJobIds?.includes(job._id) || false,
          }));
          setLiveJobs(mapped);
          setUsingLiveApi(true);
        }
      } catch (err) {
        console.info('Backend live API unavailable, using local jobs data:', err.message);
        setUsingLiveApi(false);
      } finally {
        if (!isCancelled) setIsLiveLoading(false);
      }
    };

    fetchLiveJobs();

    return () => {
      isCancelled = true;
    };
  }, [keywordInput, locationInput, filters, selectedSort, savedJobIds]);

  // Combine mock Figma jobs with any user-posted context jobs (used as robust fallback)
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
      description: j.description || 'Join our innovative engineering team.',
      isBookmarked: savedJobIds?.includes(j.id) || false
    }))
  ];

  // Client-side filtering logic for fallback
  const filteredJobs = combinedJobs
    .filter(job => {
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

      if (filters.type && filters.type !== 'all') {
        const matchesType = job.type.toLowerCase().includes(filters.type.toLowerCase());
        if (!matchesType) return false;
      }

      if (filters.workMode && filters.workMode !== 'all') {
        const matchesMode = job.workMode.toLowerCase().includes(filters.workMode.toLowerCase());
        if (!matchesMode) return false;
      }

      if (filters.experience && filters.experience !== 'all') {
        const matchesExp = job.experience.toLowerCase().includes(filters.experience.toLowerCase());
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
    })
    .sort((a, b) => {
      if (selectedSort === 'popular') {
        return (b.applicantsCount || 0) - (a.applicantsCount || 0);
      } else if (selectedSort === 'salary_high') {
        return (b.salaryMax || 0) - (a.salaryMax || 0);
      } else if (selectedSort === 'salary_low') {
        return (a.salaryMin || 0) - (b.salaryMin || 0);
      }
      return 0;
    });

  const displayedJobs = usingLiveApi ? liveJobs : filteredJobs;


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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Navbar />

      {/* Top Banner / Hero Matching Figma */}
      <section style={{
        backgroundColor: '#FFFFFF',
        padding: '36px 0 28px 0'
      }}>
        {/* ponytail: reusing global .container */}
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '22px' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: '800',
              color: '#111827',
              letterSpacing: '-0.02em',
              marginBottom: '8px',
              fontFamily: 'Inter, sans-serif'
            }}>
              Job Search
            </h1>
            <p style={{
              fontSize: '1rem',
              color: '#6B7280',
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
              backgroundColor: '#F7F7F7',
              borderRadius: '9999px',
              boxShadow: 'none',
              padding: '6px 8px 6px 24px',
              display: 'flex',
              alignItems: 'center',
              maxWidth: '780px',
              margin: '0 auto',
              border: 'none',
              gap: '12px',
              flexWrap: 'wrap'
            }}
          >
            {/* Input 1: Job title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '180px' }}>
              <Search size={18} color="#6B7280" style={{ flexShrink: 0 }} />
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
            <div style={{ width: '1px', height: '26px', backgroundColor: '#E5E7EB', display: 'none', sm: 'block' }} className="d-none d-sm-block" />

            {/* Input 2: Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '180px' }}>
              <MapPin size={18} color="#6B7280" style={{ flexShrink: 0 }} />
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
                backgroundColor: '#0D473B',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '9999px',
                padding: '11px 28px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
                boxShadow: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#092F27'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0D473B'}
            >
              Search
            </button>
          </form>

        </div>
      </section>

      {/* Main Content Area - Figma Screen 1: Job Search with Filter Sidebar */}
      <main style={{ flex: 1, padding: '24px 0 60px 0' }}>
        {/* ponytail: reusing global .container */}
        <div className="container">
          
          {/* Mobile Filter Toggle Button (Visible only on mobile devices) */}
          <div className="search-mobile-filter-bar">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#F7F7F7',
                border: 'none',
                color: '#0D473B',
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}
            >
              <SlidersHorizontal size={18} />
              {mobileFilterOpen ? 'Hide Filters' : 'Show All Job Filters'}
            </button>
            {mobileFilterOpen && (
              <div style={{ marginBottom: '24px' }}>
                <JobFilterSidebar 
                  filters={filters} 
                  setFilters={setFilters} 
                  totalJobsCount={displayedJobs.length} 
                  onReset={handleResetFilters}
                />
              </div>
            )}
          </div>

          {/* Main 2-Column Row: Left Sidebar (Filter) & Right Main (Jobs) */}
          <div className="search-main-row">
            {/* Left Filter Sidebar */}
            <aside className="search-desktop-sidebar">
              <JobFilterSidebar 
                filters={filters} 
                setFilters={setFilters} 
                totalJobsCount={displayedJobs.length} 
                onReset={handleResetFilters}
              />
            </aside>

            {/* Right Jobs Area: Header + 2-Column Grid */}
            <div className="search-jobs-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{
                  fontSize: '22px',
                  fontWeight: '800',
                  color: '#111827',
                  margin: 0,
                  letterSpacing: '-0.01em'
                }}>
                  All Jobs <span style={{ color: '#0D473B', fontWeight: '700', fontSize: '18px' }}>({displayedJobs.length})</span>
                </h2>

                {/* Interactive Sort Dropdown Pill */}
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '7px 16px',
                      borderRadius: '9999px',
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#FFFFFF',
                      color: '#374151',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    <span>
                      {selectedSort === 'popular'
                        ? 'Popular'
                        : selectedSort === 'salary_high'
                        ? 'Salary: High to Low'
                        : selectedSort === 'salary_low'
                        ? 'Salary: Low to High'
                        : 'Newest'}
                    </span>
                    <ChevronDown size={14} color="#6B7280" />
                  </button>

                  {sortDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 6px)',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                      border: '1px solid #E5E7EB',
                      padding: '6px',
                      zIndex: 50,
                      minWidth: '180px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px'
                    }}>
                      {[
                        { id: 'popular', label: 'Popular' },
                        { id: 'newest', label: 'Newest' },
                        { id: 'salary_high', label: 'Salary: High to Low' },
                        { id: 'salary_low', label: 'Salary: Low to High' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSelectedSort(opt.id);
                            setSortDropdownOpen(false);
                          }}
                          style={{
                            textAlign: 'left',
                            padding: '8px 12px',
                            fontSize: '13px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: selectedSort === opt.id ? '#F2FFF2' : 'transparent',
                            color: selectedSort === opt.id ? '#0D473B' : '#374151',
                            fontWeight: selectedSort === opt.id ? '600' : '400',
                            cursor: 'pointer'
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {isLiveLoading && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px 0',
                  gap: '8px',
                  color: '#0D473B'
                }}>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  <span style={{ fontSize: '13.5px', fontWeight: '500' }}>Updating jobs...</span>
                </div>
              )}

              {displayedJobs.length === 0 && !isLiveLoading ? (
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
                    onClick={handleResetFilters}
                    style={{
                      padding: '10px 24px',
                      backgroundColor: '#0D473B',
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
                <>
                  <div className="search-jobs-grid">
                    {displayedJobs.map((job) => (
                      <FigmaJobCard
                        key={job.id}
                        job={job}
                        isBookmarked={savedJobIds?.includes(job.id)}
                        onToggleBookmark={(id) => toggleSaveJob(id)}
                        onApply={(j) => setApplyModalJob(j)}
                      />
                    ))}
                  </div>

                  {/* Centered View More Link matching Figma */}
                  <div style={{ textAlign: 'center', marginTop: '36px', marginBottom: '16px' }}>
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0D473B',
                        fontWeight: '700',
                        fontSize: '14.5px',
                        cursor: 'pointer',
                        padding: '8px 16px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      View more
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
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
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0D473B', marginBottom: '8px' }}>
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
                      backgroundColor: '#0D473B',
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

      {/* ponytail: Modal 2 (selectedJob) removed because job cards navigate directly to /job/:id */}
      {/* ponytail: layout styles moved to index.css to avoid runtime style tag re-injection on each render */}

      <Footer />
    </div>
  );
};

export default SearchPage;
