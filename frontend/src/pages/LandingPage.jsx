import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import HeroOfficeIllustration from '../components/landing/HeroOfficeIllustration';
import Modal from '../components/common/Modal';

const LandingPage = () => {
  const { jobs, applications, setSearchFilters, applyToJob } = useJobs();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Search state
  const [keyword, setKeyword] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Category selection (default active is Web Development index 1)
  const [activeCategory, setActiveCategory] = useState(1);

  // Quick Apply Modal State
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [coverNote, setCoverNote] = useState('');
  const [applicantName, setApplicantName] = useState(user?.name || '');
  const [applicantEmail, setApplicantEmail] = useState(user?.email || '');
  const [applySuccess, setApplySuccess] = useState('');

  // Contact form state
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Policy Modals State
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [moreReviewsOpen, setMoreReviewsOpen] = useState(false);

  // Check for saved resume from Resume Builder
  const savedResume = localStorage.getItem('jobfiesta_resume')
    ? JSON.parse(localStorage.getItem('jobfiesta_resume'))
    : null;

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const q = keyword.trim();
    setSearchFilters(prev => ({
      ...prev,
      keyword: q
    }));
    navigate(q ? `/search?keyword=${encodeURIComponent(q)}` : '/search');
  };

  const handleQuickSearch = (term) => {
    setKeyword(term);
    setSearchFilters(prev => ({
      ...prev,
      keyword: term
    }));
    navigate(`/search?keyword=${encodeURIComponent(term)}`);
  };

  const handleOpenApply = (job, e) => {
    if (e) e.stopPropagation();
    setSelectedJob(job);
    setApplicantName(user?.name || '');
    setApplicantEmail(user?.email || '');
    setCoverNote('');
    setApplySuccess('');
    setApplyModalOpen(true);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    const res = applyToJob(selectedJob.id, coverNote);
    if (res.success) {
      setApplySuccess(res.message);
      setTimeout(() => {
        setApplySuccess('');
        setApplyModalOpen(false);
      }, 1600);
    } else {
      alert(res.message);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('jobfiesta_inquiries') || '[]');
    const newInquiry = {
      id: `inq-${Date.now()}`,
      ...contactData,
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem('jobfiesta_inquiries', JSON.stringify([newInquiry, ...existing]));
    setContactSubmitted(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 6 Featured Jobs matching Figma Screenshot exactly
  const featuredJobs = [
    {
      id: 'job-1',
      title: 'Product Manager',
      company: 'Spotify',
      type: 'Full Time',
      location: 'Glendale, CA',
      category: 'Marketing',
      filterCategory: 'marketing',
      salary: '$2,000 - 5,000 / Monthly',
      logo: '/assets/Landingpageimages/spotify_1_.svg',
      isPrimaryBtn: true
    },
    {
      id: 'job-2',
      title: 'Product Designer',
      company: 'Dribbble',
      type: 'Part Time',
      location: 'Glen wood, CA',
      category: 'Designer',
      filterCategory: 'design',
      salary: '$2,000 - 5,000 / Monthly',
      logo: '/assets/Landingpageimages/vector_2.svg',
      logoBg: '#FCE7F3',
      isPrimaryBtn: false
    },
    {
      id: 'job-3',
      title: 'Recruiting Coordinator',
      company: 'Google',
      type: 'Part Time',
      location: 'Tropico, CA',
      category: 'Customers Service',
      filterCategory: 'sales',
      salary: '$2,000 - 5,000 / Monthly',
      logo: '/assets/Landingpageimages/vector_43.svg',
      isPrimaryBtn: false
    },
    {
      id: 'job-4',
      title: 'Software Engineer',
      company: 'Apple',
      type: 'Part Time',
      location: 'Greenbriar, CA',
      category: 'Developer',
      filterCategory: 'tech',
      salary: '$2,000 - 5,000 / Monthly',
      logo: '/assets/Landingpageimages/vector_3.svg',
      isPrimaryBtn: false
    },
    {
      id: 'job-5',
      title: 'Customer Support',
      company: 'TechCorp',
      type: 'Part Time',
      location: 'Rossmoyne, CA',
      category: 'Support',
      filterCategory: 'sales',
      salary: '$2,000 - 5,000 / Monthly',
      logo: '/assets/Landingpageimages/group_512926.svg',
      isPrimaryBtn: false
    },
    {
      id: 'job-6',
      title: 'UI / UX Designer',
      company: 'CreativeCo',
      type: 'Part Time',
      location: 'Grandview, CA',
      category: 'Designer',
      filterCategory: 'design',
      salary: '$2,000 - 5,000 / Monthly',
      logo: '/assets/Landingpageimages/vector_2.svg',
      logoBg: '#FCE7F3',
      isPrimaryBtn: false
    }
  ];

  // 5 Exact Categories from Figma Screenshot
  const categories = [
    { name: 'Web Design', icon: '/assets/Landingpageimages/web_design.svg', filterCategory: 'design' },
    { name: 'Web Development', icon: '/assets/Landingpageimages/development.svg', filterCategory: 'tech' },
    { name: 'Marketing', icon: '/assets/Landingpageimages/g2869.svg', filterCategory: 'marketing' },
    { name: 'Code & Dev', icon: '/assets/Landingpageimages/3online_document.svg', filterCategory: 'tech' },
    { name: 'Software Engineer', icon: '/assets/Landingpageimages/path1744.svg', filterCategory: 'tech' }
  ];

  // Navigate directly to Search page with selected category
  const handleCategoryClick = (cat) => {
    setSearchFilters(prev => ({
      ...prev,
      category: cat.filterCategory,
      keyword: ''
    }));
    navigate(`/search?category=${encodeURIComponent(cat.filterCategory)}`);
  };

  // Testimonials from Figma Screenshot
  const testimonials = [
    {
      name: 'Janis Reeves',
      role: 'Designer',
      avatar: '/assets/Landingpageimages/cover_1.svg',
      text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus..."
    },
    {
      name: 'Francis Guzman',
      role: 'Designer',
      avatar: '/assets/Landingpageimages/cover_4.svg',
      text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus..."
    },
    {
      name: 'Wilma Taylor',
      role: 'Designer',
      avatar: '/assets/Landingpageimages/cover_6.svg',
      text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus..."
    }
  ];

  return (
    <div 
      className="no-scrollbar" 
      style={{ 
        backgroundColor: '#F7F7F7', 
        minHeight: '100vh', 
        width: '100%', 
        overflowX: 'hidden', 
        color: '#111827', 
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none' 
      }}
    >
      
      {/* 1. FIGMA NAVBAR (Fully Functional & Responsive) */}
      <header style={{ width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '20px clamp(16px, 4vw, 32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => {
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '4px' }}
        >
          <span style={{ fontFamily: "'League Script', cursive", fontSize: 'clamp(34px, 5vw, 42px)', fontWeight: 'bold', color: '#000000', lineHeight: 1 }}>
            Job fiesta
          </span>
        </Link>

        {/* Desktop Navigation links & CTA */}
        <div className="landing-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1A1A1A', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/search')}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1A1A1A', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Jobs
            </button>
            <button 
              onClick={() => scrollToSection('categories')}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1A1A1A', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Categories
            </button>
            <button 
              onClick={() => navigate('/resume-builder')}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1A1A1A', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Resume Builder
            </button>
          </nav>

          {/* Right CTA - Logged in vs Guest */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button 
              onClick={() => navigate('/search')} 
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '600', color: '#0C463B', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Browse jobs
            </button>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Link 
                  to={user.userType === 'recruiter' ? '/recruiter-dashboard' : '/jobseeker-dashboard'} 
                  style={{ 
                    backgroundColor: '#0C463B', 
                    color: '#FFFFFF', 
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px', 
                    fontWeight: '600', 
                    padding: '9px 24px', 
                    borderRadius: '50px', 
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={logout}
                  title="Log out"
                  style={{ fontSize: '13px', color: '#64748B', fontFamily: 'Inter, sans-serif', cursor: 'pointer', background: 'none', border: 'none' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                style={{ 
                  backgroundColor: '#0C463B', 
                  color: '#FFFFFF', 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px', 
                  fontWeight: '600', 
                  padding: '10px 32px', 
                  borderRadius: '50px', 
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Log In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="landing-mobile-toggle"
          aria-label="Toggle Navigation Menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: '#0C463B',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {mobileMenuOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div 
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #ECECEC',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            position: 'relative',
            zIndex: 100
          }}
        >
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '600', color: '#1A1A1A', padding: '8px 0', borderBottom: '1px solid #F3F4F6', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Home
          </button>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/search');
            }}
            style={{ textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '600', color: '#1A1A1A', padding: '8px 0', borderBottom: '1px solid #F3F4F6', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Jobs
          </button>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToSection('categories');
            }}
            style={{ textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '600', color: '#1A1A1A', padding: '8px 0', borderBottom: '1px solid #F3F4F6', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Categories
          </button>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/resume-builder');
            }}
            style={{ textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '600', color: '#1A1A1A', padding: '8px 0', borderBottom: '1px solid #F3F4F6', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            AI Resume Builder
          </button>
          
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/search');
              }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '50px',
                border: '1.5px solid #0C463B',
                color: '#0C463B',
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                background: 'none'
              }}
            >
              Browse All Jobs
            </button>
            {user ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  to={user.userType === 'recruiter' ? '/recruiter-dashboard' : '/jobseeker-dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    padding: '12px',
                    borderRadius: '50px',
                    fontWeight: '600',
                    fontSize: '15px'
                  }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  style={{
                    padding: '12px 18px',
                    borderRadius: '50px',
                    backgroundColor: '#F3F4F6',
                    color: '#64748B',
                    fontWeight: '600',
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  padding: '12px',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '15px',
                  display: 'block'
                }}
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section style={{ position: 'relative', width: '100%', maxWidth: '1360px', margin: '0 auto', paddingTop: '16px', paddingBottom: '20px', textAlign: 'center' }}>
        
        {/* Top-Left Lightbulb Doodle */}
        <div className="hero-doodle" style={{ position: 'absolute', left: '4%', top: '10px', pointerEvents: 'none', zIndex: 1 }}>
          <img 
            src="/assets/Landingpageimages/group_3.svg" 
            alt="Lightbulb doodle" 
            style={{ width: '120px', height: 'auto', opacity: 0.95 }}
          />
        </div>

        {/* Top-Right Origami Paper Airplane Doodle */}
        <div className="hero-doodle" style={{ position: 'absolute', right: '5%', top: '20px', pointerEvents: 'none', zIndex: 1 }}>
          <img 
            src="/assets/Landingpageimages/group_24.svg" 
            alt="Airplane doodle" 
            style={{ width: '130px', height: 'auto', opacity: 0.9 }}
          />
        </div>

        {/* Main Headline: Find your Perfecto job */}
        <div style={{ marginBottom: '24px', position: 'relative', zIndex: 2, padding: '0 16px' }}>
          <div style={{ fontFamily: "'League Script', cursive", fontSize: 'clamp(36px, 5.5vw, 64px)', color: '#333333', lineHeight: '1.1' }}>
            Find your
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Martel', serif", fontSize: 'clamp(44px, 8vw, 84px)', fontWeight: '700', color: '#0C463B', lineHeight: '1' }}>
              Perfecto
            </span>
            <span style={{ fontFamily: "'League Script', cursive", fontSize: 'clamp(38px, 6.5vw, 72px)', color: '#0C463B', lineHeight: '1' }}>
              job
            </span>
          </div>
        </div>

        {/* Pill Search Bar - Positioned cleanly right above the illustration SVGs */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '-10px', position: 'relative', zIndex: 10, padding: '0 clamp(12px, 3vw, 20px)' }}>
          <form 
            onSubmit={handleSearchSubmit}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: '#F2FFF2', 
              borderRadius: '50px', 
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
              width: '100%',
              maxWidth: '660px',
              minHeight: '62px',
              height: 'auto',
              padding: '6px 8px 6px clamp(14px, 3vw, 26px)',
              border: '1px solid rgba(12, 70, 59, 0.12)'
            }}
          >
            {/* Magnifying Glass Icon */}
            <img 
              src="/assets/Landingpageimages/interface__search_magnifying_glass.svg" 
              alt="Search" 
              style={{ width: '22px', height: '22px', marginRight: '12px', opacity: 0.7, flexShrink: 0 }}
            />
            {/* Input */}
            <input 
              type="text" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job Title, keywords......"
              style={{ 
                flex: 1, 
                border: 'none', 
                background: 'transparent', 
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(15px, 2.4vw, 20px)', 
                color: '#515151',
                minWidth: '60px'
              }}
            />
            {/* Search Button */}
            <button 
              type="submit" 
              style={{ 
                backgroundColor: '#0C463B', 
                color: '#F2FFF2', 
                border: 'none', 
                borderRadius: '50px', 
                height: 'clamp(48px, 6vw, 60px)', 
                padding: '0 clamp(18px, 3vw, 36px)', 
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(16px, 2.5vw, 22px)', 
                fontWeight: '600', 
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                flexShrink: 0
              }}
            >
              Search
            </button>
          </form>

          {/* Quick Clickable Suggestions */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
            <span style={{ fontSize: '13px', color: '#64748B', fontFamily: 'Inter, sans-serif' }}>Popular:</span>
            {['Product Manager', 'Software Engineer', 'Product Designer', 'Customer Support'].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleQuickSearch(chip)}
                style={{
                  fontSize: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(12, 70, 59, 0.15)',
                  borderRadius: '20px',
                  padding: '3px 12px',
                  color: '#0C463B',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'background-color 0.15s ease'
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Office Freepik Illustration (Scaled dynamically & smoothly) */}
        <div style={{ width: '100%', padding: '0 clamp(10px, 3vw, 20px)', position: 'relative', zIndex: 1 }}>
          <HeroOfficeIllustration maxWidth="840px" />
        </div>
      </section>

        {/* 3. OUR FEATURES JOBS (Permanent Featured Jobs) */}
        <section id="jobs" style={{ width: '100%', maxWidth: '1360px', margin: '40px auto 80px', padding: '0 clamp(16px, 4vw, 32px)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
            <div>
              <h2 style={{ fontFamily: "'Martel', serif", fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: '700', color: '#0C463B', margin: 0, textAlign: 'left' }}>
                Our Features Jobs
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontSize: '15px', marginTop: '6px' }}>
                Explore handpicked premier opportunities featured on JobFiesta. Click any position to view details.
              </p>
            </div>
            <button
              onClick={() => navigate('/search')}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                fontWeight: '600',
                color: '#0C463B',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              View All {jobs.length} Jobs &rarr;
            </button>
          </div>

          {/* 6 Featured Cards Grid (Clickable & Responsive) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '26px' }}>
            {featuredJobs.map((job) => {
              const isApplied = applications?.some(a => a.jobId === job.id);
            return (
              <div 
                key={job.id} 
                onClick={() => navigate(`/job/${job.id}`)}
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  borderRadius: '16px', 
                  padding: 'clamp(22px, 3.5vw, 30px) clamp(18px, 3vw, 26px)', 
                  border: '1px solid #ECECEC',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Top Tags */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  <span style={{ border: '1px solid #D1D5DB', borderRadius: '50px', padding: '4px 14px', fontSize: '13px', color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>
                    {job.type}
                  </span>
                  <span style={{ border: '1px solid #D1D5DB', borderRadius: '50px', padding: '4px 14px', fontSize: '13px', color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>
                    {job.location}
                  </span>
                </div>

                {/* Title & Logo Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
                  <div 
                    style={{ 
                      width: '52px', 
                      height: '52px', 
                      borderRadius: '50%', 
                      backgroundColor: job.logoBg || 'transparent', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <img src={job.logo} alt={job.title} style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
                  </div>
                  <h3 style={{ fontFamily: "'Martel', serif", fontSize: '22px', fontWeight: '700', color: '#0C463B', margin: 0 }}>
                    {job.title}
                  </h3>
                </div>

                {/* Category & Salary */}
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#515151', marginBottom: '24px' }}>
                  <span style={{ fontWeight: '500' }}>{job.category}</span>
                  <span style={{ margin: '0 8px', color: '#CBD5E1' }}>|</span>
                  <span>{job.salary}</span>
                </div>

                {/* Apply Button / Applied Status */}
                {isApplied ? (
                  <button
                    disabled
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: '100%',
                      backgroundColor: '#ECFDF5',
                      color: '#065F46',
                      border: '1px solid #A7F3D0',
                      borderRadius: '50px',
                      padding: '12px 0',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'default'
                    }}
                  >
                    ✓ Applied
                  </button>
                ) : job.isPrimaryBtn ? (
                  <button
                    onClick={(e) => handleOpenApply(job, e)}
                    style={{
                      width: '100%',
                      backgroundColor: '#0C463B',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '50px',
                      padding: '12px 0',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'opacity 0.2s ease'
                    }}
                  >
                    Apply Now
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleOpenApply(job, e)}
                    style={{
                      width: '100%',
                      backgroundColor: '#FFFFFF',
                      color: '#0C463B',
                      border: '1.5px solid #0C463B',
                      borderRadius: '50px',
                      padding: '12px 0',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Apply Now
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. OUR CATEGORIES (Interactive Click-to-Filter) */}
      <section id="categories" style={{ width: '100%', maxWidth: '1360px', margin: '0 auto 100px', padding: '0 clamp(16px, 4vw, 32px)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
          <div>
            <h2 style={{ fontFamily: "'Martel', serif", fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: '700', color: '#0C463B', margin: 0, textAlign: 'left' }}>
              Our Categories
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontSize: '15px', marginTop: '6px' }}>
              Click any category to search open positions in that discipline.
            </p>
          </div>
          <button
            onClick={() => navigate('/search')}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              fontWeight: '600',
              color: '#0C463B',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Browse All Categories &rarr;
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: 'clamp(14px, 2vw, 22px)' }}>
          {categories.map((cat, idx) => {
            const isSelected = activeCategory === idx;
            return (
              <div
                key={cat.name}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  backgroundColor: isSelected ? '#0C463B' : '#F2FFF2',
                  color: isSelected ? '#FFFFFF' : '#0C463B',
                  borderRadius: '16px',
                  padding: 'clamp(24px, 4vw, 36px) 14px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? '0 10px 25px rgba(12, 70, 59, 0.2)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div 
                  style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.15)' : '#FFFFFF', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}
                >
                  <img 
                    src={cat.icon} 
                    alt={cat.name} 
                    style={{ 
                      width: '34px', 
                      height: '34px',
                      filter: isSelected ? 'brightness(0) invert(1)' : 'none'
                    }} 
                  />
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: '600' }}>
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. WHAT OUR CLIENT SAY */}
      <section style={{ width: '100%', maxWidth: '1360px', margin: '0 auto 80px', padding: '0 clamp(16px, 4vw, 32px)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Martel', serif", fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: '700', color: '#0C463B', marginBottom: '36px', textAlign: 'left' }}>
          What our Client say
        </h2>

        {/* 3 Client Cards (Responsive Grid) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px', textAlign: 'left', marginBottom: '36px' }}>
          {testimonials.map((client, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#F2FFF2',
                borderRadius: '16px',
                padding: 'clamp(24px, 4vw, 36px) clamp(20px, 3.5vw, 30px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {/* User Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <img 
                  src={client.avatar} 
                  alt={client.name} 
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontFamily: "'Martel', serif", fontSize: '20px', fontWeight: '700', color: '#0C463B', margin: 0 }}>
                    {client.name}
                  </h4>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#718096' }}>
                    {client.role}
                  </div>
                </div>
              </div>

              {/* 5 Solid Gold Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '18px', color: '#F59E0B', fontSize: '18px' }}>
                {'★★★★★'}
              </div>

              {/* Review Text */}
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#515151', lineHeight: '1.6', margin: 0 }}>
                {client.text}
              </p>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <button
          onClick={() => setMoreReviewsOpen(true)}
          style={{
            backgroundColor: '#0C463B',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 42px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.2s ease'
          }}
        >
          See More &rarr;
        </button>
      </section>

      {/* 6. CONTACT US (Interactive Form with Local Persistence) */}
      <section id="contact" style={{ width: '100%', maxWidth: '1360px', margin: '0 auto 100px', padding: '0 clamp(16px, 4vw, 32px)', position: 'relative' }}>
        
        {/* Floating Paper Airplane Top Right */}
        <div className="contact-doodle" style={{ position: 'absolute', right: '5%', top: '-20px', pointerEvents: 'none', zIndex: 1 }}>
          <img 
            src="/assets/Landingpageimages/group_24.svg" 
            alt="Airplane doodle" 
            style={{ width: '160px', height: 'auto', opacity: 0.4 }}
          />
        </div>

        {/* Floating Lightbulb Bottom Left */}
        <div className="contact-doodle" style={{ position: 'absolute', left: '3%', bottom: '20px', pointerEvents: 'none', zIndex: 1 }}>
          <img 
            src="/assets/Landingpageimages/group_23.svg" 
            alt="Lightbulb doodle" 
            style={{ width: '130px', height: 'auto', opacity: 0.5 }}
          />
        </div>

        <h2 style={{ fontFamily: "'Martel', serif", fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: '700', color: '#0C463B', textAlign: 'center', marginBottom: '36px' }}>
          Contact Us
        </h2>

        {/* White Form Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
            maxWidth: '920px',
            margin: '0 auto',
            padding: 'clamp(28px, 5vw, 50px) clamp(18px, 4vw, 44px)',
            position: 'relative',
            zIndex: 2
          }}
        >
          {contactSubmitted ? (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <div style={{ fontSize: '48px', color: '#0C463B', marginBottom: '16px' }}>✓</div>
              <h3 style={{ fontFamily: "'Martel', serif", fontSize: '26px', color: '#0C463B', marginBottom: '10px' }}>
                Thank You, {contactData.firstName || 'Friend'}!
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', maxWidth: '480px', margin: '0 auto 20px', fontSize: '15px' }}>
                Your message has been received! Our support team will review your inquiry and reply to {contactData.email || 'your email'} within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setContactSubmitted(false);
                  setContactData({ firstName: '', lastName: '', email: '', location: '', message: '' });
                }}
                style={{
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  padding: '10px 28px',
                  borderRadius: '50px',
                  border: 'none',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer'
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit}>
              {/* Responsive Form Inputs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 'clamp(14px, 2.5vw, 24px)', marginBottom: '24px' }}>
                
                {/* First Name */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    placeholder="First Name*"
                    value={contactData.firstName}
                    onChange={(e) => setContactData({ ...contactData, firstName: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px',
                      padding: '14px 38px 14px 16px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                      outline: 'none',
                      color: '#111827'
                    }}
                  />
                  <span style={{ position: 'absolute', right: '14px', top: '15px', color: '#10B981', fontSize: '16px' }}>✓</span>
                </div>

                {/* Last Name */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    placeholder="Last Name*"
                    value={contactData.lastName}
                    onChange={(e) => setContactData({ ...contactData, lastName: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px',
                      padding: '14px 38px 14px 16px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                      outline: 'none',
                      color: '#111827'
                    }}
                  />
                  <span style={{ position: 'absolute', right: '14px', top: '15px', color: '#10B981', fontSize: '16px' }}>✓</span>
                </div>

                {/* Email Address */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    required
                    placeholder="Email Address*"
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px',
                      padding: '14px 38px 14px 16px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                      outline: 'none',
                      color: '#111827'
                    }}
                  />
                  <span style={{ position: 'absolute', right: '14px', top: '15px', color: '#10B981', fontSize: '16px' }}>✓</span>
                </div>

                {/* Location */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    placeholder="Location*"
                    value={contactData.location}
                    onChange={(e) => setContactData({ ...contactData, location: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px',
                      padding: '14px 38px 14px 16px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                      outline: 'none',
                      color: '#111827'
                    }}
                  />
                  <span style={{ position: 'absolute', right: '14px', top: '15px', color: '#10B981', fontSize: '16px' }}>✓</span>
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '28px' }}>
                <textarea
                  id="contact-message-input"
                  rows="4"
                  required
                  placeholder="Message"
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px',
                    padding: '16px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    outline: 'none',
                    color: '#111827',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Submit Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '14px clamp(32px, 6vw, 52px)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '17px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(12, 70, 59, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Message Us
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 7. FIGMA FOOTER (All Links Fully Working & Responsive) */}
      <footer style={{ backgroundColor: '#111111', color: '#FFFFFF', paddingTop: '60px', paddingBottom: '30px' }}>
        <div style={{ width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          
          {/* Footer Navigation Columns & Origami Doodle */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '30px', alignItems: 'start', marginBottom: '40px' }}>
            
            {/* Company Column */}
            <div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', fontWeight: '600', marginBottom: '18px', color: '#FFFFFF' }}>
                Company
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>
                  <button 
                    onClick={() => navigate('/search')} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0 }}
                  >
                    Jobs
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('categories')} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0 }}
                  >
                    Categories
                  </button>
                </li>
              </ul>
            </div>

            {/* Help Column */}
            <div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', fontWeight: '600', marginBottom: '18px', color: '#FFFFFF' }}>
                Help
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>
                  <button 
                    onClick={() => {
                      scrollToSection('contact');
                      document.getElementById('contact-message-input')?.focus();
                    }} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0 }}
                  >
                    Customer Support
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0 }}
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setTermsModalOpen(true)} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0 }}
                  >
                    Terms &amp; Conditions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setPrivacyModalOpen(true)} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0 }}
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources 1 Column */}
            <div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', fontWeight: '600', marginBottom: '18px', color: '#FFFFFF' }}>
                Resources
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>
                  <button 
                    onClick={() => navigate('/resume-builder')} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0 }}
                  >
                    AI Resume Builder
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/search')} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0 }}
                  >
                    Browse Jobs
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources 2 Column */}
            <div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', fontWeight: '600', marginBottom: '18px', color: '#FFFFFF' }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>
                  <button 
                    onClick={() => navigate('/post-job')} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0 }}
                  >
                    Post a Job
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/login')} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0 }}
                  >
                    Employer Sign In
                  </button>
                </li>
              </ul>
            </div>

            {/* Right Airplane Origami Doodle */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '120px' }}>
              <img 
                src="/assets/Landingpageimages/group_24.svg" 
                alt="Origami plane" 
                style={{ width: '120px', height: 'auto', filter: 'brightness(0) invert(0.6)', opacity: 0.5 }}
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: '1px', backgroundColor: '#262626', marginBottom: '24px' }}></div>

          {/* Bottom Bar: Logo, Copyright, Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            {/* Logo */}
            <span style={{ fontFamily: "'League Script', cursive", fontSize: '32px', fontWeight: 'bold', color: '#FFFFFF' }}>
              Job fiesta
            </span>

            {/* Copyright */}
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9CA3AF' }}>
              &copy; Copyright 2024. All rights reserved by JobFiesta
            </div>

            {/* Social Icons (Open official channels in new tab) */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { name: 'X', url: 'https://twitter.com' },
                { name: 'F', url: 'https://facebook.com' },
                { name: 'L', url: 'https://linkedin.com' },
                { name: 'I', url: 'https://instagram.com' }
              ].map((s) => (
                <a 
                  key={s.name} 
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    backgroundColor: '#FFFFFF', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  <span style={{ color: '#000000', fontSize: '12px', fontWeight: 'bold' }}>
                    {s.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* QUICK APPLY MODAL (With Resume Link & State Sync) */}
      <Modal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title={selectedJob ? `Apply to ${selectedJob.title}` : 'Quick Apply'}
      >
        {selectedJob && (
          <div>
            {applySuccess ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#0C463B' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>✓</div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Application Submitted!</h3>
                <p style={{ color: '#6B7280', fontSize: '14px' }}>{applySuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '14px', backgroundColor: '#F2FFF2', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={selectedJob.logo} alt={selectedJob.company} style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                  <div>
                    <div style={{ fontWeight: '700', color: '#0C463B' }}>{selectedJob.title}</div>
                    <div style={{ fontSize: '13px', color: '#6B7280' }}>{selectedJob.company} &bull; {selectedJob.location}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #D1D5DB',
                        fontSize: '14px',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="e.g. alex@example.com"
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #D1D5DB',
                        fontSize: '14px',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    />
                  </div>
                </div>

                {/* Resume Status Notification */}
                <div style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B' }}>
                      {savedResume ? `Attached: ${savedResume.fullName || 'User'}'s AI Resume` : 'Default Profile Resume Attached'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      Employers will receive your verified profile credentials.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setApplyModalOpen(false);
                      navigate('/resume-builder');
                    }}
                    style={{ fontSize: '12px', color: '#0C463B', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Edit Resume
                  </button>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                    Cover Note / Brief Pitch
                  </label>
                  <textarea
                    rows="3"
                    required
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Briefly describe why you are the best fit for this role..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setApplyModalOpen(false)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '50px',
                      border: '1px solid #D1D5DB',
                      backgroundColor: '#FFFFFF',
                      color: '#4B5563',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 24px',
                      borderRadius: '50px',
                      border: 'none',
                      backgroundColor: '#0C463B',
                      color: '#FFFFFF',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Confirm &amp; Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </Modal>

      {/* MORE REVIEWS MODAL */}
      <Modal
        isOpen={moreReviewsOpen}
        onClose={() => setMoreReviewsOpen(false)}
        title="Client Reviews &amp; Testimonials"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '60vh', overflowY: 'auto', paddingRight: '6px' }}>
          {testimonials.concat([
            {
              name: 'David Chen',
              role: 'Engineering Lead at Velo',
              avatar: '/assets/Landingpageimages/cover_4.svg',
              text: 'JobFiesta helped our tech startup source four exceptional engineers in record time. The matching precision and clean profiles saved us weeks of screening.'
            },
            {
              name: 'Sarah Jenkins',
              role: 'Product Lead at Apex',
              avatar: '/assets/Landingpageimages/cover_1.svg',
              text: 'The best talent platform I have used. Clean interface, verified applicant credentials, and instant communication with qualified professionals.'
            }
          ]).map((t, i) => (
            <div key={i} style={{ padding: '16px', backgroundColor: '#F2FFF2', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <img src={t.avatar} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: '700', color: '#0C463B', fontSize: '15px' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>{t.role}</div>
                </div>
              </div>
              <div style={{ color: '#F59E0B', fontSize: '14px', marginBottom: '6px' }}>★★★★★</div>
              <p style={{ fontSize: '13px', color: '#374151', margin: 0, lineHeight: 1.5 }}>{t.text}</p>
            </div>
          ))}
        </div>
      </Modal>

      {/* TERMS & CONDITIONS MODAL */}
      <Modal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="JobFiesta Terms &amp; Conditions"
      >
        <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px' }}>
          <h4 style={{ color: '#0C463B', marginBottom: '6px' }}>1. Acceptance of Terms</h4>
          <p style={{ marginBottom: '14px' }}>
            By accessing or using JobFiesta, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using the platform.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '6px' }}>2. Job Seekers &amp; Recruiters</h4>
          <p style={{ marginBottom: '14px' }}>
            Job seekers may browse positions and submit applications free of charge. Recruiters agree to post genuine opportunities and uphold equal employment standards.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '6px' }}>3. Privacy &amp; Data Security</h4>
          <p>
            Your information is safeguarded following industry standard encryption and privacy guidelines. We do not sell your personal information to third parties.
          </p>
        </div>
      </Modal>

      {/* PRIVACY POLICY MODAL */}
      <Modal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        title="JobFiesta Privacy Policy"
      >
        <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px' }}>
          <h4 style={{ color: '#0C463B', marginBottom: '6px' }}>1. Information We Collect</h4>
          <p style={{ marginBottom: '14px' }}>
            We collect profile information, resumes, and communications necessary to facilitate employment applications and interview scheduling.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '6px' }}>2. How We Use Your Data</h4>
          <p style={{ marginBottom: '14px' }}>
            Your resume and contact information are shared only with employers when you explicitly apply for a job position.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '6px' }}>3. Your Rights</h4>
          <p>
            You have the right to edit, export, or delete your account and personal data at any time from your account settings.
          </p>
        </div>
      </Modal>

    </div>
  );
};

export default LandingPage;
