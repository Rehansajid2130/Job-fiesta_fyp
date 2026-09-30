import React from 'react';
import { 
  Send, 
  ArrowLeft, 
  Image as ImageIcon, 
  Smile, 
  Star 
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
  return (
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
            onClick={onBack}
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
