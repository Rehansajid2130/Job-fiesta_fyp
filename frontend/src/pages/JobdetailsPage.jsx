import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import IconSwap from '../components/common/IconSwap';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  Briefcase, 
  CheckCircle2, 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Building2,
  Check,
  Award
} from 'lucide-react';

const JobdetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isRecruiter = user?.userType === 'recruiter';
  const { jobs, savedJobIds, toggleSaveJob, applyToJob, applications, isJobApplied, showToast } = useJobs();

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Find job by ID or fallback to first job
  const job = jobs.find(j => j.id === id) || jobs[0];

  if (!job) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
        <Navbar />
        <div className="container" style={{ padding: '60px 20px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '48px 24px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            textAlign: 'center',
            maxWidth: '480px',
            width: '100%'
          }}>
            <img
              src="/assets/searchimages/job-not-found.svg"
              alt="Job not found"
              style={{
                width: '100%',
                maxWidth: '220px',
                height: 'auto',
                margin: '0 auto 16px auto',
                display: 'block'
              }}
            />
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0C463B', marginBottom: '8px' }}>
              Job Not Found
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.5' }}>
              This job posting may have expired, been removed by the recruiter, or the link may be incorrect.
            </p>
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
                fontWeight: '600',
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}
            >
              Back to Job Search
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isSaved = savedJobIds.includes(job.id);
  const isApplied = isJobApplied ? isJobApplied(job.id || job._id) : applications.some(a => String(a.jobId) === String(job.id || job._id));

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      setApplyModalOpen(false);
      navigate('/login', { 
        state: { 
          from: `/job/${job.id}`,
          message: 'Please log in to your account to apply for this job.' 
        } 
      });
      return;
    }
    const result = await applyToJob(job.id, coverNote);
    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => {
        setSuccessMessage('');
        setApplyModalOpen(false);
      }, 1500);
    } else {
      if (result.requireLogin) {
        setApplyModalOpen(false);
        navigate('/login', { 
          state: { 
            from: `/job/${job.id}`,
            message: result.message 
          } 
        });
      } else if (result.alreadyApplied || result.message?.toLowerCase().includes('already applied')) {
        setApplyModalOpen(false);
        showToast('You have already applied for this position.', 'info');
      } else {
        showToast(result.message || 'Could not submit application.', 'error');
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Breadcrumb Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '16px 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#64748B' }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              color: '#0C463B', 
              fontWeight: '600', 
              cursor: 'pointer',
              transition: 'transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <span>/</span>
          <Link to="/search">Jobs</Link>
          <span>/</span>
          <span style={{ color: '#0F172A', fontWeight: '600' }}>{job.title}</span>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 20px', flex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '32px',
          alignItems: 'start'
        }} className="job-details-layout">

          {/* Left Column: Full Job Description */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '18px' }}>
                <img 
                  src={job.logo} 
                  alt={job.company} 
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '14px',
                    objectFit: 'cover',
                    border: '1px solid #E2E8F0'
                  }}
                />
                <div>
                  <h1 style={{ fontSize: '1.65rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
                    {job.title}
                  </h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#475569' }}>
                    <Link 
                      to={job.company.toLowerCase().includes('aurora') ? '/company/aurora-creative-labs' : job.company.toLowerCase().includes('cognitive') ? '/company/cognitive-dynamics-ai' : job.company.toLowerCase().includes('apex') ? '/company/apex-financial-systems' : '/company/nexus-innovations'}
                      style={{ fontWeight: '700', color: '#0C463B', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                    >
                      {job.company}
                    </Link>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={15} /> {job.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleShare}
                  title="Share job link"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    color: '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconSwap 
                    state={copied} 
                    iconA={<Check size={18} color="#10B981" />} 
                    iconB={<Share2 size={18} />} 
                  />
                </button>
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  title={isSaved ? "Remove from saved" : "Save this job"}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    backgroundColor: isSaved ? '#EBF8F4' : '#FFFFFF',
                    color: isSaved ? '#0C463B' : '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Bookmark size={18} fill={isSaved ? '#0C463B' : 'none'} />
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              padding: '18px',
              marginBottom: '32px'
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Compensation</div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0C463B', marginTop: '2px' }}>{job.salary}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Employment</div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', marginTop: '2px' }}>{job.type}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Experience</div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', marginTop: '2px' }}>{job.experience || 'Mid-Senior'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Posted</div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', marginTop: '2px' }}>{job.postedDate}</div>
              </div>
            </div>

            {/* About the Role */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '14px' }}>
                About the Position
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#334155' }}>
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>
                Key Responsibilities & Qualifications
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {job.requirements?.map((req, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem', color: '#334155', lineHeight: '1.5' }}>
                    <div style={{ marginTop: '3px', color: '#10B981' }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>
                Perks & Benefits
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {job.benefits?.map((ben, i) => (
                  <div key={i} style={{
                    backgroundColor: '#F8FAFC',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    color: '#334155',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid #E2E8F0'
                  }}>
                    <Award size={16} color="#0C463B" />
                    <span>{ben}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#64748B', marginBottom: '10px', textTransform: 'uppercase' }}>
                Relevant Technologies & Tags
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {job.tags?.map((t, idx) => (
                  <Badge key={idx} variant="primary" size="md">{t}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Apply Widget & Company Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Quick Apply Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)',
              textAlign: 'center'
            }}>
              {isRecruiter ? (
                <>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
                    Employer Requisition View
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '20px' }}>
                    You are viewing this listing in recruiter mode. Candidates can apply directly, and incoming profiles sync straight to your ATS pipeline.
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate('/candidates')}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '10px',
                      backgroundColor: '#0C463B',
                      color: '#FFFFFF',
                      border: '1px solid #0C463B',
                      fontWeight: '700',
                      fontSize: '0.98rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(12, 70, 59, 0.22)',
                      transition: 'background-color 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 340ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#08342c';
                      e.currentTarget.style.borderColor = '#08342c';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(12, 70, 59, 0.32)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#0C463B';
                      e.currentTarget.style.borderColor = '#0C463B';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(12, 70, 59, 0.22)';
                    }}
                  >
                    Open Candidate ATS Pipeline
                  </button>

                  <Link
                    to="/recruiter-dashboard"
                    style={{
                      display: 'block',
                      marginTop: '16px',
                      fontSize: '0.85rem',
                      color: '#0C463B',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    ← Back to Recruiter Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
                    Interested in this role?
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '20px' }}>
                    Submit your application directly through Job Fiesta. Your resume is automatically matched against key requirements.
                  </p>

                  {isApplied ? (
                    <div
                      style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '8px',
                        backgroundColor: '#ECFDF5',
                        color: '#065F46',
                        border: '1px solid #A7F3D0',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      <CheckCircle2 size={18} />
                      Applied
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (!user) {
                          navigate('/login', { 
                            state: { 
                              from: `/job/${job.id}`,
                              message: 'Please log in to your account to apply for this job.' 
                            } 
                          });
                          return;
                        }
                        setApplyModalOpen(true);
                      }}
                      style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '8px',
                        backgroundColor: '#0C463B',
                        color: '#FFFFFF',
                        border: '1px solid #0C463B',
                        fontWeight: '700',
                        fontSize: '0.98rem',
                        cursor: 'pointer'
                      }}
                    >
                      Apply Now
                    </button>
                  )}

                  <Link
                    to="/resume-builder"
                    style={{
                      display: 'block',
                      marginTop: '16px',
                      fontSize: '0.85rem',
                      color: '#0C463B',
                      fontWeight: '600'
                    }}
                  >
                    ✨ Optimize Resume Before Applying
                  </Link>
                </>
              )}
            </div>

            {/* Company Info Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <Building2 size={24} color="#0C463B" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A' }}>
                  About {job.company}
                </h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: '1.6', marginBottom: '16px' }}>
                Verified tech innovator creating next-gen digital solutions. Known for rapid growth, supportive engineering culture, and competitive benefits.
              </p>
              <div style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div><strong>Industry:</strong> Software & Cloud Systems</div>
                <div><strong>Company Size:</strong> 250 - 500 Employees</div>
                <div><strong>Website:</strong> www.{job.company.toLowerCase().replace(/\s+/g, '')}.io</div>
              </div>
              <Link
                to={job.company.toLowerCase().includes('aurora') ? '/company/aurora-creative-labs' : job.company.toLowerCase().includes('cognitive') ? '/company/cognitive-dynamics-ai' : job.company.toLowerCase().includes('apex') ? '/company/apex-financial-systems' : '/company/nexus-innovations'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: '16px',
                  width: '100%',
                  padding: '9px',
                  borderRadius: '8px',
                  border: '1px solid #0C463B',
                  backgroundColor: '#EBF8F4',
                  color: '#0C463B',
                  fontWeight: '700',
                  fontSize: '0.84rem',
                  textDecoration: 'none'
                }}
              >
                View Full Company Profile →
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Apply Modal */}
      <Modal 
        isOpen={applyModalOpen} 
        onClose={() => setApplyModalOpen(false)}
        title={`Apply for ${job.title}`}
      >
        {successMessage ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <img
              src="/assets/searchimages/application-success.svg"
              alt="Application Successfully Sent"
              style={{
                width: '100%',
                maxWidth: '220px',
                height: 'auto',
                margin: '0 auto 16px auto',
                display: 'block'
              }}
            />
            <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0C463B', marginBottom: '8px' }}>
              Application Successfully Sent!
            </h4>
            <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto', lineHeight: '1.5' }}>
              {successMessage}
            </p>
          </div>
        ) : (
          <form onSubmit={handleApply}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>
                {job.title} at {job.company}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                {job.location} • {job.salary}
              </div>
            </div>

            <div style={{
              backgroundColor: '#EBF8F4',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '0.85rem',
              color: '#0C463B',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>Resume: <strong>{user?.name ? `${user.name.replace(/\s+/g, '_')}_CV.pdf` : 'Candidate_CV.pdf'}</strong></span>
              <Badge variant="success">ATS Ready</Badge>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Cover Letter Note
              </label>
              <textarea
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Mention why you are passionate about this role and how your expertise aligns with their objectives..."
                rows={5}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '0.9rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setApplyModalOpen(false)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: '1px solid #0C463B',
                  backgroundColor: '#EBF8F4',
                  color: '#0C463B',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '10px 22px',
                  borderRadius: '8px',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
              >
                Send Application
              </button>
            </div>
          </form>
        )}
      </Modal>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .job-details-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default JobdetailsPage;
