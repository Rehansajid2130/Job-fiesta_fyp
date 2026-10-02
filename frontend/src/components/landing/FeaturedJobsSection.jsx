import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedJobsSection = ({ featuredJobs, totalJobsCount, applications, onOpenApply }) => {
  const navigate = useNavigate();

  return (
    <section id="jobs" className="container" style={{ marginTop: '40px', marginBottom: '80px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
        <div>
          {/* ponytail: fix typo in section header */}
          <h2 style={{ fontFamily: "'Martel', serif", fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: '700', color: '#0C463B', margin: 0, textAlign: 'left' }}>
            Our Featured Jobs
          </h2>
          {/* ponytail: upgrade color from #6B7280 to #475569 for WCAG AA readability */}
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#475569', fontSize: '15px', marginTop: '6px' }}>
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
          View All {totalJobsCount} Jobs &rarr;
        </button>
      </div>

      {/* 6 Featured Cards Grid (Clickable & Responsive) - ponytail: auto-fill keeps cards at their natural width so single/few items never stretch across the full screen */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '26px' }}>
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
              {/* Top Tags - ponytail: #475569 ensures WCAG AA contrast on white */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <span style={{ border: '1px solid #D1D5DB', borderRadius: '50px', padding: '4px 14px', fontSize: '13px', color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                  {job.type}
                </span>
                <span style={{ border: '1px solid #D1D5DB', borderRadius: '50px', padding: '4px 14px', fontSize: '13px', color: '#475569', fontFamily: 'Inter, sans-serif' }}>
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
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#334155', marginBottom: '24px' }}>
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
                  onClick={(e) => onOpenApply(job, e)}
                  style={{
                    width: '100%',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    border: '1px solid #0C463B',
                    borderRadius: '50px',
                    padding: '12px 0',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(12, 70, 59, 0.18)',
                    transition: 'background-color 340ms cubic-bezier(0.4, 0, 0.2, 1), color 280ms cubic-bezier(0.4, 0, 0.2, 1), border-color 340ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#08342c';
                    e.currentTarget.style.borderColor = '#08342c';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(12, 70, 59, 0.28)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#0C463B';
                    e.currentTarget.style.borderColor = '#0C463B';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(12, 70, 59, 0.18)';
                  }}
                >
                  Apply Now
                </button>
              ) : (
                <button
                  onClick={(e) => onOpenApply(job, e)}
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
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
                    transition: 'background-color 340ms cubic-bezier(0.4, 0, 0.2, 1), color 280ms cubic-bezier(0.4, 0, 0.2, 1), border-color 340ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0C463B';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(12, 70, 59, 0.22)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#0C463B';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.03)';
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
  );
};

export default FeaturedJobsSection;
