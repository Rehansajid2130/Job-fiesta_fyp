import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
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
    setSelectedJob(job);
    setApplyModalOpen(true);
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

      {/* 3. FEATURED JOBS */}
      <FeaturedJobsSection
        featuredJobs={featuredJobs}
        totalJobsCount={jobs?.length || 6}
        applications={applications}
        onOpenApply={handleOpenApply}
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
