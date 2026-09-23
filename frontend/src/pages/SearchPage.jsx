import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import JobCard from '../components/jobs/JobCard';
import JobFilter from '../components/jobs/JobFilter';
import { useJobs } from '../context/JobContext';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const SearchPage = () => {
  const { jobs, searchFilters, setSearchFilters } = useJobs();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('recent'); // recent, salary
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL search params with search filters
  useEffect(() => {
    const q = searchParams.get('keyword');
    const cat = searchParams.get('category');
    const loc = searchParams.get('location');
    if (q !== null || cat !== null || loc !== null) {
      setSearchFilters(prev => ({
        ...prev,
        keyword: q !== null ? q : prev.keyword,
        category: cat !== null ? cat : prev.category,
        location: loc !== null ? loc : prev.location
      }));
    }
  }, [searchParams]);

  const handleResetFilters = () => {
    setSearchFilters({
      keyword: '',
      location: '',
      category: 'all',
      type: 'all',
      experience: 'all',
      minSalary: 0
    });
  };

  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter(job => {
    // Keyword match
    if (searchFilters.keyword) {
      const q = searchFilters.keyword.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company.toLowerCase().includes(q);
      const matchTags = job.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchCompany && !matchTags) return false;
    }

    // Location match
    if (searchFilters.location) {
      const locQ = searchFilters.location.toLowerCase();
      if (!job.location.toLowerCase().includes(locQ)) return false;
    }

    // Category match
    if (searchFilters.category && searchFilters.category !== 'all') {
      if (job.category !== searchFilters.category) return false;
    }

    // Type match
    if (searchFilters.type && searchFilters.type !== 'all') {
      if (job.type !== searchFilters.type) return false;
    }

    // Min Salary match
    if (searchFilters.minSalary && searchFilters.minSalary > 0) {
      if (job.salaryMin && job.salaryMin < searchFilters.minSalary) return false;
    }

    return true;
  });

  // Sort filtered jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'salary') {
      return (b.salaryMax || 0) - (a.salaryMax || 0);
    }
    return 0; // Default order
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Header Banner */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '28px 0'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
            Find Your Next Job Opportunity
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#64748B' }}>
            Showing {sortedJobs.length} active positions matching your criteria.
          </p>
        </div>
      </div>

      {/* Search Grid Content */}
      <div className="container" style={{ padding: '36px 20px', flex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '32px',
          alignItems: 'start'
        }} className="search-layout">

          {/* Left Column: Filter Sidebar */}
          <div className="filter-sidebar">
            <JobFilter 
              filters={searchFilters} 
              setFilters={setSearchFilters} 
              onReset={handleResetFilters} 
            />
          </div>

          {/* Right Column: Search Results */}
          <div>
            {/* Top Toolbar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              marginBottom: '24px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '14px 20px',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ fontSize: '0.92rem', fontWeight: '600', color: '#334155' }}>
                <span style={{ color: '#0C463B', fontWeight: '700' }}>{sortedJobs.length}</span> positions available
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  style={{
                    display: 'none',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#EBF8F4',
                    color: '#0C463B',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                  className="mobile-filter-btn"
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>

                {/* Sort dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: '#64748B' }}>
                  <ArrowUpDown size={15} />
                  <span>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      fontSize: '0.85rem',
                      color: '#0F172A',
                      outline: 'none',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <option value="recent">Most Relevant</option>
                    <option value="salary">Highest Salary</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filter Drawer */}
            {mobileFilterOpen && (
              <div style={{ marginBottom: '24px' }}>
                <JobFilter 
                  filters={searchFilters} 
                  setFilters={setSearchFilters} 
                  onReset={handleResetFilters} 
                />
              </div>
            )}

            {/* Jobs List Grid */}
            {sortedJobs.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {sortedJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '48px 24px',
                textAlign: 'center'
              }}>
                <Search size={40} color="#94A3B8" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
                  No matching jobs found
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '20px' }}>
                  Try relaxing your keywords, removing location filters, or resetting filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .search-layout {
            grid-template-columns: 1fr !important;
          }
          .filter-sidebar {
            display: none !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchPage;
