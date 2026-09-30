import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { salaryBenchmarks } from '../data/mockData';
import { useJobs } from '../context/JobContext';
import { 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  Layers,
  BarChart3,
  Award
} from 'lucide-react';

const SalaryInsightsPage = () => {
  const { jobs } = useJobs();
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  const currentBenchmark = salaryBenchmarks[selectedRoleIndex];

  // Matching jobs from the portal
  const matchingJobs = jobs.filter(j => 
    j.category === currentBenchmark.category ||
    j.title.toLowerCase().includes(currentBenchmark.role.toLowerCase().split(' ')[1] || '')
  ).slice(0, 3);

  const formatSalary = (num) => `$${Math.round(num / 1000)}k`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Hero Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '52px 0 40px' }}>
        <div className="container">
          <div style={{ maxWidth: '780px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Market Benchmarks 2026
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', color: '#0F172A', marginTop: '6px', marginBottom: '12px' }}>
              Tech & Design Salary Insights
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.6 }}>
              Compare real market compensation across engineering, product design, and AI roles to negotiate with confidence.
            </p>
          </div>

          {/* Role Switcher Pills */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '28px', flexWrap: 'wrap' }}>
            {salaryBenchmarks.map((bench, idx) => (
              <button
                key={bench.id}
                type="button"
                onClick={() => setSelectedRoleIndex(idx)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: selectedRoleIndex === idx ? '700' : '600',
                  border: selectedRoleIndex === idx ? '1px solid #0C463B' : '1px solid #E2E8F0',
                  backgroundColor: selectedRoleIndex === idx ? '#0C463B' : '#FFFFFF',
                  color: selectedRoleIndex === idx ? '#FFFFFF' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: selectedRoleIndex === idx ? 'var(--shadow-sm)' : 'none'
                }}
              >
                {bench.role}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Benchmark Display */}
      <main style={{ padding: '44px 0 80px', flex: 1 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.1fr', gap: '32px' }}>
            {/* Left Column: Visual Percentile Bar, Description, Top Locations */}
            <div>
              {/* Highlight Card */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '32px',
                border: '1px solid #E2E8F0',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '28px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>
                      Median Base Salary
                    </span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0C463B', margin: '4px 0 0' }}>
                      ${currentBenchmark.median.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: '600', color: '#64748B' }}>/ year</span>
                    </h2>
                  </div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backgroundColor: '#ECFDF5',
                    color: '#059669',
                    fontWeight: '700',
                    fontSize: '0.85rem'
                  }}>
                    <TrendingUp size={16} />
                    <span>{currentBenchmark.growth}</span>
                  </div>
                </div>

                {/* Percentile Visual Range */}
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '600', color: '#64748B', marginBottom: '8px' }}>
                    <span>25th Percentile: <strong>{formatSalary(currentBenchmark.p25)}</strong></span>
                    <span style={{ color: '#0C463B' }}>Median: <strong>{formatSalary(currentBenchmark.median)}</strong></span>
                    <span>75th Percentile: <strong>{formatSalary(currentBenchmark.p75)}</strong></span>
                  </div>

                  {/* Gradient Track */}
                  <div style={{
                    height: '16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(90deg, #A7F3D0 0%, #10B981 50%, #0C463B 100%)',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: '50%',
                      top: '-4px',
                      transform: 'translateX(-50%)',
                      width: '8px',
                      height: '24px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '4px',
                      border: '2px solid #0C463B',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }} />
                  </div>
                </div>

                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  {currentBenchmark.description}
                </p>
              </div>

              {/* Geographic Breakdown */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '32px',
                border: '1px solid #E2E8F0',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
                  Top Paying Locations & Markets
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  {currentBenchmark.topLocations.map((loc, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <MapPin size={18} color="#0C463B" />
                      <span style={{ fontSize: '0.92rem', fontWeight: '600', color: '#0F172A' }}>
                        {loc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: High-Value Skills & Matching Open Jobs */}
            <div>
              {/* High-Value Skills */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '28px',
                border: '1px solid #E2E8F0',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Award size={20} color="#0C463B" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Highest Value Skills
                  </h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '16px' }}>
                  Adding these skills to your Job Fiesta profile significantly boosts recruiter outreach:
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {currentBenchmark.topSkills.map((skill, idx) => (
                    <span
                      key={skill}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#EBF8F4',
                        color: '#0C463B',
                        fontSize: '0.82rem',
                        fontWeight: '700'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Matching Open Jobs on Job Fiesta */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '28px',
                border: '1px solid #E2E8F0'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
                  Hiring for this Benchmark
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {matchingJobs.length === 0 ? (
                    <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>No direct openings at this moment.</p>
                  ) : (
                    matchingJobs.map(job => (
                      <Link
                        key={job.id}
                        to={`/job/${job.id}`}
                        style={{
                          padding: '14px',
                          borderRadius: '12px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          textDecoration: 'none',
                          display: 'block',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                          {job.title}
                        </h4>
                        <div style={{ fontSize: '0.78rem', color: '#64748B', margin: '4px 0 6px' }}>
                          {job.company} • {job.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0C463B' }}>
                            {job.salary}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#0C463B', fontWeight: '600' }}>
                            View Role →
                          </span>
                        </div>
                      </Link>
                    ))
                  )}
                </div>

                <Link
                  to="/search"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    marginTop: '16px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    color: '#0C463B',
                    textDecoration: 'none'
                  }}
                >
                  Browse All 400+ Tech Roles →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SalaryInsightsPage;
