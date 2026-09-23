import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const { user } = useAuth();
  const { jobs, applications, updateApplicationStatus } = useJobs();
  const [filterStatus, setFilterStatus] = useState('all');

  const recruiterJobs = jobs.filter(j => j.company.toLowerCase().includes('nexus') || j.company.toLowerCase().includes(user?.company?.toLowerCase() || ''));
  const displayJobs = recruiterJobs.length > 0 ? recruiterJobs : jobs.slice(0, 3);

  const filteredApplications = filterStatus === 'all' 
    ? applications 
    : applications.filter(a => a.status === filterStatus);

  const handleStatusChange = (appId, newStatus) => {
    updateApplicationStatus(appId, newStatus);
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
                {filteredApplications.map(app => (
                  <tr key={app.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '0.92rem' }}>
                    <td style={{ padding: '18px 24px' }}>
                      <div style={{ fontWeight: '700', color: '#0F172A' }}>Alice Johnson</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>alice.jobseeker@example.com</div>
                    </td>
                    <td style={{ padding: '18px 20px', fontWeight: '600', color: '#334155' }}>
                      {app.jobTitle}
                    </td>
                    <td style={{ padding: '18px 20px' }}>
                      <span style={{
                        display: 'inline-flex',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        backgroundColor: '#ECFDF5',
                        color: '#065F46',
                        fontWeight: '700',
                        fontSize: '0.85rem'
                      }}>
                        {app.matchScore}% Match
                      </span>
                    </td>
                    <td style={{ padding: '18px 20px' }}>
                      <Badge 
                        variant={
                          app.status === 'Interview Scheduled' ? 'success' :
                          app.status === 'Shortlisted' ? 'primary' :
                          app.status === 'Rejected' ? 'danger' : 'warning'
                        }
                      >
                        {app.status}
                      </Badge>
                    </td>
                    <td style={{ padding: '18px 20px' }}>
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
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
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Offer Extended">Offer Extended</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td style={{ padding: '18px 24px', textAlign: 'right' }}>
                      <Link
                        to="/chat"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          backgroundColor: '#EBF8F4',
                          color: '#0C463B',
                          fontWeight: '600',
                          fontSize: '0.85rem'
                        }}
                      >
                        <MessageSquare size={14} /> Message
                      </Link>
                    </td>
                  </tr>
                ))}
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RecruiterDashBoardPage;
