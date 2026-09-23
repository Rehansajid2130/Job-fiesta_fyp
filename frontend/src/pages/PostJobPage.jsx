import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/mockData';
import { Briefcase, Building, MapPin, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

const PostJobPage = () => {
  const navigate = useNavigate();
  const { postNewJob } = useJobs();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    company: user?.company || 'Nexus Innovations',
    location: 'Remote',
    category: 'tech',
    type: 'Full-Time',
    experience: 'Mid-Senior',
    salaryMin: '120',
    salaryMax: '150',
    tags: 'React, TypeScript, Modern CSS',
    description: '',
    requirements: 'Strong proficiency in modern JavaScript/TypeScript.\nDemonstrated portfolio of shipped web applications.\nExcellent collaborative and problem-solving skills.',
    benefits: 'Full health, dental & vision coverage.\n$2,500 annual professional development stipend.\nFlexible remote work environment.'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please provide a job title.');
      return;
    }

    postNewJob({
      ...formData,
      salary: `$${formData.salaryMin}k - $${formData.salaryMax}k`
    });

    setSubmitted(true);
    setTimeout(() => {
      navigate('/recruiter-dashboard');
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '32px 0'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
            Publish a New Job Listing
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#64748B' }}>
            Target top candidates across the Job Fiesta network with AI job matching.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 20px', flex: 1, maxWidth: '850px' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '36px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <CheckCircle2 size={56} color="#10B981" style={{ margin: '0 auto 16px' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                Job Published Successfully!
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
                Redirecting you to the recruiter dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Position Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Architect, Lead Product Designer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Location / Workplace
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco (Remote), New York (Hybrid)"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.92rem',
                      backgroundColor: '#FFFFFF',
                      outline: 'none'
                    }}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Employment Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.92rem',
                      backgroundColor: '#FFFFFF',
                      outline: 'none'
                    }}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Experience Level
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.92rem',
                      backgroundColor: '#FFFFFF',
                      outline: 'none'
                    }}
                  >
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid-Level">Mid-Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead / Executive">Lead / Executive</option>
                  </select>
                </div>
              </div>

              {/* Salary Range */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Min Annual Salary ($k USD)
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Max Annual Salary ($k USD)
                  </label>
                  <input
                    type="number"
                    placeholder="150"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Tags / Skills (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="React, TypeScript, GraphQL, AWS"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Job Description & Mission
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the team, mission, and day-to-day responsibilities..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Key Requirements (one per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => navigate('/recruiter-dashboard')}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    color: '#475569',
                    fontWeight: '600',
                    fontSize: '0.95rem'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 28px',
                    borderRadius: '8px',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '0.98rem',
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>Publish Job</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostJobPage;
