import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatEmptyState from '../components/chat/ChatEmptyState';
import ChatActiveArea from '../components/chat/ChatActiveArea';
import ChatRatingModal from '../components/chat/ChatRatingModal';

const ChatMainPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { conversations, sendMessage, rateJobseeker, startOrGetConversation } = useJobs();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Selected conversation ID (null displays the empty state from Figma Image 1)
  const [activeConvId, setActiveConvId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  // Directly open or start chat with candidate if triggered from Dashboard, ATS, Profile, or URL query
  useEffect(() => {
    const paramConvId = searchParams.get('convId') || searchParams.get('id');
    const paramCandId = searchParams.get('candidateId');
    const paramName = searchParams.get('name') || searchParams.get('candidateName');
    const paramRole = searchParams.get('role');
    const paramAvatar = searchParams.get('avatar');
    const paramCompany = searchParams.get('company');
    const stateCandidate = location.state?.candidate;

    if (paramConvId) {
      const match = conversations.find(c => c.id === paramConvId);
      if (match) {
        setActiveConvId(match.id);
        return;
      }
    }

    if (stateCandidate) {
      if (startOrGetConversation) {
        const convId = startOrGetConversation(stateCandidate);
        if (convId) {
          setActiveConvId(convId);
        }
      }
      return;
    }

    if (paramCandId || paramName) {
      const candidateInfo = {
        id: paramCandId,
        name: paramName,
        role: paramRole,
        avatar: paramAvatar,
        company: paramCompany
      };
      if (startOrGetConversation) {
        const convId = startOrGetConversation(candidateInfo);
        if (convId) {
          setActiveConvId(convId);
        }
      }
    }
  }, [location.state, searchParams, conversations, startOrGetConversation]);

  // Rating Modal state (for recruiter rating flow)
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [ratingStars, setRatingStars] = useState(5);
  const [reviewNote, setReviewNote] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

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
      } else if (activeConv?.participantName) {
        autoReplyText = `Hi! Thanks for your message regarding the ${activeConv.participantRole || 'role'}. I'm reviewing everything and will follow up with you promptly.`;
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

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* 1. LEFT SIDEBAR: Header, Search & Conversations List */}
      <ChatSidebar
        conversations={conversations}
        activeConvId={activeConvId}
        setActiveConvId={setActiveConvId}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        logout={logout}
      />

      {/* 2. RIGHT MAIN AREA: Empty State (Image 1) OR Active Chat (Image 2) */}
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
          <ChatEmptyState
            onNewMessage={() => {
              if (conversations.length > 0) {
                setActiveConvId(conversations[0].id);
              }
            }}
          />
        ) : (
          <ChatActiveArea
            activeConv={activeConv}
            onBack={() => setActiveConvId(null)}
            isRecruiter={isRecruiter}
            canRate={canRate}
            onOpenRatingModal={() => setRatingModalOpen(true)}
            inputText={inputText}
            setInputText={setInputText}
            onSend={handleSend}
            messagesEndRef={messagesEndRef}
          />
        )}
      </main>

      {/* 3. RECRUITER RATING MODAL */}
      <ChatRatingModal
        isOpen={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        onSubmit={handleRateSubmit}
        ratingStars={ratingStars}
        setRatingStars={setRatingStars}
        reviewNote={reviewNote}
        setReviewNote={setReviewNote}
        ratingSubmitted={ratingSubmitted}
      />

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