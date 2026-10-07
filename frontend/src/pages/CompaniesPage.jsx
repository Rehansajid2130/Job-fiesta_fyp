import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Badge from '../components/common/Badge';
import { useJobs } from '../context/JobContext';
import { 
  Building2, 
  Search, 
  MapPin, 
  Users, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  Globe,
  SlidersHorizontal
} from 'lucide-react';

const CompaniesPage = () => {
  const { companies, jobs } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const industries = [
    { id: 'all', name: 'All Industries' },
    { id: 'Software & Technology', name: 'Software & Tech' },
    { id: 'UI / UX & Product Design', name: 'Design & Creative' },
    { id: 'AI & Data Science', name: 'AI & Machine Learning' },
    { id: 'Finance & Banking', name: 'Fintech & Banking' }
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Hero Banner */}
      <section style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '56px 0 44px'
      }}>
        <div className="container">
          <div style={{ maxWidth: '780px' }}>
            <span style={{ 
              fontSize: '0.85rem', 
              fontWeight: '700', 
              color: '#10B981', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em' 
            }}>
              Verified Employers & Studios
            </span>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 4vw, 2.75rem)', 
              fontWeight: '800', 
              color: '#0F172A', 
              marginTop: '6px', 
              marginBottom: '12px',
              lineHeight: 1.2
            }}>
              Discover Top Companies Hiring Now
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.6, marginBottom: '28px' }}>
              Explore company cultures, engineering stacks, employee benefits, and open roles at leading tech organizations.
            </p>

            {/* Search & Filter Bar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              backgroundColor: '#FFFFFF',
              padding: '8px',
              borderRadius: '14px',
              border: '1px solid #CBD5E1',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flex: '1 1 300px',
                padding: '0 12px'
              }}>
                <Search size={18} color="#94A3B8" />
                <input
                  type="text"
                  placeholder="Search by company name, location, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.95rem',
                    color: '#0F172A',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {industries.map(ind => {
                  const isSelected = selectedIndustry === ind.id;
                  return (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => setSelectedIndustry(ind.id)}
                      aria-pressed={isSelected}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '0.86rem',
                        fontWeight: isSelected ? '700' : '500',
                        border: '1px solid',
                        borderColor: isSelected ? '#0C463B' : '#E2E8F0',
                        backgroundColor: isSelected ? '#EBF8F4' : '#FFFFFF',
                        color: isSelected ? '#0C463B' : '#475569',
                        cursor: 'pointer',
                        boxShadow: isSelected 
                          ? '0 2px 8px rgba(12, 70, 59, 0.12)' 
                          : '0 1px 3px rgba(0, 0, 0, 0.03)',
                        transition: 'background-color 340ms cubic-bezier(0.4, 0, 0.2, 1), color 280ms cubic-bezier(0.4, 0, 0.2, 1), border-color 340ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = '#F8FAF9';
                          e.currentTarget.style.borderColor = '#CBD5E1';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.06)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                          e.currentTarget.style.borderColor = '#E2E8F0';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.03)';
                        }
                      }}
                    >
                      {ind.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section style={{ padding: '48px 0 80px', flex: 1 }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
              Showing {filteredCompanies.length} Companies
            </h2>
            <span style={{ fontSize: '0.88rem', color: '#64748B' }}>
              All companies verified by Job Fiesta
            </span>
          </div>

          {filteredCompanies.length === 0 ? (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '48px 24px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
              maxWidth: '680px',
              margin: '0 auto'
            }}>
              <img
                src="/assets/searchimages/no-company-jobs.svg"
                alt="No companies found"
                style={{
                  width: '100%',
                  maxWidth: '220px',
                  height: 'auto',
                  margin: '0 auto 16px auto',
                  display: 'block'
                }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0C463B', marginBottom: '8px' }}>
                No companies match your filters
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.92rem', maxWidth: '420px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
                We couldn't find any verified companies matching your query. Try resetting your search terms or picking another industry category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedIndustry('all');
                }}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '24px'
            }}>
              {filteredCompanies.map(company => {
              const companyJobs = jobs.filter(j => 
                j.company.toLowerCase().includes(company.name.toLowerCase())
              );
              const jobCount = companyJobs.length || company.openJobCount;

              return (
                <div
                  key={company.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  {/* Banner Image */}
                  <div style={{ position: 'relative', height: '110px', backgroundColor: '#0C463B' }}>
                    <img
                      src={company.banner}
                      alt={company.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(4px)',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      color: '#0F172A'
                    }}>
                      <Star size={13} fill="#F59E0B" color="#F59E0B" />
                      <span>{company.rating}</span>
                      <span style={{ color: '#94A3B8' }}>({company.reviewCount})</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '0 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Logo & Headline */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '14px', marginTop: '-30px', marginBottom: '14px' }}>
                      <img
                        src={company.logo}
                        alt={company.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '12px',
                          objectFit: 'cover',
                          border: '3px solid #FFFFFF',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          backgroundColor: '#FFFFFF'
                        }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                            {company.name}
                          </h3>
                          {company.verified && <CheckCircle2 size={16} color="#10B981" />}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                          {company.industry}
                        </span>
                      </div>
                    </div>

                    <p style={{
                      fontSize: '0.88rem',
                      color: '#475569',
                      lineHeight: 1.5,
                      marginBottom: '16px',
                      flex: 1
                    }}>
                      {company.tagline}
                    </p>

                    {/* Meta Info */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '12px',
                      padding: '12px 0',
                      borderTop: '1px solid #F1F5F9',
                      borderBottom: '1px solid #F1F5F9',
                      fontSize: '0.8rem',
                      color: '#64748B',
                      marginBottom: '16px'
                    }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} color="#94A3B8" /> {company.location}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={13} color="#94A3B8" /> {company.size}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Briefcase size={13} color="#94A3B8" /> {jobCount} Open {jobCount === 1 ? 'Job' : 'Jobs'}
                      </span>
                    </div>

                    {/* Tech Stack Chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                      {company.techStack.slice(0, 4).map(tech => (
                        <span
                          key={tech}
                          style={{
                            padding: '3px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#F1F5F9',
                            color: '#334155',
                            fontSize: '0.72rem',
                            fontWeight: '600'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {company.techStack.length > 4 && (
                        <span style={{ fontSize: '0.72rem', color: '#94A3B8', alignSelf: 'center' }}>
                          +{company.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Action Link */}
                    <Link
                      to={`/company/${company.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #0C463B',
                        backgroundColor: '#EBF8F4',
                        color: '#0C463B',
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        boxShadow: '0 1px 3px rgba(12, 70, 59, 0.08)',
                        transition: 'background-color 340ms cubic-bezier(0.4, 0, 0.2, 1), color 280ms cubic-bezier(0.4, 0, 0.2, 1), border-color 340ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#0C463B';
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 14px rgba(12, 70, 59, 0.22)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#EBF8F4';
                        e.currentTarget.style.color = '#0C463B';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(12, 70, 59, 0.08)';
                      }}
                    >
                      <span>Explore Company & {jobCount} Jobs</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CompaniesPage;
