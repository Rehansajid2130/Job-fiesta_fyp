import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Badge from '../components/common/Badge';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase, 
  Users, 
  PlusCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Star,
  MessageSquare,
  ArrowRight,
  Filter
} from 'lucide-react';

const RecruiterDashBoardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobs, applications, updateApplicationStatus, candidates, updateCandidateStage, startOrGetConversation, showToast, refreshUserData, fetchLiveJobs } = useJobs();
  const [filterStatus, setFilterStatus] = useState('all');

  React.useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    if (user.userType === 'jobseeker') {
      if (showToast) showToast('Redirecting to your Candidate Dashboard', 'info');
      navigate('/jobseeker-dashboard', { replace: true });
      return;
    }
    if (fetchLiveJobs) fetchLiveJobs();
    if (refreshUserData) refreshUserData();
  }, [user, navigate]);

  const recruiterJobs = jobs.filter(j => 
    j.company?.toLowerCase().includes('nexus') || 
    (user?.company && j.company?.toLowerCase().includes(user.company.toLowerCase())) ||
    j.postedBy === user?.id
  );
  const displayJobs = recruiterJobs.length > 0 ? recruiterJobs : jobs;

  const displayCandidates = candidates.length > 0
    ? candidates
    : applications.map(app => ({
        id: app.id,
        applicationId: app.id,
        name: app.candidateName || 'Applicant',
        email: app.email || '',
        avatar: app.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
        role: app.jobTitle || 'Applicant',
        matchScore: app.matchScore || 85,
        stage: app.status || 'applied'
      }));

  const filteredApplications = filterStatus === 'all' 
    ? displayCandidates 
    : displayCandidates.filter(a => (a.stage || a.status || '').toLowerCase() === filterStatus.toLowerCase());

  const handleStatusChange = (appId, newStatus) => {
    if (updateCandidateStage) {
      updateCandidateStage(appId, newStatus);
    } else {
      updateApplicationStatus(appId, newStatus);
    }
  };

  const handleMessageApplicant = (applicant, candInfo) => {
    const candidateData = {
      id: candInfo?.id || applicant.candidateId || `app-${applicant.id}`,
      name: candInfo?.name || applicant.candidateName || applicant.applicantName || 'Candidate Applicant',
      role: candInfo?.role || applicant.jobTitle || 'Applicant',
      avatar: candInfo?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
      company: applicant.company || 'Nexus Innovations'
    };

    if (startOrGetConversation) {
      const convId = startOrGetConversation(candidateData);
      navigate(`/chat?convId=${convId}`, { state: { candidate: candidateData } });
    } else {
      navigate('/chat', { state: { candidate: candidateData } });
    }

    if (showToast) {
      showToast(`Opening conversation with ${candidateData.name}`, 'info');
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
              Employer Portal
            </span>
            <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
              Recruiter Dashboard ({user?.company || 'Nexus Innovations'})
            </h1>
            <p style={{ fontSize: '0.92rem', color: '#64748B' }}>
              Manage active listings, review candidate applications, and schedule candidate screenings.
            </p>
          </div>

          <Link
            to="/post-job"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 22px',
              borderRadius: '10px',
              backgroundColor: '#0C463B',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '0.95rem',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <PlusCircle size={18} />
            <span>Post a New Job</span>
          </Link>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 20px', flex: 1 }}>
        {/* Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}>
          {[
            { label: 'Active Postings', value: displayJobs.length, icon: Briefcase, color: '#0C463B', bg: '#EBF8F4' },
            { label: 'Total Applicants', value: applications.length, icon: Users, color: '#10B981', bg: '#ECFDF5' },
            { label: 'Shortlisted', value: applications.filter(a => a.status === 'Shortlisted').length, icon: CheckCircle2, color: '#3B82F6', bg: '#EFF6FF' },
            { label: 'Interviews Booked', value: applications.filter(a => a.status === 'Interview Scheduled').length, icon: Clock, color: '#F59E0B', bg: '#FFFBEB' }
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

        {/* Candidate Pipeline Section */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '40px',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
                Candidate Applications Pipeline
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                Review incoming submissions and update interview stages.
              </p>
            </div>

            {/* Filter buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {['all', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Rejected'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    backgroundColor: filterStatus === status ? '#0C463B' : '#F1F5F9',
                    color: filterStatus === status ? '#FFFFFF' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  {status === 'all' ? 'All Candidates' : status}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '0.82rem', color: '#64748B', textTransform: 'uppercase' }}>
                  <th style={{ padding: '16px 24px' }}>Candidate Name</th>
                  <th style={{ padding: '16px 20px' }}>Target Position</th>
                  <th style={{ padding: '16px 20px' }}>Match Score</th>
                  <th style={{ padding: '16px 20px' }}>Current Stage</th>
                  <th style={{ padding: '16px 20px' }}>Stage Action</th>
                  <th style={{ padding: '16px 24px', textAlign: 'right' }}>Communication</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '48px 24px', textAlign: 'center' }}>
                      <img
                        src="/assets/searchimages/no-candidates.svg"
                        alt="No candidates found"
                        style={{
                          width: '100%',
                          maxWidth: '220px',
                          height: 'auto',
                          margin: '0 auto 16px auto',
                          display: 'block'
                        }}
                      />
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0C463B', marginBottom: '8px' }}>
                        {filterStatus === 'all' ? 'No candidates yet' : `No candidates in "${filterStatus}" stage`}
                      </h3>
                      <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 16px auto', lineHeight: '1.5' }}>
                        {filterStatus === 'all'
                          ? 'When job seekers apply to your active job listings, their profiles and match scores will appear right here.'
                          : `There are currently no applicants marked as ${filterStatus}. Switch filters or review newly submitted candidates.`}
                      </p>
                      {filterStatus !== 'all' && (
                        <button
                          type="button"
                          onClick={() => setFilterStatus('all')}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            backgroundColor: '#EBF8F4',
                            color: '#0C463B',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            border: '1px solid #A7F3D0',
                            cursor: 'pointer'
                          }}
                        >
                          View All Candidates
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((cand) => {
                    const candId = cand.applicationId || cand.id;
                    const candStage = cand.stage || cand.status || 'applied';

                    return (
                      <tr key={candId} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '0.92rem' }}>
                        <td style={{ padding: '18px 24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img 
                              src={cand.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces'} 
                              alt={cand.name} 
                              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ fontWeight: '700', color: '#0F172A' }}>{cand.name}</div>
                              <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{cand.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '18px 20px', fontWeight: '600', color: '#334155' }}>
                          {cand.role || cand.jobTitle || 'Applicant'}
                        </td>
                        <td style={{ padding: '18px 20px' }}>
                          {/* ponytail: dynamic match score badge with tier coloring */}
                          <span style={{
                            display: 'inline-flex',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: (cand.matchScore || 85) >= 80 ? '#ECFDF5' : ((cand.matchScore || 85) >= 65 ? '#EFF6FF' : '#FFFBEB'),
                            color: (cand.matchScore || 85) >= 80 ? '#065F46' : ((cand.matchScore || 85) >= 65 ? '#1E40AF' : '#92400E'),
                            fontWeight: '700',
                            fontSize: '0.85rem'
                          }}>
                            {cand.matchScore || 85}% Match
                          </span>
                        </td>
                        <td style={{ padding: '18px 20px' }}>
                          <Badge 
                            variant={
                              candStage === 'interviewing' || candStage === 'Interview Scheduled' ? 'success' :
                              candStage === 'screening' || candStage === 'Shortlisted' ? 'primary' :
                              candStage === 'rejected' ? 'danger' : 'warning'
                            }
                          >
                            {candStage}
                          </Badge>
                        </td>
                        <td style={{ padding: '18px 20px' }}>
                          <select
                            value={candStage}
                            onChange={(e) => handleStatusChange(candId, e.target.value)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: '1px solid #CBD5E1',
                              fontSize: '0.85rem',
                              backgroundColor: '#FFFFFF',
                              color: '#0F172A',
                              outline: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="applied">Applied / Under Review</option>
                            <option value="screening">Screening</option>
                            <option value="interviewing">Interviewing</option>
                            <option value="offered">Offered</option>
                            <option value="rejected">Archived / Rejected</option>
                          </select>
                        </td>
                        <td style={{ padding: '18px 24px', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => handleMessageApplicant(cand, cand)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '7px 14px',
                              borderRadius: '6px',
                              backgroundColor: '#EBF8F4',
                              color: '#0C463B',
                              fontWeight: '700',
                              fontSize: '0.85rem',
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
                            <MessageSquare size={14} /> Message
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Your Active Postings Section */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: 'var(--shadow-sm)',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
              Your Active Job Postings
            </h2>
            <Link to="/post-job" style={{ color: '#0C463B', fontWeight: '600', fontSize: '0.9rem' }}>
              + Create New Listing
            </Link>
          </div>

          {displayJobs.length === 0 ? (
            <div style={{
              padding: '36px 24px',
              textAlign: 'center'
            }}>
              <img
                src="/assets/searchimages/no-postings.svg"
                alt="No active job postings"
                style={{
                  width: '100%',
                  maxWidth: '220px',
                  height: 'auto',
                  margin: '0 auto 16px auto',
                  display: 'block'
                }}
              />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0C463B', marginBottom: '8px' }}>
                No active job listings yet
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 18px auto', lineHeight: '1.5' }}>
                You have not published any job opportunities yet. Post a new role to start sourcing top talent across the platform.
              </p>
              <Link
                to="/post-job"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  textDecoration: 'none'
                }}
              >
                <PlusCircle size={16} />
                <span>Create Your First Listing</span>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {displayJobs.map(job => (
                <div key={job.id} style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  borderRadius: '10px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  gap: '12px'
                }}>
                  <div>
                    <Link to={`/job/${job.id}`}>
                      <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '1.05rem' }}>{job.title}</div>
                    </Link>
                    <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '2px' }}>
                      {job.location} • {job.salary} • Posted {job.postedDate}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Badge variant="primary">{job.type}</Badge>
                    <Link
                      to={`/job/${job.id}`}
                      style={{ fontSize: '0.88rem', fontWeight: '600', color: '#0C463B' }}
                    >
                      View Listing →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RecruiterDashBoardPage;
