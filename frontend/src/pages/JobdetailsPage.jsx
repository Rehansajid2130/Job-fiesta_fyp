import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useJobs } from '../context/JobContext';
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
  const { jobs, savedJobIds, toggleSaveJob, applyToJob, applications } = useJobs();

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Find job by ID or fallback to first job
  const job = jobs.find(j => j.id === id) || jobs[0];

  if (!job) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2>Job Not Found</h2>
          <Link to="/search" style={{ color: '#0C463B', fontWeight: '600', marginTop: '16px', display: 'inline-block' }}>
            Back to Job Search
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isSaved = savedJobIds.includes(job.id);
  const isApplied = applications.some(a => a.jobId === job.id);

  const handleApply = (e) => {
    e.preventDefault();
    const result = applyToJob(job.id, coverNote);
    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => {
        setSuccessMessage('');
        setApplyModalOpen(false);
      }, 1500);
    } else {
      alert(result.message);
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
            style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0C463B', fontWeight: '600', cursor: 'pointer' }}
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
                    <span style={{ fontWeight: '600', color: '#0C463B' }}>{job.company}</span>
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
                  {copied ? <Check size={18} color="#10B981" /> : <Share2 size={18} />}
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
                Interested in this role?
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '20px' }}>
                Submit your application directly through Job Fiesta. Your resume is automatically matched against key requirements.
              </p>

              {isApplied ? (
                <div style={{
                  padding: '14px',
                  borderRadius: '10px',
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle2 size={18} />
                  Application Submitted
                </div>
              ) : (
                <button
                  onClick={() => setApplyModalOpen(true)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '0.98rem',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'var(--transition)'
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
            <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
              Application Successfully Sent!
            </h4>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>{successMessage}</p>
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
              <span>Resume: <strong>Alice_Johnson_CV.pdf</strong></span>
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
                  border: '1px solid #CBD5E1',
                  color: '#475569',
                  fontWeight: '600',
                  fontSize: '0.9rem'
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
