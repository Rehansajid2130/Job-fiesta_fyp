import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  ArrowLeft, 
  Image as ImageIcon, 
  Smile, 
  Star,
  Search,
  X,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const ChatActiveArea = ({
  activeConv,
  onBack,
  isRecruiter,
  canRate,
  onOpenRatingModal,
  inputText,
  setInputText,
  onSend,
  messagesEndRef
}) => {
  const navigate = useNavigate();
  const [chatSearchOpen, setChatSearchOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState('');
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const messageRefs = useRef({});

  // Compute matching messages
  const matchingMessages = (activeConv.messages || []).filter(m => 
    chatQuery.trim() && m.text?.toLowerCase().includes(chatQuery.trim().toLowerCase())
  );

  // Jump to match when match index changes
  useEffect(() => {
    if (matchingMessages.length > 0 && matchingMessages[currentMatchIndex]) {
      const targetId = matchingMessages[currentMatchIndex].id;
      const el = messageRefs.current[targetId];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentMatchIndex, matchingMessages]);

  const handleNextMatch = () => {
    if (matchingMessages.length === 0) return;
    setCurrentMatchIndex((prev) => (prev + 1) % matchingMessages.length);
  };

  const handlePrevMatch = () => {
    if (matchingMessages.length === 0) return;
    setCurrentMatchIndex((prev) => (prev - 1 + matchingMessages.length) % matchingMessages.length);
  };

  const handleProfileClick = () => {
    if (activeConv.candidateId && activeConv.candidateId !== 'current-user') {
      navigate(`/profile/${activeConv.candidateId}`);
    } else if (activeConv.company) {
      navigate('/companies');
    } else {
      navigate('/profile/furqan12');
    }
  };

  // Helper to render text with highlighted search query
  const renderMessageText = (text, msgId) => {
    if (!chatQuery.trim()) return text;
    const query = chatQuery.trim();
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    const isCurrentActiveMatch = matchingMessages[currentMatchIndex]?.id === msgId;

    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark
          key={i}
          style={{
            backgroundColor: isCurrentActiveMatch ? '#FDE047' : '#FEF08A',
            color: '#1E293B',
            padding: '1px 3px',
            borderRadius: '3px',
            fontWeight: '600'
          }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <>
      {/* Top Chat Header */}
      <div style={{
        height: '68px',
        padding: '0 24px',
        borderBottom: '1px solid #F1F5F9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        flexShrink: 0
      }}>
        {/* Interactive Profile Area */}
        <div 
          onClick={handleProfileClick}
          title={`Click to view profile for ${activeConv.participantName}`}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '10px',
            transition: 'background-color 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          {/* Mobile Back Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
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

          <div style={{ position: 'relative' }}>
            <img 
              src={activeConv.participantAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces'}
              alt={activeConv.participantName}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <span style={{
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              width: '10px',
              height: '10px',
              backgroundColor: '#10B981',
              borderRadius: '50%',
              border: '2px solid #FFFFFF'
            }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: '15px',
              fontWeight: '700',
              color: '#111827',
              lineHeight: 1.2
            }}>
              {activeConv.participantName}
            </span>
            <span style={{
              fontSize: '12px',
              color: '#64748B',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>{activeConv.participantRole || activeConv.company || 'Hiring Team'}</span>
              <span>•</span>
              <span style={{ color: '#10B981', fontWeight: '600' }}>Active now</span>
            </span>
          </div>
        </div>

        {/* Right Header Actions: In-chat search, rating action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Toggle in-chat search button */}
          <button
            type="button"
            onClick={() => {
              setChatSearchOpen(!chatSearchOpen);
              if (chatSearchOpen) setChatQuery('');
            }}
            title="Search inside this chat"
            aria-label="Search conversation"
            style={{
              background: chatSearchOpen ? '#E6F4EA' : 'none',
              border: chatSearchOpen ? '1px solid #10B981' : '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '6px 10px',
              cursor: 'pointer',
              color: chatSearchOpen ? '#0C463B' : '#64748B',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: '600',
              transition: 'all 0.15s ease'
            }}
          >
            <Search size={15} />
            <span className="search-btn-label">Search</span>
          </button>

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
              onClick={onOpenRatingModal}
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

      {/* In-Chat Search Bar Drawer */}
      {chatSearchOpen && (
        <div style={{
          padding: '10px 24px',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search 
              size={15} 
              color="#94A3B8" 
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input 
              type="text"
              placeholder="Search words in this chat..."
              value={chatQuery}
              onChange={(e) => {
                setChatQuery(e.target.value);
                setCurrentMatchIndex(0);
              }}
              autoFocus
              style={{
                width: '100%',
                padding: '7px 30px 7px 32px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                color: '#1E293B'
              }}
            />
            {chatQuery && (
              <button 
                type="button" 
                onClick={() => setChatQuery('')} 
                style={{ 
                  position: 'absolute', 
                  right: '8px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: '#94A3B8',
                  padding: '2px'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {chatQuery.trim() && (
            <span style={{ fontSize: '12px', color: '#475569', fontWeight: '600', whiteSpace: 'nowrap' }}>
              {matchingMessages.length > 0 
                ? `${currentMatchIndex + 1} of ${matchingMessages.length} matches` 
                : 'No matches found'}
            </span>
          )}

          {matchingMessages.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                type="button"
                onClick={handlePrevMatch}
                title="Previous match"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#475569'
                }}
              >
                <ChevronUp size={15} />
              </button>
              <button
                type="button"
                onClick={handleNextMatch}
                title="Next match"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#475569'
                }}
              >
                <ChevronDown size={15} />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setChatSearchOpen(false);
              setChatQuery('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748B',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              padding: '6px 10px',
              borderRadius: '6px',
              marginLeft: 'auto'
            }}
          >
            Close
          </button>
        </div>
      )}

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
              ref={(el) => {
                if (el) messageRefs.current[msg.id] = el;
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isSentByMe ? 'flex-end' : 'flex-start',
                width: '100%',
                padding: '4px 8px',
                borderRadius: '12px',
                backgroundColor: matchingMessages[currentMatchIndex]?.id === msg.id ? 'rgba(254, 240, 138, 0.25)' : 'transparent',
                transition: 'background-color 0.2s ease'
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
                  boxShadow: isSentByMe ? '0 2px 6px rgba(17, 75, 62, 0.15)' : 'none',
                  border: matchingMessages[currentMatchIndex]?.id === msg.id ? '2px solid #F59E0B' : 'none'
                }}>
                  {renderMessageText(msg.text, msg.id)}
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
          onSubmit={onSend}
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
  );
};

export default ChatActiveArea;
