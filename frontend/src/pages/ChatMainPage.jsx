import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Modal from '../components/common/Modal';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { 
  Send, 
  User, 
  Briefcase, 
  Star, 
  CheckCircle2, 
  MessageSquare,
  Award
} from 'lucide-react';

const ChatMainPage = () => {
  const { user } = useAuth();
  const { conversations, sendMessage, rateJobseeker } = useJobs();
  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || 'conv-1');
  const [inputText, setInputText] = useState('');

  // Rating Modal
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [ratingStars, setRatingStars] = useState(5);
  const [reviewNote, setReviewNote] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];
  const isRecruiter = user?.userType === 'recruiter';
  const messageCount = activeConv?.messages?.length || 0;
  const canRate = isRecruiter && messageCount >= 5 && !activeConv?.rated;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const senderRole = isRecruiter ? 'recruiter' : 'jobseeker';
    sendMessage(activeConvId, inputText, senderRole);
    setInputText('');

    // Simulate recruiter/candidate reply after 1.5 seconds if sent by user
    setTimeout(() => {
      const autoReplyRole = senderRole === 'jobseeker' ? 'recruiter' : 'jobseeker';
      const autoReplyText = senderRole === 'jobseeker' 
        ? "Thanks for your prompt response! Looking forward to reviewing the next steps."
        : "Sounds great! I will keep you posted.";
      sendMessage(activeConvId, autoReplyText, autoReplyRole);
    }, 1200);
  };

  const handleRateSubmit = (e) => {
    e.preventDefault();
    rateJobseeker(activeConvId, ratingStars, reviewNote);
    setRatingSubmitted(true);
    setTimeout(() => {
      setRatingSubmitted(false);
      setRatingModalOpen(false);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '24px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
              Messages & Candidate Discussions
            </h1>
            <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
              Direct real-time dialogue between recruiters and applicants.
            </p>
          </div>

          {activeConv?.rated && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}>
              <Star size={14} fill="#D97706" /> Candidate Rated: {activeConv.rating} / 5 Stars
            </div>
          )}

          {canRate && (
            <button
              onClick={() => setRatingModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                fontWeight: '600',
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              <Star size={16} /> Rate Candidate (Unlocked: 5+ msgs)
            </button>
          )}
        </div>
      </div>

      {/* Main Chat Box Container */}
      <div className="container" style={{ padding: '32px 20px', flex: 1 }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: 'var(--shadow-md)',
          height: '620px',
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          overflow: 'hidden'
        }} className="chat-layout">

          {/* Left Panel: Conversations List */}
          <div style={{ borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', fontWeight: '700', fontSize: '1rem', color: '#0F172A' }}>
              Conversations ({conversations.length})
            </div>

            <div style={{ overflowY: 'auto', flex: 1 }}>
              {conversations.map(conv => {
                const isSelected = conv.id === activeConvId;
                const lastMsg = conv.messages[conv.messages.length - 1];
                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid #F1F5F9',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#EBF8F4' : '#FFFFFF',
                      borderLeft: isSelected ? '4px solid #0C463B' : '4px solid transparent',
                      transition: 'var(--transition)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src={conv.participantAvatar} 
                        alt={conv.participantName}
                        style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#0F172A' }}>
                            {conv.participantName}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                            {lastMsg?.timestamp}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#0C463B', fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {conv.jobTitle}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '2px' }}>
                          {lastMsg?.text || 'Start conversation...'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Messages Thread */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Thread Header */}
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FAFAFA'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={activeConv?.participantAvatar} 
                  alt={activeConv?.participantName}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '0.98rem' }}>
                    {activeConv?.participantName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    {activeConv?.participantRole} • Discussion for <strong>{activeConv?.jobTitle}</strong>
                  </div>
                </div>
              </div>

              {canRate && (
                <button
                  onClick={() => setRatingModalOpen(true)}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    color: '#0C463B',
                    backgroundColor: '#EBF8F4',
                    border: '1px solid #A7F3D0',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  ⭐ Rate Job Seeker
                </button>
              )}
            </div>

            {/* Messages Body */}
            <div style={{
              flex: 1,
              padding: '24px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: '#F8FAFC'
            }}>
              {activeConv?.messages.map((msg) => {
                const isMe = (isRecruiter && msg.sender === 'recruiter') || (!isRecruiter && msg.sender === 'jobseeker');
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isMe ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div style={{
                      maxWidth: '70%',
                      padding: '12px 18px',
                      borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      backgroundColor: isMe ? '#0C463B' : '#FFFFFF',
                      color: isMe ? '#FFFFFF' : '#0F172A',
                      boxShadow: 'var(--shadow-sm)',
                      fontSize: '0.92rem',
                      lineHeight: '1.5'
                    }}>
                      {msg.text}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px', padding: '0 4px' }}>
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} style={{
              padding: '16px 20px',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              gap: '10px',
              backgroundColor: '#FFFFFF'
            }}>
              <input
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '0.92rem'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 20px',
                  borderRadius: '10px',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Send size={16} />
                <span>Send</span>
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Recruiter Rating Modal */}
      <Modal
        isOpen={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        title="Candidate Professionalism Rating"
      >
        {ratingSubmitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
              Rating Submitted!
            </h4>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
              Your feedback is now recorded on candidate profile credibility.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRateSubmit}>
            <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '16px' }}>
              You have exchanged 5+ messages with this candidate. Provide an official rating based on responsiveness and communication.
            </p>

            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingStars(star)}
                    style={{ cursor: 'pointer', padding: '4px' }}
                  >
                    <Star 
                      size={28} 
                      fill={star <= ratingStars ? '#F59E0B' : 'none'} 
                      color={star <= ratingStars ? '#F59E0B' : '#CBD5E1'} 
                    />
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0C463B' }}>
                {ratingStars} out of 5 Stars
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Recruiter Comments (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Highly responsive, clear communication regarding technical background..."
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '0.88rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setRatingModalOpen(false)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  color: '#475569',
                  fontWeight: '600',
                  fontSize: '0.88rem'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  fontSize: '0.88rem'
                }}
              >
                Submit Rating
              </button>
            </div>
          </form>
        )}
      </Modal>

      <Footer />

      <style>{`
        @media (max-width: 800px) {
          .chat-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatMainPage;