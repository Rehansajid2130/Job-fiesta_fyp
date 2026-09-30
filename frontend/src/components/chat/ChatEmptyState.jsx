import React from 'react';

const ChatEmptyState = ({ onNewMessage }) => {
  return (
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
        onClick={onNewMessage}
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
  );
};

export default ChatEmptyState;
