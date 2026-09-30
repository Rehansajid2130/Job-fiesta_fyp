import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/common/Modal';
import IconSwap from '../components/common/IconSwap';
import { 
  Send, 
  Search, 
  ArrowLeft, 
  Image as ImageIcon, 
  Smile, 
  MoreHorizontal, 
  CheckCircle2, 
  Star,
  X,
  User,
  LogOut,
  LayoutDashboard
} from 'lucide-react';

const ChatMainPage = () => {
  const navigate = useNavigate();
  const { user, logout, switchRole } = useAuth();
  const { conversations, sendMessage, rateJobseeker } = useJobs();

  // Selected conversation ID (null displays the empty state from Figma Image 1)
  const [activeConvId, setActiveConvId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Rating Modal (for recruiter rating flow)
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [ratingStars, setRatingStars] = useState(5);
  const [reviewNote, setReviewNote] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // Close profile menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileMenuOpen]);

  const activeConv = conversations.find(c => c.id === activeConvId);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (activeConv) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConv?.messages]);

  const isRecruiter = user?.userType === 'recruiter';
  const messageCount = activeConv?.messages?.length || 0;
  const canRate = isRecruiter && messageCount >= 5 && !activeConv?.rated;

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeConvId) return;

    const currentText = inputText.trim();
    const senderRole = isRecruiter ? 'recruiter' : 'jobseeker';
    sendMessage(activeConvId, currentText, senderRole);
    setInputText('');

    // Simulate auto-reply after 1.2s for interactive feel
    setTimeout(() => {
      const autoReplyRole = senderRole === 'jobseeker' ? 'recruiter' : 'jobseeker';
      let autoReplyText = "Thank you for reaching out! Let me review this and get back to you shortly.";
      if (activeConv?.participantName === 'Suzana Colin') {
        autoReplyText = "Excellent! I will send over the detailed job description and next interview steps.";
      } else if (activeConv?.participantName === 'Hassan') {
        autoReplyText = "Sounds good! Let's sync up on the details tomorrow.";
      }
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

  // Filter conversations by search term
  const filteredConversations = conversations.filter(c => {
    const q = searchQuery.toLowerCase();
    const nameMatch = c.participantName?.toLowerCase().includes(q);
    const snippetMatch = c.lastMessage?.toLowerCase().includes(q);
    const msgMatch = c.messages?.some(m => m.text?.toLowerCase().includes(q));
    return nameMatch || snippetMatch || msgMatch;
  });

  const currentUserDisplayName = user?.name || 'Furqan12';
  const currentUserAvatar = user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces';

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* ────────────────────────────────────────────────────────────────
          LEFT SIDEBAR: Figma Header, Messages Search & Conversation List
         ──────────────────────────────────────────────────────────────── */}
      <aside 
        className={`chat-sidebar ${activeConvId ? 'mobile-hidden' : ''}`}
        style={{
          width: '360px',
          minWidth: '320px',
          height: '100%',
          borderRight: '1px solid #F1F5F9',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}
      >
        {/* Top Header Section */}
        <div style={{ padding: '24px 24px 14px 24px' }}>
          
          {/* Logo row: Sparkle + "Job fiesta" */}
          <Link 
            to="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              textDecoration: 'none', 
              marginBottom: '28px' 
            }}
          >
            <img 
              src="/assets/images/group_3_1.svg" 
              alt="Sparkle" 
              style={{ width: '22px', height: '20px' }} 
            />
            <span style={{
              display: 'inline-flex',
              alignItems: 'baseline'
            }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '22px',
                fontWeight: '900',
                color: '#000000',
                letterSpacing: '-0.02em'
              }}>
                Job
              </span>
              <span style={{
                fontFamily: "'League Script', cursive",
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#000000',
                marginLeft: '4px',
                lineHeight: 0.8
              }}>
                fiesta
              </span>
            </span>
          </Link>

          {/* Navigation & Title */}
          <div>
            <button
              type="button"
              onClick={() => {
                if (activeConvId) {
                  setActiveConvId(null);
                } else {
                  navigate('/');
                }
              }}
              aria-label="Back"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0 0 10px 0',
                display: 'flex',
                alignItems: 'center',
                color: '#111827'
              }}
            >
              <ArrowLeft size={19} strokeWidth={2.4} />
            </button>
            <h2 style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#111827',
              margin: '0 0 16px 0',
              letterSpacing: '-0.01em'
            }}>
              Messages
            </h2>
          </div>

          {/* Search Bar matching Figma: Pill shape */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search 
              size={17} 
              color="#9CA3AF" 
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}
            />
            <input 
              type="text"
              placeholder="Search people or message"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 16px 9px 38px',
                borderRadius: '9999px',
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                fontSize: '13px',
                color: '#111827',
                outline: 'none',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#0D473B';
                e.target.style.boxShadow = '0 0 0 3px rgba(13, 71, 59, 0.08)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E5E7EB';
                e.target.style.boxShadow = 'none';
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9CA3AF',
                  padding: '2px'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Conversations List */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '0 12px 12px 12px' 
        }}>
          {filteredConversations.length === 0 ? (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>
              No messages found
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConvId;
              const lastMsg = conv.messages[conv.messages.length - 1];
              const snippet = conv.lastMessage || lastMsg?.text || 'No messages yet';
              const dateDisplay = conv.date || 'Dec 15';

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#F3F4F6' : 'transparent',
                    transition: 'background-color 0.15s ease',
                    marginBottom: '2px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = '#F9FAFB';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {/* Participant Avatar */}
                  <img
                    src={conv.participantAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'}
                    alt={conv.participantName}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />

                  {/* Name + Snippet */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: '8px'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#111827',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {conv.participantName}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        color: '#9CA3AF',
                        flexShrink: 0
                      }}>
                        {dateDisplay}
                      </span>
                    </div>

                    <p style={{
                      fontSize: '12px',
                      color: isSelected ? '#4B5563' : '#6B7280',
                      margin: '2px 0 0 0',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {snippet}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Bottom: Current User Profile Card + Options ••• */}
        <div 
          ref={profileMenuRef}
          style={{
            position: 'relative',
            borderTop: '1px solid #F1F5F9',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src={currentUserAvatar} 
              alt={currentUserDisplayName}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <span style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#111827'
            }}>
              {currentUserDisplayName}
            </span>
          </div>

          {/* More options button ••• */}
          <button
            type="button"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            aria-label="Profile Options"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6B7280',
              padding: '6px',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MoreHorizontal size={20} />
          </button>

          {/* transitions-dev: Dropdown menu for profile */}
          <div 
            className={`t-dropdown ${profileMenuOpen ? 'is-open' : ''}`}
            data-origin="bottom-left"
            style={{
              position: 'absolute',
              right: '20px',
              bottom: 'calc(100% + 4px)',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #E2E8F0',
              padding: '6px',
              minWidth: '180px',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}
          >
            <Link 
              to="/account-settings" 
              onClick={() => setProfileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                fontSize: '13px',
                color: '#334155',
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <User size={15} />
              Account Settings
            </Link>

            <Link 
              to={isRecruiter ? '/recruiter-dashboard' : '/jobseeker-dashboard'} 
              onClick={() => setProfileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                fontSize: '13px',
                color: '#334155',
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <LayoutDashboard size={15} />
              Dashboard
            </Link>

            <button
              type="button"
              onClick={() => {
                setProfileMenuOpen(false);
                logout();
                navigate('/login');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                fontSize: '13px',
                color: '#EF4444',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                borderRadius: '8px',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <LogOut size={15} />
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* ────────────────────────────────────────────────────────────────
          RIGHT MAIN AREA: Empty State (Image 1) OR Active Chat (Image 2)
         ──────────────────────────────────────────────────────────────── */}
      <main 
        className={`chat-main-area ${!activeConvId ? 'mobile-hidden' : ''}`}
        style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          position: 'relative'
        }}
      >
        {!activeConv ? (
          /* ══════════════════════════════════════════════════════════
             STATE 1: Exact Match of Figma Image 1 (No Message Selected)
             ══════════════════════════════════════════════════════════ */
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 24px',
            textAlign: 'center',
            overflowY: 'auto'
          }}>
            <h1 style={{
              fontSize: 'clamp(26px, 3vw, 34px)',
              fontWeight: '800',
              color: '#111827',
              margin: '0 0 12px 0',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              You don't have a message<br />selected.
            </h1>

            <p style={{
              fontSize: '14px',
              color: '#6B7280',
              margin: '0 0 24px 0',
              maxWidth: '440px',
              lineHeight: 1.5
            }}>
              Choose one from your existing messages, or start a new one.
            </p>

            {/* New Message Button: Deep Green Pill matching Figma */}
            <button
              type="button"
              onClick={() => {
                // Selects Suzana Colin or first contact to open chat
                if (conversations.length > 0) {
                  setActiveConvId(conversations[0].id);
                }
              }}
              style={{
                backgroundColor: '#114B3E',
                color: '#FFFFFF',
                borderRadius: '9999px',
                padding: '12px 36px',
                fontSize: '14px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(17, 75, 62, 0.2)',
                transition: 'background-color 0.2s ease, transform 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0B342B';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#114B3E';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              New Message
            </button>

            {/* Figma Illustration: Person in armchair with newspaper & lamp */}
            <div style={{ marginTop: '48px', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <img 
                src="/assets/images/group_28.svg" 
                alt="Cozy reading armchair illustration"
                style={{
                  width: '320px',
                  maxWidth: '85%',
                  height: 'auto',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>
        ) : (
          /* ══════════════════════════════════════════════════════════
             STATE 2: Exact Match of Figma Image 2 (Active Chat Interface)
             ══════════════════════════════════════════════════════════ */
          <>
            {/* Top Chat Header */}
            <div style={{
              height: '68px',
              padding: '0 28px',
              borderBottom: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FFFFFF',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Mobile Back Button */}
                <button
                  type="button"
                  onClick={() => setActiveConvId(null)}
                  className="mobile-back-btn"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    color: '#111827',
                    display: 'none',
                    alignItems: 'center'
                  }}
                >
                  <ArrowLeft size={20} />
                </button>

                <img 
                  src={activeConv.participantAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces'}
                  alt={activeConv.participantName}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />

                <span style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#111827'
                }}>
                  {activeConv.participantName}
                </span>
              </div>

              {/* Recruiter Rating Action if eligible */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {activeConv.rated && (
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#92400E',
                    backgroundColor: '#FEF3C7',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Star size={13} fill="#F59E0B" color="#F59E0B" /> Rated: {activeConv.rating}★
                  </span>
                )}

                {canRate && (
                  <button
                    type="button"
                    onClick={() => setRatingModalOpen(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Star size={13} /> Rate Candidate
                  </button>
                )}
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '32px 36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              {activeConv.messages?.map((msg) => {
                const isSentByMe = msg.sender === (isRecruiter ? 'recruiter' : 'jobseeker') || msg.sender === 'user';

                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isSentByMe ? 'flex-end' : 'flex-start',
                      width: '100%'
                    }}
                  >
                    {/* Message Row */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      maxWidth: '75%',
                      flexDirection: isSentByMe ? 'row-reverse' : 'row'
                    }}>
                      {!isSentByMe && (
                        <img 
                          src={activeConv.participantAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces'}
                          alt={activeConv.participantName}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginTop: '2px',
                            flexShrink: 0
                          }}
                        />
                      )}

                      {/* Bubble */}
                      <div style={{
                        backgroundColor: isSentByMe ? '#114B3E' : '#F3F4F6',
                        color: isSentByMe ? '#FFFFFF' : '#111827',
                        borderRadius: '18px',
                        padding: '14px 20px',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        wordBreak: 'break-word',
                        boxShadow: isSentByMe ? '0 2px 6px rgba(17, 75, 62, 0.15)' : 'none'
                      }}>
                        {msg.text}
                      </div>
                    </div>

                    {/* Timestamp */}
                    <span style={{
                      fontSize: '11px',
                      color: '#9CA3AF',
                      marginTop: '6px',
                      marginLeft: isSentByMe ? '0' : '44px',
                      marginRight: isSentByMe ? '4px' : '0'
                    }}>
                      {msg.timestamp || 'Sat 5:10 AM'}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Input Dock Bar matching Figma Image 2 */}
            <div style={{
              borderTop: '1px solid #F1F5F9',
              padding: '16px 28px',
              backgroundColor: '#FFFFFF',
              flexShrink: 0
            }}>
              <form 
                onSubmit={handleSend}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%'
                }}
              >
                {/* Left Attachment Icons: Image + GIF */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    aria-label="Attach media"
                    onClick={() => alert('Media attachment ready: upload images or files directly in this chat.')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9CA3AF',
                      padding: '4px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#114B3E'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                  >
                    <ImageIcon size={20} />
                  </button>

                  <button
                    type="button"
                    aria-label="Add GIF"
                    onClick={() => alert('GIF library: choose from popular reaction GIFs.')}
                    style={{
                      background: 'none',
                      border: '1.5px solid #9CA3AF',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: '#9CA3AF',
                      padding: '1px 5px',
                      fontSize: '11px',
                      fontWeight: '800',
                      lineHeight: '1.1',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#114B3E';
                      e.currentTarget.style.color = '#114B3E';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#9CA3AF';
                      e.currentTarget.style.color = '#9CA3AF';
                    }}
                  >
                    GIF
                  </button>
                </div>

                {/* Text Input */}
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Start a new message"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      fontSize: '14px',
                      color: '#111827',
                      backgroundColor: 'transparent',
                      padding: '6px 0'
                    }}
                  />
                </div>

                {/* Right Action Icons: Emoji + Send */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    aria-label="Insert Emoji"
                    onClick={() => setInputText(prev => prev + ' 💙')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9CA3AF',
                      padding: '4px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#114B3E'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                  >
                    <Smile size={20} />
                  </button>

                  <button
                    type="submit"
                    aria-label="Send Message"
                    disabled={!inputText.trim()}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: inputText.trim() ? 'pointer' : 'default',
                      color: inputText.trim() ? '#114B3E' : '#CBD5E1',
                      padding: '4px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.15s ease, transform 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (inputText.trim()) e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <Send size={19} />
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </main>

      {/* ────────────────────────────────────────────────────────────────
          RECRUITER RATING MODAL (preserved with transitions-dev IconSwap)
         ──────────────────────────────────────────────────────────────── */}
      <Modal
        isOpen={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        title="Rate Candidate Credibility"
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
                    style={{ cursor: 'pointer', padding: '4px', background: 'none', border: 'none' }}
                  >
                    <IconSwap 
                      state={star <= ratingStars} 
                      iconA={<Star size={28} fill="#F59E0B" color="#F59E0B" />} 
                      iconB={<Star size={28} fill="none" color="#CBD5E1" />} 
                    />
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#114B3E' }}>
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
                  fontSize: '0.88rem',
                  background: 'none',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#114B3E',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Submit Rating
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .chat-sidebar.mobile-hidden {
            display: none !important;
          }
          .chat-main-area.mobile-hidden {
            display: none !important;
          }
          .mobile-back-btn {
            display: inline-flex !important;
          }
          .chat-sidebar {
            width: 100% !important;
            border-right: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatMainPage;