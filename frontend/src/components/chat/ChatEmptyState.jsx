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
        margin: '0',
        maxWidth: '440px',
        lineHeight: 1.5
      }}>
        Select a conversation from the list to view messages and chat.
      </p>

      {/* Handdrawn Pencil Sketch Illustration: Conversation & Message Preview */}
      <div style={{ marginTop: '40px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <img 
          src="/assets/searchimages/no-chat-selected.svg" 
          alt="Select a conversation to start messaging"
          style={{
            width: '280px',
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
