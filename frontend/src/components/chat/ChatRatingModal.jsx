import React from 'react';
import Modal from '../common/Modal';
import IconSwap from '../common/IconSwap';
import { Star, CheckCircle2 } from 'lucide-react';

const ChatRatingModal = ({
  isOpen,
  onClose,
  onSubmit,
  ratingStars,
  setRatingStars,
  reviewNote,
  setReviewNote,
  ratingSubmitted
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
        <form onSubmit={onSubmit}>
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
              onClick={onClose}
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
  );
};

export default ChatRatingModal;
