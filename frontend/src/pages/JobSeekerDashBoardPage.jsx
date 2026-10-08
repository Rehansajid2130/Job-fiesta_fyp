import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Badge from '../components/common/Badge';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  Bookmark, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Briefcase, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const JobSeekerDashBoardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { applications, savedJobIds, jobs, startOrGetConversation, showToast, refreshUserData } = useJobs();
  const [activeTab, setActiveTab] = useState('applications'); // applications, saved, recommended

  React.useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    if (user.userType === 'recruiter') {
      if (showToast) showToast('Redirecting to your Recruiter Dashboard', 'info');
      navigate('/recruiter-dashboard', { replace: true });
      return;
    }
    if (refreshUserData) refreshUserData();
  }, [user, navigate]);

  const savedJobs = jobs.filter(j => savedJobIds.includes(j.id));
  const recommendedJobs = jobs.slice(0, 3);

  const handleMessageCompany = (app) => {
    let recruiterName = 'Suzana Colin';
    let recruiterRole = 'Executive Talent Partner';
    let recruiterAvatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces';
    let convId = 'conv-suzana';

    if (app.company?.toLowerCase().includes('cognitive')) {
      recruiterName = 'Hassan';
      recruiterRole = 'Tech Lead @ Cognitive Dynamics';
      recruiterAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces';
      convId = 'conv-hassan';
    } else if (!app.company?.toLowerCase().includes('nexus')) {
      const recruiterData = {
        name: `${app.company} Hiring Team`,
        role: `Talent Partner @ ${app.company}`,
        company: app.company,
        initialMessage: `Hi there! I am following up on my application for the ${app.jobTitle} position.`
      };
      if (startOrGetConversation) {
        convId = startOrGetConversation(recruiterData);
      }
    }

    navigate(`/chat?convId=${convId}`);
    if (showToast) {
      showToast(`Opening chat with ${recruiterName}`, 'info');
    }
  };

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
                          {/* ponytail: dynamic match score badge with tier coloring */}
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: '700',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.82rem',
                            backgroundColor: (app.matchScore || 85) >= 80 ? '#ECFDF5' : ((app.matchScore || 85) >= 65 ? '#EFF6FF' : '#FFFBEB'),
                            color: (app.matchScore || 85) >= 80 ? '#065F46' : ((app.matchScore || 85) >= 65 ? '#1E40AF' : '#92400E')
                          }}>
                            {app.matchScore || 85}% Match
                          </span>
                        </td>
                        <td style={{ padding: '18px 20px' }}>
                          {getStatusBadge(app.status)}
                        </td>
                        <td style={{ padding: '18px 24px', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => handleMessageCompany(app)}
                            style={{
                              fontSize: '0.85rem',
                              fontWeight: '600',
                              color: '#0C463B',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              backgroundColor: '#EBF8F4',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#0C463B';
                              e.currentTarget.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#EBF8F4';
                              e.currentTarget.style.color = '#0C463B';
                            }}
                          >
                            Message
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '40px 24px',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                textAlign: 'center'
              }}>
                <img
                  src="/assets/searchimages/no-applications.svg"
                  alt="No applications yet"
                  style={{
                    width: '100%',
                    maxWidth: '220px',
                    height: 'auto',
                    margin: '0 auto 16px auto',
                    display: 'block'
                  }}
                />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0C463B', marginBottom: '8px' }}>
                  No applications yet
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto 18px auto', lineHeight: '1.5' }}>
                  Explore open jobs and apply with one click to kickstart your career journey.
                </p>
                <Link
                  to="/search"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 18px',
                    borderRadius: '8px',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    textDecoration: 'none'
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
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '40px 24px',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                textAlign: 'center'
              }}>
                <img
                  src="/assets/searchimages/no-saved-jobs.svg"
                  alt="No saved jobs"
                  style={{
                    width: '100%',
                    maxWidth: '220px',
                    height: 'auto',
                    margin: '0 auto 16px auto',
                    display: 'block'
                  }}
                />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0C463B', marginBottom: '8px' }}>
                  No saved jobs yet
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto 18px auto', lineHeight: '1.5' }}>
                  Click the bookmark icon on any job card to save it here for quick access later.
                </p>
                <Link
                  to="/search"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 18px',
                    borderRadius: '8px',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    fontWeight: '600',
                    fontSize: '0.88rem',
                    textDecoration: 'none'
                  }}
                >
                  Browse Open Jobs <ArrowRight size={15} />
                </Link>
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
