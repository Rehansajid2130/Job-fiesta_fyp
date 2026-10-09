import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  Loader2, 
  Code, 
  Palette, 
  TrendingUp, 
  Cpu, 
  DollarSign, 
  Users, 
  Wrench 
} from 'lucide-react';

const SearchPage = () => {
  const { jobs: contextJobs, applyToJob, toggleSaveJob, savedJobIds, applications, isJobApplied, showToast, activeResume } = useJobs();
  const { user } = useAuth();
  const navigate = useNavigate();
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
  const sortDropdownRef = useRef(null);

  // Close sort dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target)) {
        setSortDropdownOpen(false);
      }
    };
    if (sortDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sortDropdownOpen]);
  const [liveJobs, setLiveJobs] = useState([]);
  const [isLiveLoading, setIsLiveLoading] = useState(false);
  const [usingLiveApi, setUsingLiveApi] = useState(false);

  // Modal state for applying
  const [applyModalJob, setApplyModalJob] = useState(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Synchronize URL parameters & ensure page starts at the top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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

  // ponytail: Category chips configured as short job cards for quick access
  const searchCategories = [
    { id: 'all', name: 'All Jobs', icon: Briefcase },
    { id: 'tech', name: 'Software & Tech', icon: Code },
    { id: 'design', name: 'UI / UX Design', icon: Palette },
    { id: 'marketing', name: 'Marketing', icon: TrendingUp },
    { id: 'ai', name: 'AI & Data Science', icon: Cpu },
    { id: 'finance', name: 'Finance & Banking', icon: DollarSign },
    { id: 'engineering', name: 'Engineering', icon: Wrench },
    { id: 'sales', name: 'Sales & Support', icon: Users }
  ];

  const handleCategorySelect = (catId) => {
    const nextCategory = (filters.category === catId && catId !== 'all') ? 'all' : catId;
    setFilters(prev => ({ ...prev, category: nextCategory }));
    const newParams = new URLSearchParams(searchParams);
    if (nextCategory && nextCategory !== 'all') {
      newParams.set('category', nextCategory);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
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

  // Dynamic jobs from context (used as fallback or when live API matches)
  const combinedJobs = (contextJobs || []).map(j => ({
    id: j.id || j._id,
    _id: j._id || j.id,
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
    applicantsCount: j.applicantsCount || 0,
    description: j.description || '',
    tags: j.tags || [],
    isBookmarked: savedJobIds?.includes(j.id) || false
  }));

  // Client-side filtering logic for fallback
  const filteredJobs = combinedJobs
    .filter(job => {
      if (keywordInput.trim()) {
        const q = keywordInput.toLowerCase().trim();
        const matchTitle = job.title?.toLowerCase().includes(q);
        const matchCompany = job.company?.toLowerCase().includes(q);
        const matchDesc = job.description?.toLowerCase().includes(q);
        const matchTags = Array.isArray(job.tags) && job.tags.some(t => t.toLowerCase().includes(q));
        const matchCategory = job.category?.toLowerCase().includes(q);
        if (!matchTitle && !matchCompany && !matchDesc && !matchTags && !matchCategory) return false;
      }

      if (locationInput.trim()) {
        const locQ = locationInput.toLowerCase().trim();
        if (!job.location?.toLowerCase().includes(locQ)) return false;
      }

      if (filters.category && filters.category !== 'all') {
        if (job.category?.toLowerCase() !== filters.category.toLowerCase()) return false;
      }

      if (filters.type && filters.type !== 'all') {
        const matchesType = job.type?.toLowerCase().includes(filters.type.toLowerCase());
        if (!matchesType) return false;
      }

      if (filters.workMode && filters.workMode !== 'all') {
        const matchesMode = job.workMode?.toLowerCase().includes(filters.workMode.toLowerCase());
        if (!matchesMode) return false;
      }

      if (filters.experience && filters.experience !== 'all') {
        const expQ = filters.experience.toLowerCase().replace(' level', '').replace('-', '');
        const jobExp = (job.experience || '').toLowerCase().replace(' level', '').replace('-', '');
        if (!jobExp.includes(expQ) && !expQ.includes(jobExp)) return false;
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

  const displayedJobs = (usingLiveApi && liveJobs.length > 0) ? liveJobs : filteredJobs;


  const handleOpenApply = (job) => {
    if (!user) {
      navigate('/login', { 
        state: { 
          from: `/job/${job.id}`,
          message: 'Please log in to your account to apply for this job.' 
        } 
      });
      return;
    }
    if (isJobApplied ? isJobApplied(job.id || job._id) : applications?.some(a => a.jobId === job.id || (job._id && a.jobId === job._id))) {
      return;
    }
    setApplyModalJob(job);
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setApplyModalJob(null);
      navigate('/login', { 
        state: { 
          from: applyModalJob ? `/job/${applyModalJob.id}` : '/search',
          message: 'Please log in to your account to apply for this job.' 
        } 
      });
      return;
    }
    if (applyModalJob) {
      const res = await applyToJob(applyModalJob.id, coverNote);
      if (res.success) {
        setApplySuccess(true);
        setTimeout(() => {
          setApplySuccess(false);
          setApplyModalJob(null);
          setCoverNote('');
        }, 1500);
      } else {
        if (res.requireLogin) {
          setApplyModalJob(null);
          navigate('/login', { 
            state: { 
              from: `/job/${applyModalJob.id}`,
              message: res.message 
            } 
          });
        } else if (res.alreadyApplied || res.message?.toLowerCase().includes('already applied')) {
          setApplyModalJob(null);
          showToast('You have already applied for this position.', 'info');
        } else {
          showToast(res.message || 'Could not submit application.', 'error');
        }
      }
    }
  };

  // Compute active filters for the pill bar
  const activeFilterList = [];
  if (keywordInput.trim()) {
    activeFilterList.push({
      id: 'keyword',
      label: `Keyword: "${keywordInput.trim()}"`,
      clear: () => {
        setKeywordInput('');
        const p = new URLSearchParams(searchParams);
        p.delete('keyword');
        setSearchParams(p);
      }
    });
  }
  if (locationInput.trim()) {
    activeFilterList.push({
      id: 'location',
      label: `Location: "${locationInput.trim()}"`,
      clear: () => {
        setLocationInput('');
        const p = new URLSearchParams(searchParams);
        p.delete('location');
        setSearchParams(p);
      }
    });
  }
  if (filters.category && filters.category !== 'all') {
    const catObj = searchCategories.find(c => c.id === filters.category);
    activeFilterList.push({
      id: 'category',
      label: `Category: ${catObj ? catObj.name : filters.category}`,
      clear: () => handleCategorySelect('all')
    });
  }
  if (filters.type && filters.type !== 'all') {
    activeFilterList.push({
      id: 'type',
      label: `Type: ${filters.type}`,
      clear: () => setFilters(prev => ({ ...prev, type: 'all' }))
    });
  }
  if (filters.workMode && filters.workMode !== 'all') {
    activeFilterList.push({
      id: 'workMode',
      label: `Mode: ${filters.workMode}`,
      clear: () => setFilters(prev => ({ ...prev, workMode: 'all' }))
    });
  }
  if (filters.experience && filters.experience !== 'all') {
    activeFilterList.push({
      id: 'experience',
      label: `Exp: ${filters.experience}`,
      clear: () => setFilters(prev => ({ ...prev, experience: 'all' }))
    });
  }
  if (filters.minSalary || filters.maxSalary) {
    const salLabel = filters.minSalary && filters.maxSalary
      ? `$${filters.minSalary}k - $${filters.maxSalary}k`
      : filters.minSalary
      ? `$${filters.minSalary}k+`
      : `Up to $${filters.maxSalary}k`;
    activeFilterList.push({
      id: 'salary',
      label: `Salary: ${salLabel}`,
      clear: () => setFilters(prev => ({ ...prev, minSalary: '', maxSalary: '' }))
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F7F7F7' }}>
      <Navbar />

      {/* Top Banner / Hero Matching Figma */}
      <section style={{
        backgroundColor: '#F7F7F7',
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
              backgroundColor: '#FFFFFF',
              borderRadius: '9999px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              padding: '6px 8px 6px 24px',
              display: 'flex',
              alignItems: 'center',
              maxWidth: '780px',
              margin: '0 auto',
              border: '1px solid #ECECEC',
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
                border: '1px solid #0D473B',
                borderRadius: '9999px',
                padding: '11px 28px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Search
            </button>
          </form>

          {/* Quick Category Search - Short Job Card Style with Smooth Viscous Color Transition */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '20px',
              maxWidth: '960px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
            role="toolbar"
            aria-label="Filter jobs by category"
          >
            {searchCategories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = (filters.category === cat.id) || (cat.id === 'all' && (!filters.category || filters.category === 'all'));
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  aria-pressed={isSelected}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: isSelected ? '#EBF8F4' : '#FFFFFF',
                    color: isSelected ? '#0C463B' : '#475569',
                    border: '1px solid',
                    borderColor: isSelected ? '#0C463B' : '#E2E8F0',
                    borderRadius: '8px',
                    boxShadow: isSelected 
                      ? '0 2px 8px rgba(12, 70, 59, 0.12)' 
                      : '0 1px 3px rgba(0, 0, 0, 0.03)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: isSelected ? '700' : '500',
                    fontFamily: 'Inter, sans-serif',
                    flexShrink: 0,
                    userSelect: 'none'
                  }}
                >
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: isSelected ? 'rgba(12, 70, 59, 0.12)' : '#F1F5F9',
                    color: isSelected ? '#0C463B' : '#64748B',
                    transition: 'background-color 320ms cubic-bezier(0.4, 0, 0.2, 1), color 320ms cubic-bezier(0.4, 0, 0.2, 1)',
                    flexShrink: 0
                  }}>
                    <IconComp size={14} />
                  </span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

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
                backgroundColor: '#FFFFFF',
                border: '1px solid #ECECEC',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                color: '#0D473B',
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '16px',
                cursor: 'pointer'
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
                <div ref={sortDropdownRef} style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    aria-expanded={sortDropdownOpen}
                    aria-haspopup="true"
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
                      cursor: 'pointer',
                      transition: 'all var(--dropdown-open-dur) var(--dropdown-ease)'
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
                    <ChevronDown 
                      size={14} 
                      color="#6B7280" 
                      style={{
                        transition: 'transform var(--dropdown-open-dur) var(--dropdown-ease)',
                        transform: sortDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}
                    />
                  </button>

                  <div 
                    className={`t-dropdown ${sortDropdownOpen ? 'is-open' : ''}`}
                    data-origin="top-right"
                    style={{
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
                    }}
                  >
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
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease, color 0.15s ease'
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Filter Pills Bar */}
              {activeFilterList.length > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '14px',
                  marginBottom: '16px',
                  padding: '10px 14px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB'
                }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Active Filters:
                  </span>
                  {activeFilterList.map(item => (
                    <span
                      key={item.id}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#EBF8F4',
                        color: '#0C463B',
                        border: '1px solid #A7F3D0',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      <span>{item.label}</span>
                      <button
                        type="button"
                        onClick={item.clear}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#0C463B',
                          cursor: 'pointer',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        aria-label={`Remove filter ${item.label}`}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#DC2626',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      padding: '2px 6px',
                      marginLeft: 'auto'
                    }}
                  >
                    Clear All
                  </button>
                </div>
              )}

              {isLiveLoading ? (
                <div className="search-jobs-grid" style={{ marginBottom: '24px' }}>
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="t-skel-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <div className="t-skel-shimmer-bar" style={{ width: '58%', height: '20px' }} />
                        <div className="t-skel-shimmer-bar" style={{ width: '22px', height: '22px', borderRadius: '4px' }} />
                      </div>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <div className="t-skel-shimmer-bar" style={{ width: '65px', height: '20px', borderRadius: '4px' }} />
                        <div className="t-skel-shimmer-bar" style={{ width: '120px', height: '20px', borderRadius: '4px' }} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div className="t-skel-shimmer-bar" style={{ width: '42px', height: '42px', borderRadius: '50%' }} />
                        <div style={{ flex: 1 }}>
                          <div className="t-skel-shimmer-bar" style={{ width: '100px', height: '14px', marginBottom: '6px' }} />
                          <div className="t-skel-shimmer-bar" style={{ width: '70px', height: '12px' }} />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: 'auto' }}>
                        <div className="t-skel-shimmer-bar" style={{ height: '36px', borderRadius: '8px' }} />
                        <div className="t-skel-shimmer-bar" style={{ height: '36px', borderRadius: '8px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : displayedJobs.length === 0 ? (
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '40px 24px',
                  textAlign: 'center',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 16px rgba(12, 70, 59, 0.04)'
                }}>
                  <img
                    src="/assets/searchimages/empty-search.svg"
                    alt="No matching jobs found"
                    style={{
                      width: '100%',
                      maxWidth: '260px',
                      height: 'auto',
                      margin: '0 auto 20px auto',
                      display: 'block'
                    }}
                  />
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0C463B', marginBottom: '8px' }}>
                    No matching jobs found
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '420px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
                    We couldn't find any positions matching your active filters. Try searching with different keywords or clearing some filters.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    style={{
                      padding: '10px 24px',
                      backgroundColor: '#0C463B',
                      color: '#FFFFFF',
                      border: '1px solid #0C463B',
                      borderRadius: '8px',
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
                        isApplied={isJobApplied ? isJobApplied(job.id || job._id) : applications?.some(a => String(a.jobId) === String(job.id || job._id))}
                        isBookmarked={savedJobIds?.includes(job.id)}
                        onToggleBookmark={(id) => toggleSaveJob(id)}
                        onApply={(j) => handleOpenApply(j)}
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
              <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                <img
                  src="/assets/searchimages/application-success.svg"
                  alt="Application Submitted Successfully"
                  style={{
                    width: '100%',
                    maxWidth: '220px',
                    height: 'auto',
                    margin: '0 auto 16px auto',
                    display: 'block'
                  }}
                />
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0C463B', marginBottom: '8px' }}>
                  Application Submitted!
                </h3>
                <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '380px', margin: '0 auto', lineHeight: '1.5' }}>
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

                {/* Active AI Resume Box */}
                <div style={{
                  backgroundColor: '#EBF8F4',
                  borderRadius: '8px',
                  border: '1px solid #A7F3D0',
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: '#0C463B',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  <div>
                    <span>Resume: <strong>{activeResume?.title ? `${activeResume.fullName || user?.name} • ${activeResume.title}.pdf` : (user?.name ? `${user.name.replace(/\s+/g, '_')}_CV.pdf` : 'Candidate_CV.pdf')}</strong></span>
                    {activeResume?.atsScore && (
                      <div style={{ fontSize: '11px', color: '#059669', marginTop: '2px', fontWeight: '600' }}>
                        ATS Score: {activeResume.atsScore}% • Verified Profile
                      </div>
                    )}
                  </div>
                  <span style={{
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}>
                    ATS Ready
                  </span>
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
                      borderRadius: '8px',
                      border: '1px solid #0C463B',
                      backgroundColor: '#EBF8F4',
                      color: '#0C463B',
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
                      borderRadius: '8px',
                      border: '1px solid #0C463B',
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

      {/* ponytail: Modal 2 (selectedJob) removed because job cards navigate directly to /job/:id */}
      {/* ponytail: layout styles moved to index.css to avoid runtime style tag re-injection on each render */}

      <Footer />
    </div>
  );
};

export default SearchPage;
