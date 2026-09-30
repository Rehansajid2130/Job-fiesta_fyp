import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Modal from '../components/common/Modal';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Search, 
  Filter, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Star, 
  ArrowRight, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  FileText, 
  Eye, 
  ChevronRight,
  TrendingUp,
  UserCheck,
  XCircle,
  AlertCircle
} from 'lucide-react';

const STAGES = [
  { id: 'applied', label: 'Applied', color: '#3B82F6', bg: '#EFF6FF' },
  { id: 'screening', label: 'Screening', color: '#F59E0B', bg: '#FFFBEB' },
  { id: 'interviewing', label: 'Interviewing', color: '#8B5CF6', bg: '#F5F3FF' },
  { id: 'offered', label: 'Offered', color: '#10B981', bg: '#ECFDF5' },
  { id: 'rejected', label: 'Archived', color: '#64748B', bg: '#F8FAFC' }
];

const CandidatesAtsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { candidates, updateCandidateStage, showToast } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const filteredCandidates = candidates.filter(cand => 
    cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cand.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cand.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenDetail = (cand) => {
    setSelectedCandidate(cand);
    setDetailModalOpen(true);
  };

  const handleStageChange = (candId, newStage) => {
    updateCandidateStage(candId, newStage);
    if (selectedCandidate && selectedCandidate.id === candId) {
      setSelectedCandidate(prev => ({ ...prev, stage: newStage }));
    }
  };

  const handleChatWithCandidate = (cand) => {
    setDetailModalOpen(false);
    navigate('/chat');
    showToast(`Opening chat with ${cand.name}`, 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Header Banner */}
      <section style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '36px 0 28px'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}>
            <div>
              <span style={{ 
                fontSize: '0.85rem', 
                fontWeight: '700', 
                color: '#10B981', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em' 
              }}>
                Recruiter ATS Pipeline
              </span>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
                Candidate Pipeline ({user?.company || 'Nexus Innovations'})
              </h1>
              <p style={{ fontSize: '0.92rem', color: '#64748B' }}>
                Track applicants across screening, technical interviews, and offer stages.
              </p>
            </div>

            {/* Quick stats ribbon */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{
                padding: '12px 18px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0C463B' }}>{candidates.length}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748B' }}>Total Applicants</div>
              </div>
              <div style={{
                padding: '12px 18px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#10B981' }}>91%</div>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748B' }}>Avg Match Score</div>
              </div>
              <div style={{
                padding: '12px 18px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#8B5CF6' }}>
                  {candidates.filter(c => c.stage === 'interviewing').length}
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748B' }}>Interviews</div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '24px',
            maxWidth: '480px',
            backgroundColor: '#F8FAFC',
            borderRadius: '10px',
            padding: '8px 14px',
            border: '1px solid #CBD5E1'
          }}>
            <Search size={18} color="#94A3B8" />
            <input
              type="text"
              placeholder="Filter candidates by name, target role, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                fontSize: '0.9rem',
                color: '#0F172A'
              }}
            />
          </div>
        </div>
      </section>

      {/* ATS Kanban Columns */}
      <main style={{ padding: '36px 0 80px', flex: 1, overflowX: 'auto' }}>
        <div className="container" style={{ minWidth: '1100px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '16px',
            alignItems: 'flex-start'
          }}>
            {STAGES.map(stage => {
              const stageCandidates = filteredCandidates.filter(c => c.stage === stage.id);

              return (
                <div
                  key={stage.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '520px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {/* Column Header */}
                  <div style={{
                    padding: '14px 16px',
                    borderBottom: '1px solid #F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: stage.bg,
                    borderTopLeftRadius: '14px',
                    borderTopRightRadius: '14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: stage.color
                      }} />
                      <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0F172A' }}>
                        {stage.label}
                      </span>
                    </div>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      color: stage.color,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                      {stageCandidates.length}
                    </span>
                  </div>

                  {/* Candidate Cards in this Stage */}
                  <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                    {stageCandidates.length === 0 ? (
                      <div style={{
                        padding: '36px 12px',
                        textAlign: 'center',
                        color: '#94A3B8',
                        fontSize: '0.82rem',
                        fontStyle: 'italic'
                      }}>
                        No candidates in this stage
                      </div>
                    ) : (
                      stageCandidates.map(cand => (
                        <div
                          key={cand.id}
                          style={{
                            padding: '14px',
                            borderRadius: '10px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onClick={() => handleOpenDetail(cand)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#0C463B';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#E2E8F0';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <img
                              src={cand.avatar}
                              alt={cand.name}
                              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <h4 style={{
                                fontSize: '0.92rem',
                                fontWeight: '700',
                                color: '#0F172A',
                                margin: 0,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                {cand.name}
                              </h4>
                              <span style={{
                                fontSize: '0.76rem',
                                color: '#64748B',
                                display: 'block',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                {cand.role}
                              </span>
                            </div>
                          </div>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '10px',
                            fontSize: '0.78rem'
                          }}>
                            <span style={{
                              padding: '2px 6px',
                              borderRadius: '4px',
                              backgroundColor: '#EBF8F4',
                              color: '#0C463B',
                              fontWeight: '700'
                            }}>
                              {cand.matchScore}% Match
                            </span>
                            <span style={{ color: '#94A3B8' }}>{cand.experience}</span>
                          </div>

                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                            {cand.skills.slice(0, 2).map(skill => (
                              <span
                                key={skill}
                                style={{
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  backgroundColor: '#F1F5F9',
                                  color: '#475569',
                                  fontSize: '0.7rem',
                                  fontWeight: '600'
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                            {cand.skills.length > 2 && (
                              <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>
                                +{cand.skills.length - 2}
                              </span>
                            )}
                          </div>

                          {/* Quick Stage Mover */}
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              paddingTop: '8px',
                              borderTop: '1px solid #F1F5F9',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Move stage:</span>
                            <select
                              value={cand.stage}
                              onChange={(e) => handleStageChange(cand.id, e.target.value)}
                              style={{
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                border: '1px solid #E2E8F0',
                                borderRadius: '6px',
                                padding: '2px 4px',
                                color: '#0C463B',
                                backgroundColor: '#FFFFFF',
                                outline: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              {STAGES.map(s => (
                                <option key={s.id} value={s.id}>{s.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Candidate Profile Drawer / Modal */}
      {selectedCandidate && (
        <Modal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          title={`Candidate Profile — ${selectedCandidate.name}`}
          maxWidth="700px"
        >
          <div>
            {/* Header info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <img
                src={selectedCandidate.avatar}
                alt={selectedCandidate.name}
                style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #0C463B' }}
              />
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  {selectedCandidate.name}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.92rem', margin: '2px 0' }}>
                  {selectedCandidate.role} • {selectedCandidate.experience}
                </p>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: '#64748B' }}>
                  <span>{selectedCandidate.email}</span>
                  <span>•</span>
                  <span>{selectedCandidate.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              padding: '14px',
              borderRadius: '10px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>ATS Match</div>
                <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#10B981' }}>{selectedCandidate.matchScore}%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Expected Salary</div>
                <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A' }}>{selectedCandidate.expectedSalary}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Applied Date</div>
                <div style={{ fontSize: '0.92rem', fontWeight: '600', color: '#0F172A' }}>{selectedCandidate.appliedDate}</div>
              </div>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
                Skills & Tech Stack
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedCandidate.skills.map(s => (
                  <span
                    key={s}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: '#EBF8F4',
                      color: '#0C463B',
                      fontSize: '0.82rem',
                      fontWeight: '600'
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Screening Answers */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0F172A', marginBottom: '10px' }}>
                Screening Questions & Responses
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedCandidate.screeningAnswers.map((item, idx) => (
                  <div key={idx} style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                      Q: {item.question}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#0F172A', lineHeight: 1.45 }}>
                      A: {item.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage Selector & Actions */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              paddingTop: '16px',
              borderTop: '1px solid #E2E8F0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#475569' }}>Current Stage:</span>
                <select
                  value={selectedCandidate.stage}
                  onChange={(e) => handleStageChange(selectedCandidate.id, e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    color: '#0C463B',
                    backgroundColor: '#FFFFFF',
                    outline: 'none'
                  }}
                >
                  {STAGES.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  to="/profile/furqan12"
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#334155',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                >
                  View Full Profile
                </Link>

                <button
                  type="button"
                  onClick={() => handleChatWithCandidate(selectedCandidate)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <MessageSquare size={16} />
                  <span>Chat in Live Messenger</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
};

export default CandidatesAtsPage;
