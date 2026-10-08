import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs, computeAtsMatch } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LandingHero from '../components/landing/LandingHero';
import FeaturedJobsSection from '../components/landing/FeaturedJobsSection';
import CategoriesSection from '../components/landing/CategoriesSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import ContactSection from '../components/landing/ContactSection';
import QuickApplyModal from '../components/landing/QuickApplyModal';
import MoreReviewsModal from '../components/landing/MoreReviewsModal';

const LandingPage = () => {
  const { jobs, applications, setSearchFilters } = useJobs();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Search state
  const [keyword, setKeyword] = useState('');

  // Modals state
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [moreReviewsOpen, setMoreReviewsOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const q = keyword.trim();
    setSearchFilters(prev => ({ ...prev, keyword: q }));
    navigate(q ? `/search?keyword=${encodeURIComponent(q)}` : '/search');
  };

  const handleQuickSearch = (term) => {
    setKeyword(term);
    setSearchFilters(prev => ({ ...prev, keyword: term }));
    navigate(`/search?keyword=${encodeURIComponent(term)}`);
  };

  const handleOpenApply = (job, e) => {
    if (e) e.stopPropagation();
    if (!user) {
      navigate('/login', { 
        state: { 
          from: `/job/${job.id}`,
          message: 'Please log in to your account to apply for this job.' 
        } 
      });
      return;
    }
    setSelectedJob(job);
    setApplyModalOpen(true);
  };

  // ponytail: ensure 6 featured positions always render smoothly even if backend database is initializing
  const defaultFeaturedJobs = [
    {
      id: 'figma-1',
      title: 'Software Engineer',
      company: 'Spotify',
      type: 'Full Time',
      location: 'Remote',
      category: 'Tech',
      filterCategory: 'tech',
      salary: '$120k - $150k',
      logo: '/assets/Landingpageimages/spotify_1_.svg',
      isPrimaryBtn: true
    },
    {
      id: 'figma-2',
      title: 'Web Developer',
      company: 'Slack',
      type: 'Full Time',
      location: 'San Francisco, CA',
      category: 'Tech',
      filterCategory: 'tech',
      salary: '$110k - $140k',
      logo: '/assets/Landingpageimages/spotify_1_.svg',
      isPrimaryBtn: false
    },
    {
      id: 'figma-3',
      title: 'UI/UX Designer',
      company: 'Figma',
      type: 'Full Time',
      location: 'New York, NY',
      category: 'Design',
      filterCategory: 'design',
      salary: '$115k - $145k',
      logo: '/assets/Landingpageimages/spotify_1_.svg',
      isPrimaryBtn: false
    },
    {
      id: 'figma-4',
      title: 'Product Manager',
      company: 'Linear',
      type: 'Full Time',
      location: 'Remote',
      category: 'Tech',
      filterCategory: 'tech',
      salary: '$130k - $160k',
      logo: '/assets/Landingpageimages/spotify_1_.svg',
      isPrimaryBtn: false
    },
    {
      id: 'figma-5',
      title: 'DevOps Architect',
      company: 'Vercel',
      type: 'Full Time',
      location: 'Seattle, WA',
      category: 'Tech',
      filterCategory: 'tech',
      salary: '$140k - $175k',
      logo: '/assets/Landingpageimages/spotify_1_.svg',
      isPrimaryBtn: false
    },
    {
      id: 'figma-6',
      title: 'Growth Specialist',
      company: 'Stripe',
      type: 'Full Time',
      location: 'San Francisco, CA',
      category: 'Marketing',
      filterCategory: 'marketing',
      salary: '$100k - $130k',
      logo: '/assets/Landingpageimages/spotify_1_.svg',
      isPrimaryBtn: false
    }
  ];

  // ponytail: extract candidate skills from AuthContext or saved AI resume
  const candidateSkills = React.useMemo(() => {
    let list = [];
    if (user && user.userType !== 'recruiter' && Array.isArray(user.skills) && user.skills.length > 0) {
      list = [...user.skills];
    }
    try {
      const savedResume = localStorage.getItem('jobfiesta_resume');
      if (savedResume) {
        const parsed = JSON.parse(savedResume);
        if (Array.isArray(parsed?.skills) && parsed.skills.length > 0) {
          list = [...new Set([...list, ...parsed.skills])];
        }
      }
    } catch (e) {}
    return list;
  }, [user]);

  // Candidate title/headline preference for role affinity
  const candidateHeadline = (user?.headline || user?.role || '').toLowerCase();

  // ponytail: algorithmic job recommendation & sorting based on candidate skills (KISS)
  const recommendedJobs = React.useMemo(() => {
    if (!jobs || jobs.length === 0) return defaultFeaturedJobs;

    const mapped = jobs.map((job) => {
      const jobReqs = [...new Set([...(job.skills || []), ...(job.tags || [])])];
      const ats = candidateSkills.length > 0 
        ? computeAtsMatch(candidateSkills, jobReqs)
        : null;

      // Small role affinity bonus if job title matches headline
      let finalScore = ats ? ats.matchScore : null;
      if (ats && candidateHeadline && job.title) {
        const titleLower = job.title.toLowerCase();
        if (candidateHeadline.split(' ').some(w => w.length > 3 && titleLower.includes(w))) {
          finalScore = Math.min(99, finalScore + 4);
        }
      }

      return {
        id: job.id || job._id,
        title: job.title,
        company: job.company,
        type: job.type || job.jobType || 'Full Time',
        location: job.location,
        category: job.category || 'Tech',
        filterCategory: (job.category || 'tech').toLowerCase(),
        salary: job.salary || `$${Math.round((job.salaryMin || 100000)/1000)}k - $${Math.round((job.salaryMax || 140000)/1000)}k`,
        logo: job.logo || '/assets/Landingpageimages/spotify_1_.svg',
        skills: job.skills || [],
        matchScore: finalScore,
        matchedSkills: ats ? ats.matchedSkills : [],
        missingSkills: ats ? ats.missingSkills : [],
        isPrimaryBtn: false
      };
    });

    if (candidateSkills.length > 0) {
      // Sort descending: highest algorithmic match score first
      mapped.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    }

    const top = mapped.slice(0, 6);
    if (top.length > 0) {
      top[0].isPrimaryBtn = true;
    }
    return top;
  }, [jobs, candidateSkills, candidateHeadline]);

  // 5 Exact Categories from Figma Screenshot
  const categories = [
    { name: 'Web Design', icon: '/assets/Landingpageimages/web_design.svg', filterCategory: 'design' },
    { name: 'Web Development', icon: '/assets/Landingpageimages/development.svg', filterCategory: 'tech' },
    { name: 'Marketing', icon: '/assets/Landingpageimages/g2869.svg', filterCategory: 'marketing' },
    { name: 'Code & Dev', icon: '/assets/Landingpageimages/3online_document.svg', filterCategory: 'tech' },
    { name: 'Software Engineer', icon: '/assets/Landingpageimages/path1744.svg', filterCategory: 'tech' }
  ];

  const handleCategoryClick = (cat) => {
    setSearchFilters(prev => ({
      ...prev,
      category: cat.filterCategory,
      keyword: ''
    }));
    navigate(`/search?category=${cat.filterCategory}`);
  };

  // Testimonials
  const testimonials = [
    {
      name: 'Floyd Miles',
      role: 'Head of People at Spotify',
      avatar: '/assets/Landingpageimages/cover.svg',
      text: 'JobFiesta completely transformed our hiring pipeline. Within 48 hours of posting, we engaged top-tier candidates who perfectly matched our tech stack and company culture.'
    },
    {
      name: 'Jane Cooper',
      role: 'Talent Lead at Figma',
      avatar: '/assets/Landingpageimages/cover_1.svg',
      text: 'The quality of candidates and streamlined application tracking is unmatched. We filled three critical design positions in two weeks with zero recruiter friction.'
    },
    {
      name: 'Robert Fox',
      role: 'VP Engineering at Stripe',
      avatar: '/assets/Landingpageimages/cover_2.svg',
      text: 'A refreshing, highly responsive job platform. The candidate cards and verified resumes give us crystal-clear clarity before setting up the first technical interview.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#FCFCFC', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      {/* 1. HEADER (Unified Global Navbar) */}
      <Navbar />

      {/* 2. HERO */}
      <LandingHero
        keyword={keyword}
        setKeyword={setKeyword}
        onSearchSubmit={handleSearchSubmit}
        onQuickSearch={handleQuickSearch}
      />

      {/* 3. FEATURED / RECOMMENDED JOBS */}
      <FeaturedJobsSection
        featuredJobs={recommendedJobs}
        totalJobsCount={jobs?.length || 6}
        applications={applications}
        onOpenApply={handleOpenApply}
        candidateSkills={candidateSkills}
        isPersonalized={candidateSkills.length > 0}
      />

      {/* 4. CATEGORIES */}
      <CategoriesSection
        categories={categories}
        onCategoryClick={handleCategoryClick}
      />

      {/* 5. TESTIMONIALS */}
      <TestimonialsSection
        testimonials={testimonials}
        onOpenMoreReviews={() => setMoreReviewsOpen(true)}
      />

      {/* 6. CONTACT US */}
      <ContactSection />

      {/* 7. FOOTER */}
      <Footer />

      {/* QUICK APPLY MODAL */}
      <QuickApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        selectedJob={selectedJob}
        user={user}
      />

      {/* MORE REVIEWS MODAL */}
      <MoreReviewsModal
        isOpen={moreReviewsOpen}
        onClose={() => setMoreReviewsOpen(false)}
        testimonials={testimonials}
      />
    </div>
  );
};

export default LandingPage;
