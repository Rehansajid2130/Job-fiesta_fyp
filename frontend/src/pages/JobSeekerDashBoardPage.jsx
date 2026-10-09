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
  Sparkles,
  Send,
  MapPin,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const JobSeekerDashBoardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    applications, 
    savedJobIds, 
    jobs, 
    startOrGetConversation, 
    showToast, 
    refreshUserData,
    interviews,
    cancelInterview,
    activeResume
  } = useJobs();
  const [activeTab, setActiveTab] = useState('applications'); // applications, interviews, saved, recommended

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
  const activeInterviews = (interviews || []).filter(i => i.status !== 'Cancelled');

  const getStageIndex = (status) => {
    switch (status) {
      case 'Applied': return 0;
      case 'Under Review':
      case 'Screening':
      case 'Shortlisted': return 1;
      case 'Interviewing':
      case 'Interview Scheduled': return 2;
      case 'Offered':
      case 'Hired':
      case 'Rejected': return 3;
      default: return 0;
    }
  };

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

        {/* Active AI Resume & Profile Showcase Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '24px 28px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: '#EBF8F4',
              color: '#0C463B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Sparkles size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  {activeResume?.title ? `${activeResume.fullName || user?.name} • ${activeResume.title}` : 'AI Resume & ATS Profile'}
                </h3>
                <span style={{
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  border: '1px solid #A7F3D0',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <CheckCircle2 size={12} /> {activeResume?.atsScore ? `${activeResume.atsScore}% ATS Ready` : 'ATS Optimized'}
                </span>
              </div>
              <p style={{ fontSize: '0.86rem', color: '#64748B', marginTop: '4px', marginBottom: 0 }}>
                {activeResume?.updatedAt 
                  ? `Last updated on ${new Date(activeResume.updatedAt).toLocaleDateString()} • Synced with 1-Click Quick Apply` 
                  : 'Your AI Resume connects directly to your job applications and recruiter searches.'}
              </p>
              {activeResume?.skills && activeResume.skills.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                  {activeResume.skills.slice(0, 6).map((sk, idx) => (
                    <span key={idx} style={{
                      fontSize: '0.75rem',
                      backgroundColor: '#F1F5F9',
                      color: '#334155',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: '600'
                    }}>
                      {sk}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Link
              to="/resume-builder"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                borderRadius: '8px',
                backgroundColor: '#EBF8F4',
                color: '#0C463B',
                fontWeight: '700',
                fontSize: '0.86rem',
                border: '1px solid #A7F3D0',
                textDecoration: 'none'
              }}
            >
              <FileText size={15} />
              <span>{activeResume ? 'Edit AI Resume' : 'Build AI Resume'}</span>
            </Link>
            <Link
              to={`/search${activeResume?.title ? `?keyword=${encodeURIComponent(activeResume.title)}` : ''}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 18px',
                borderRadius: '8px',
                backgroundColor: '#0C463B',
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: '0.86rem',
                textDecoration: 'none'
              }}
            >
              <Briefcase size={15} />
              <span>Find Matching Roles</span>
            </Link>
          </div>
        </div>

        {/* Upcoming Interview Spotlight Banner */}
        {activeInterviews.length > 0 && (
          <div style={{
            marginBottom: '32px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #BBF7D0',
            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.08)',
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: '#0C463B',
              color: '#FFFFFF',
              padding: '14px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={18} />
                <span style={{ fontWeight: '700', fontSize: '0.95rem', letterSpacing: '0.02em' }}>
                  Next Upcoming Interview Round
                </span>
                <span style={{
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  {activeInterviews.length} Scheduled
                </span>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#A7F3D0', fontWeight: '500' }}>
                Interview Confirmed • On Schedule
              </span>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', maxWidth: '620px' }}>
                <img
                  src={activeInterviews[0].candidateAvatar || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=faces'}
                  alt="Interviewer"
                  style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover', border: '2px solid #E2E8F0' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                      {activeInterviews[0].roundType || 'Technical Interview Round'}
                    </h3>
                    <span style={{
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      color: '#065F46',
                      backgroundColor: '#ECFDF5',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      {activeInterviews[0].duration || '45 mins'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#475569', marginTop: '4px', fontWeight: '500' }}>
                    <strong>{activeInterviews[0].company}</strong> • With {activeInterviews[0].interviewer || 'Hiring Lead'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', fontSize: '0.85rem', color: '#0C463B', fontWeight: '700', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={15} /> {activeInterviews[0].date}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={15} /> {activeInterviews[0].time}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#475569' }}>
                      <MapPin size={15} color="#0C463B" /> {activeInterviews[0].location || 'Office HQ (On-site)'}
                    </span>
                  </div>
                  {activeInterviews[0].notes && (
                    <p style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '8px', margin: '8px 0 0 0', lineHeight: '1.4' }}>
                      <em>"{activeInterviews[0].notes}"</em>
                    </p>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(activeInterviews[0].roundType || 'Interview Round')}&details=${encodeURIComponent(activeInterviews[0].notes || 'Interview with Hiring Team')}&location=${encodeURIComponent(activeInterviews[0].location || 'Company HQ')}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  <Calendar size={16} />
                  <span>Add to Calendar</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleMessageCompany({ company: activeInterviews[0].company, jobTitle: activeInterviews[0].jobTitle })}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '12px 18px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: '#334155',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  <MessageSquare size={16} />
                  <span>Message Recruiter</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '28px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'applications', label: `My Applications (${applications.length})` },
            { id: 'interviews', label: `Scheduled Interviews (${activeInterviews.length})` },
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
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Applications Table with Interactive Pipeline Stepper */}
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
                      <th style={{ padding: '16px 24px' }}>Job Position & Pipeline Stage</th>
                      <th style={{ padding: '16px 20px' }}>Company</th>
                      <th style={{ padding: '16px 20px' }}>Date Applied</th>
                      <th style={{ padding: '16px 20px' }}>Match Score</th>
                      <th style={{ padding: '16px 20px' }}>Status</th>
                      <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => {
                      const stageIdx = getStageIndex(app.status);
                      const isInterview = app.status === 'Interview Scheduled' || app.status === 'Interviewing';
                      const interviewData = app.interview || activeInterviews.find(i => i.company === app.company || i.jobTitle === app.jobTitle);

                      return (
                        <tr key={app.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '0.92rem' }}>
                          <td style={{ padding: '18px 24px' }}>
                            <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '0.98rem' }}>
                              <Link to={`/job/${app.jobId}`} style={{ color: '#0C463B' }}>
                                {app.jobTitle}
                              </Link>
                            </div>

                            {/* Application Pipeline Stepper */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                              {['Applied', 'Review', 'Interview', 'Decision'].map((stLabel, sIdx) => {
                                const isCompleted = stageIdx > sIdx;
                                const isCurrent = stageIdx === sIdx;
                                return (
                                  <React.Fragment key={stLabel}>
                                    <div style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      fontSize: '0.72rem',
                                      fontWeight: isCurrent ? '800' : '600',
                                      color: isCurrent ? '#0C463B' : (isCompleted ? '#059669' : '#94A3B8')
                                    }}>
                                      <span style={{
                                        width: '15px',
                                        height: '15px',
                                        borderRadius: '50%',
                                        backgroundColor: isCurrent ? '#0C463B' : (isCompleted ? '#10B981' : '#E2E8F0'),
                                        color: '#FFFFFF',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '9px',
                                        fontWeight: '800'
                                      }}>
                                        {isCompleted ? '✓' : (sIdx + 1)}
                                      </span>
                                      <span>{stLabel}</span>
                                    </div>
                                    {sIdx < 3 && (
                                      <div style={{
                                        width: '14px',
                                        height: '2px',
                                        backgroundColor: isCompleted ? '#10B981' : '#E2E8F0'
                                      }} />
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          </td>
                          <td style={{ padding: '18px 20px', color: '#475569' }}>{app.company}</td>
                          <td style={{ padding: '18px 20px', color: '#64748B' }}>{app.appliedDate}</td>
                          <td style={{ padding: '18px 20px' }}>
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
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                              {isInterview && interviewData && (
                                <span style={{
                                  fontSize: '0.78rem',
                                  fontWeight: '700',
                                  color: '#0C463B',
                                  backgroundColor: '#EBF8F4',
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px'
                                }}>
                                  <Calendar size={12} />
                                  <span>{interviewData.time || 'Round Set'}</span>
                                </span>
                              )}
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
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
                <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
                  Explore verified openings and apply in 1 click using your ATS-ready profile, or create an AI resume tailored to your target role.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  <Link
                    to="/search"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      backgroundColor: '#0C463B',
                      color: '#FFFFFF',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Explore Open Jobs</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/resume-builder"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      backgroundColor: '#EBF8F4',
                      color: '#0C463B',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      border: '1px solid #A7F3D0',
                      textDecoration: 'none'
                    }}
                  >
                    <Sparkles size={14} />
                    <span>Create AI Resume</span>
                  </Link>
                </div>

                {/* Popular career quick search chips */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: '600' }}>Popular:</span>
                  {[
                    { label: 'React / Frontend', query: 'Frontend' },
                    { label: 'Full Stack', query: 'Full Stack' },
                    { label: 'UI / UX Design', query: 'Design' },
                    { label: 'Remote Only', query: 'Remote' }
                  ].map((chip) => (
                    <Link
                      key={chip.label}
                      to={`/search?keyword=${encodeURIComponent(chip.query)}`}
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        color: '#475569',
                        backgroundColor: '#F1F5F9',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {chip.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Scheduled Interviews Tab */}
        {activeTab === 'interviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activeInterviews.length > 0 ? (
              activeInterviews.map((int) => (
                <div
                  key={int.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '24px',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', maxWidth: '650px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: '#EBF8F4',
                      color: '#0C463B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Calendar size={24} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                          {int.roundType}
                        </h3>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          color: '#065F46',
                          backgroundColor: '#ECFDF5',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}>
                          {int.duration}
                        </span>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          color: '#0C463B',
                          backgroundColor: '#EBF8F4',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}>
                          {int.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#475569', marginTop: '4px' }}>
                        <strong>{int.company}</strong> • With {int.interviewer || 'Hiring Manager'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', fontSize: '0.85rem', color: '#0C463B', fontWeight: '700' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                          <Calendar size={14} /> {int.date}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                          <Clock size={14} /> {int.time}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#64748B' }}>
                          <MapPin size={14} color="#0C463B" /> {int.location || 'Office HQ (On-site)'}
                        </span>
                      </div>
                      {int.notes && (
                        <p style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '8px', margin: '8px 0 0 0', lineHeight: '1.4' }}>
                          <em>"{int.notes}"</em>
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(int.roundType || 'Interview Round')}&details=${encodeURIComponent(int.notes || 'Interview with Hiring Team')}&location=${encodeURIComponent(int.location || 'Company HQ')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        backgroundColor: '#0C463B',
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        textDecoration: 'none',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <Calendar size={15} />
                      <span>Add to Calendar</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleMessageCompany({ company: int.company, jobTitle: int.jobTitle })}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#FFFFFF',
                        color: '#334155',
                        fontWeight: '600',
                        fontSize: '0.88rem',
                        cursor: 'pointer'
                      }}
                    >
                      Chat
                    </button>
                    <button
                      type="button"
                      onClick={() => cancelInterview && cancelInterview(int.id)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #FCA5A5',
                        backgroundColor: '#FEF2F2',
                        color: '#DC2626',
                        fontWeight: '600',
                        fontSize: '0.84rem',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '48px 24px',
                textAlign: 'center'
              }}>
                <Calendar size={48} color="#94A3B8" style={{ margin: '0 auto 12px auto' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
                  No upcoming interviews scheduled
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 20px auto' }}>
                  When recruiters review your job applications and schedule screening rounds, your meeting links will appear here.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('applications')}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  View My Applications
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Jobs */}
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
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
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
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Browse Open Jobs</span>
                    <ArrowRight size={14} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActiveTab('recommended')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      backgroundColor: '#EBF8F4',
                      color: '#0C463B',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      border: '1px solid #A7F3D0',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Recommended Roles</span>
                  </button>
                </div>
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
