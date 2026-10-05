import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowLeft, 
  X, 
  MoreHorizontal, 
  User, 
  LayoutDashboard, 
  LogOut 
} from 'lucide-react';

const ChatSidebar = ({
  conversations = [],
  activeConvId,
  setActiveConvId,
  searchQuery,
  setSearchQuery,
  user,
  logout,
  markConversationAsRead
}) => {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

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
  const isRecruiter = user?.userType === 'recruiter';

  return (
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
        
        {/* Logo row: Clean "Job fiesta" */}
        <Link 
          to="/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            textDecoration: 'none', 
            marginBottom: '24px' 
          }}
        >
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

        {/* Navigation & Title: Back button aligned with Messages title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px'
        }}>
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
              padding: '6px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#111827',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ArrowLeft size={20} strokeWidth={2.4} />
          </button>
          <h2 style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#111827',
            margin: 0,
            letterSpacing: '-0.01em',
            lineHeight: 1
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
            const lastMsg = conv.messages && conv.messages.length > 0 ? conv.messages[conv.messages.length - 1] : null;
            const snippet = conv.lastMessage || lastMsg?.text || 'No messages yet';
            const dateDisplay = conv.date || 'Today';
            const hasUnread = Boolean(conv.unread || (conv.unreadCount && conv.unreadCount > 0));
            const q = searchQuery.toLowerCase().trim();
            const matchedMsg = q && conv.messages ? conv.messages.find(m => m.text?.toLowerCase().includes(q)) : null;

            return (
              <div
                key={conv.id}
                onClick={() => {
                  setActiveConvId(conv.id);
                  if (markConversationAsRead) markConversationAsRead(conv.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#F3F4F6' : (hasUnread ? '#F0FDF4' : 'transparent'),
                  borderLeft: hasUnread ? '3px solid #10B981' : (isSelected ? '3px solid #0C463B' : '3px solid transparent'),
                  transition: 'all 0.15s ease',
                  marginBottom: '3px'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected && !hasUnread) e.currentTarget.style.backgroundColor = '#F9FAFB';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected && !hasUnread) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {/* Participant Avatar with online indicator */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img
                    src={conv.participantAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'}
                    alt={conv.participantName}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  {hasUnread && (
                    <span style={{
                      position: 'absolute',
                      top: '-1px',
                      right: '-1px',
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#10B981',
                      borderRadius: '50%',
                      border: '2px solid #FFFFFF'
                    }} />
                  )}
                </div>

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
                      fontWeight: hasUnread ? '800' : '700',
                      color: hasUnread ? '#0C463B' : '#111827',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {conv.participantName}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      color: hasUnread ? '#0C463B' : '#9CA3AF',
                      fontWeight: hasUnread ? '700' : '500',
                      flexShrink: 0
                    }}>
                      {dateDisplay}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    marginTop: '2px'
                  }}>
                    <p style={{
                      fontSize: '12px',
                      fontWeight: hasUnread ? '600' : '400',
                      color: hasUnread ? '#111827' : (isSelected ? '#4B5563' : '#6B7280'),
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1
                    }}>
                      {snippet}
                    </p>

                    {hasUnread && (
                      <span style={{
                        backgroundColor: '#10B981',
                        color: '#FFFFFF',
                        fontSize: '10px',
                        fontWeight: '800',
                        borderRadius: '9999px',
                        minWidth: '18px',
                        height: '18px',
                        padding: '0 5px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {conv.unreadCount || 'New'}
                      </span>
                    )}
                  </div>

                  {/* Show search match snippet inside chat history if found */}
                  {q && matchedMsg && (
                    <div style={{
                      fontSize: '11px',
                      color: '#0D473B',
                      backgroundColor: '#E6F4EA',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      marginTop: '4px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      💬 "{matchedMsg.text.length > 32 ? matchedMsg.text.slice(0, 32) + '...' : matchedMsg.text}"
                    </div>
                  )}
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
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div 
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          title="Click to open menu"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            cursor: 'pointer',
            padding: '4px 6px',
            borderRadius: '8px',
            transition: 'background-color 0.15s ease',
            flex: 1
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img 
              src={currentUserAvatar} 
              alt={currentUserDisplayName}
              style={{
                width: '38px',
                height: '38px',
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
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#111827',
              lineHeight: 1.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {currentUserDisplayName}
            </span>
            <span style={{
              fontSize: '11px',
              color: '#64748B',
              fontWeight: '500'
            }}>
              {isRecruiter ? 'Recruiter' : 'Job Seeker'} • Online
            </span>
          </div>
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

        {/* Dropdown menu for profile */}
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
  );
};

export default ChatSidebar;
