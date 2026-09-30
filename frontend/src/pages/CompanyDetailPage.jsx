import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Badge from '../components/common/Badge';
import { useJobs } from '../context/JobContext';
import { 
  Building2, 
  MapPin, 
  Users, 
  Globe, 
  Star, 
  Calendar, 
  CheckCircle2, 
  Briefcase, 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink,
  DollarSign,
  Clock,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

const CompanyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companies, jobs } = useJobs();
  const [activeTab, setActiveTab] = useState('overview');

  const company = companies.find(c => c.id === id) || companies[0];

  const companyJobs = jobs.filter(j => 
    j.company.toLowerCase().includes(company.name.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Back button breadcrumb */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '12px 0' }}>
        <div className="container">
          <Link
            to="/companies"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.88rem',
              fontWeight: '600',
              color: '#475569',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={16} /> Back to Companies Directory
          </Link>
        </div>
      </div>

      {/* Company Header Hero */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        {/* Banner */}
        <div style={{ height: '240px', width: '100%', position: 'relative', backgroundColor: '#0C463B' }}>
          <img
            src={company.banner}
            alt={company.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Company Identity Strip */}
        <div className="container" style={{ paddingBottom: '24px' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '20px',
            marginTop: '-48px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
              <img
                src={company.logo}
                alt={company.name}
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                  backgroundColor: '#FFFFFF'
                }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    {company.name}
                  </h1>
                  {company.verified && <CheckCircle2 size={20} color="#10B981" />}
                </div>
                <p style={{ fontSize: '0.98rem', color: '#475569', margin: '4px 0 0', maxWidth: '600px' }}>
                  {company.tagline}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                <Globe size={16} color="#64748B" />
                <span>Visit Website</span>
                <ExternalLink size={14} color="#94A3B8" />
              </a>

              <a
                href="#open-jobs"
                onClick={() => setActiveTab('jobs')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Briefcase size={16} />
                <span>View {companyJobs.length} Open Positions</span>
              </a>
            </div>
          </div>

          {/* Key Facts Ribbon */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            padding: '16px 20px',
            borderRadius: '12px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            fontSize: '0.88rem',
            color: '#475569'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={16} color="#0C463B" />
              <strong>Industry:</strong> {company.industry}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} color="#0C463B" />
              <strong>HQ:</strong> {company.location}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Users size={16} color="#0C463B" />
              <strong>Team Size:</strong> {company.size}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} color="#0C463B" />
              <strong>Founded:</strong> {company.founded}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Star size={16} fill="#F59E0B" color="#F59E0B" />
              <strong>Rating:</strong> {company.rating} / 5.0 ({company.reviewCount} reviews)
            </span>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '24px',
            borderBottom: '1px solid #E2E8F0'
          }}>
            {[
              { id: 'overview', label: 'Company Overview' },
              { id: 'jobs', label: `Open Positions (${companyJobs.length})` },
              { id: 'benefits', label: 'Culture & Benefits' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 20px',
                  fontSize: '0.92rem',
                  fontWeight: activeTab === tab.id ? '700' : '600',
                  color: activeTab === tab.id ? '#0C463B' : '#64748B',
                  borderBottom: activeTab === tab.id ? '3px solid #0C463B' : '3px solid transparent',
                  background: 'none',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  cursor: 'pointer',
                  marginBottom: '-1px'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main style={{ padding: '36px 0 80px', flex: 1 }} className="container" id="open-jobs">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
            <div>
              {/* About */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '28px',
                border: '1px solid #E2E8F0',
                marginBottom: '24px'
              }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '14px' }}>
                  About {company.name}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>
                  {company.about}
                </p>
                
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', marginBottom: '12px' }}>
                  Core Culture & Values
                </h3>
                <ul style={{ paddingLeft: '20px', color: '#475569', fontSize: '0.92rem', lineHeight: 1.8 }}>
                  {company.culture.map((val, idx) => (
                    <li key={idx}>{val}</li>
                  ))}
                </ul>
              </div>

              {/* Open Roles Preview */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '28px',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
                    Featured Openings ({companyJobs.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('jobs')}
                    style={{ background: 'none', border: 'none', color: '#0C463B', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer' }}
                  >
                    View All →
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {companyJobs.map(job => (
                    <Link
                      key={job.id}
                      to={`/job/${job.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: '#F8FAFC',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                          {job.title}
                        </h4>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '6px', fontSize: '0.82rem', color: '#64748B' }}>
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                          <span>•</span>
                          <span style={{ fontWeight: '700', color: '#0C463B' }}>{job.salary}</span>
                        </div>
                      </div>
                      <ArrowRight size={18} color="#0C463B" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar info */}
            <div>
              {/* Tech Stack */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #E2E8F0',
                marginBottom: '24px'
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', marginBottom: '14px' }}>
                  Engineering Tech Stack
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {company.techStack.map(tech => (
                    <span
                      key={tech}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#F1F5F9',
                        color: '#0F172A',
                        fontSize: '0.82rem',
                        fontWeight: '600'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits Snippet */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #E2E8F0'
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', marginBottom: '14px' }}>
                  Top Benefits
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {company.benefits.slice(0, 3).map((ben, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: '#475569' }}>
                      <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OPEN JOBS TAB */}
        {activeTab === 'jobs' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0F172A' }}>
                All Available Roles at {company.name} ({companyJobs.length})
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
                Directly reviewed by {company.name}'s talent acquisition team on Job Fiesta.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {companyJobs.map(job => (
                <div
                  key={job.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ maxWidth: '650px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                        {job.title}
                      </h3>
                      {job.featured && (
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#FEF3C7',
                          color: '#92400E',
                          fontSize: '0.72rem',
                          fontWeight: '800'
                        }}>
                          FEATURED
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '12px', lineHeight: 1.5 }}>
                      {job.description.slice(0, 160)}...
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.82rem', color: '#64748B' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} color="#94A3B8" /> {job.location}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} color="#94A3B8" /> {job.type}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '700', color: '#0C463B' }}>
                        <DollarSign size={14} color="#0C463B" /> {job.salary}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/job/${job.id}`}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '10px',
                      backgroundColor: '#0C463B',
                      color: '#FFFFFF',
                      fontSize: '0.92rem',
                      fontWeight: '700',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>View Role & Apply</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BENEFITS TAB */}
        {activeTab === 'benefits' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '36px', border: '1px solid #E2E8F0' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
              Why Work at {company.name}
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '32px' }}>
              We invest in our people through competitive rewards, wellness perks, and global flexibility.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {company.benefits.map((benefit, index) => (
                <div
                  key={index}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: '#EBF8F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px'
                  }}>
                    <Sparkles size={20} color="#0C463B" />
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
                    {benefit}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                    Standard benefit provided to all full-time and eligible contracted employees across regions.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CompanyDetailPage;
