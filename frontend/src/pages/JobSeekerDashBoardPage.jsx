import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Badge from '../components/common/Badge';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  Bookmark, 
  Send, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Briefcase, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const JobSeekerDashBoardPage = () => {
  const { user } = useAuth();
  const { applications, savedJobIds, jobs } = useJobs();
  const [activeTab, setActiveTab] = useState('applications'); // applications, saved, recommended

  const savedJobs = jobs.filter(j => savedJobIds.includes(j.id));
  const recommendedJobs = jobs.slice(0, 3);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Interview Scheduled':
        return <Badge variant="success">{status}</Badge>;
      case 'Shortlisted':
        return <Badge variant="primary">{status}</Badge>;
      case 'Under Review':
        return <Badge variant="warning">{status}</Badge>;
      case 'Rejected':
        return <Badge variant="danger">{status}</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Header Banner */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '32px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Candidate Dashboard
            </span>
            <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
              Welcome back, {user?.name || 'Alice'} 👋
            </h1>
            <p style={{ fontSize: '0.92rem', color: '#64748B' }}>
              Track your active applications, review interview invitations, and access your AI resume.
            </p>
          </div>

          <Link
            to="/resume-builder"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '10px',
              backgroundColor: '#0C463B',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '0.92rem',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <Sparkles size={16} />
            <span>Open Resume Builder</span>
          </Link>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="container" style={{ padding: '36px 20px', flex: 1 }}>
        {/* Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}>
          {[
            { label: 'Active Applications', value: applications.length, icon: Send, color: '#0C463B', bg: '#EBF8F4' },
            { label: 'Interviews Scheduled', value: applications.filter(a => a.status === 'Interview Scheduled').length, icon: Calendar, color: '#10B981', bg: '#ECFDF5' },
            { label: 'Bookmarked Opportunities', value: savedJobs.length, icon: Bookmark, color: '#3B82F6', bg: '#EFF6FF' },
            { label: 'Profile Match Score', value: '94%', icon: TrendingUp, color: '#F59E0B', bg: '#FFFBEB' }
          ].map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div key={i} style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: metric.bg,
                  color: metric.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0F172A', lineHeight: '1.1' }}>{metric.value}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '500' }}>{metric.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '28px'
        }}>
          {[
            { id: 'applications', label: `My Applications (${applications.length})` },
            { id: 'saved', label: `Saved Jobs (${savedJobs.length})` },
            { id: 'recommended', label: 'Recommended For You' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 18px',
                fontSize: '0.95rem',
                fontWeight: activeTab === tab.id ? '700' : '500',
                color: activeTab === tab.id ? '#0C463B' : '#64748B',
                borderBottom: activeTab === tab.id ? '3px solid #0C463B' : '3px solid transparent',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Applications Table */}
        {activeTab === 'applications' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {applications.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '0.82rem', color: '#64748B', textTransform: 'uppercase' }}>
                      <th style={{ padding: '16px 24px' }}>Job Position</th>
                      <th style={{ padding: '16px 20px' }}>Company</th>
                      <th style={{ padding: '16px 20px' }}>Date Applied</th>
                      <th style={{ padding: '16px 20px' }}>Match Score</th>
                      <th style={{ padding: '16px 20px' }}>Status</th>
                      <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '0.92rem' }}>
                        <td style={{ padding: '18px 24px', fontWeight: '700', color: '#0F172A' }}>
                          <Link to={`/job/${app.jobId}`} style={{ color: '#0C463B' }}>
                            {app.jobTitle}
                          </Link>
                        </td>
                        <td style={{ padding: '18px 20px', color: '#475569' }}>{app.company}</td>
                        <td style={{ padding: '18px 20px', color: '#64748B' }}>{app.appliedDate}</td>
                        <td style={{ padding: '18px 20px' }}>
                          <span style={{ fontWeight: '700', color: '#10B981' }}>{app.matchScore}%</span>
                        </td>
                        <td style={{ padding: '18px 20px' }}>
                          {getStatusBadge(app.status)}
                        </td>
                        <td style={{ padding: '18px 24px', textAlign: 'right' }}>
                          <Link
                            to="/chat"
                            style={{
                              fontSize: '0.85rem',
                              fontWeight: '600',
                              color: '#0C463B',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              backgroundColor: '#EBF8F4'
                            }}
                          >
                            Message
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '48px 20px', textAlign: 'center' }}>
                <Send size={40} color="#94A3B8" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
                  No applications yet
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '18px' }}>
                  Explore open jobs and apply with one click.
                </p>
                <Link
                  to="/search"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}
                >
                  Explore Jobs <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Jobs */}
        {activeTab === 'saved' && (
          <div>
            {savedJobs.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {savedJobs.map(job => (
                  <div key={job.id} style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748B' }}>{job.company}</span>
                      <Badge variant="primary">{job.type}</Badge>
                    </div>
                    <Link to={`/job/${job.id}`}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
                        {job.title}
                      </h3>
                    </Link>
                    <div style={{ fontSize: '0.88rem', color: '#0C463B', fontWeight: '600', marginBottom: '16px' }}>
                      {job.salary} • {job.location}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '14px' }}>
                      <Link to={`/job/${job.id}`} style={{ color: '#0C463B', fontWeight: '600', fontSize: '0.88rem' }}>
                        View Job Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ backgroundColor: '#FFFFFF', padding: '48px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <Bookmark size={40} color="#94A3B8" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
                  No saved jobs
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                  Click the bookmark icon on any job card to save it for later review.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Recommended Jobs */}
        {activeTab === 'recommended' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {recommendedJobs.map(job => (
              <div key={job.id} style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748B' }}>{job.company}</span>
                  <Badge variant="success">96% Match</Badge>
                </div>
                <Link to={`/job/${job.id}`}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
                    {job.title}
                  </h3>
                </Link>
                <div style={{ fontSize: '0.88rem', color: '#0C463B', fontWeight: '600', marginBottom: '16px' }}>
                  {job.salary} • {job.location}
                </div>
                <Link 
                  to={`/job/${job.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: '600'
                  }}
                >
                  Quick Apply <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default JobSeekerDashBoardPage;
