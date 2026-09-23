import React, { useState } from 'react';
import { Star, Eye } from 'lucide-react';

const FigmaApplicationCard = ({ application, onViewApplication, onRate }) => {
  const [userRating, setUserRating] = useState(application.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starValue) => {
    setUserRating(starValue);
    if (onRate) {
      onRate(application.id, starValue);
    }
  };

  const isReviewed = application.status?.toLowerCase().includes('reviewed') && !application.status?.toLowerCase().includes('under');

  return (
    <div
      style={{
        backgroundColor: '#F4FDF6',
        borderRadius: '16px',
        border: '1px solid rgba(12, 70, 59, 0.08)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
        padding: '24px 22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px',
        fontFamily: 'Inter, sans-serif',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 10px 24px rgba(12, 70, 59, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.02)';
      }}
    >
      <div>
        {/* Name Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>
            Name: {application.name}
          </h4>
        </div>

        {/* Applied For & Status Tags */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '4px',
                backgroundColor: '#0C463B',
                color: '#FFFFFF'
              }}
            >
              APPLIED FOR
            </span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
              {application.appliedFor || application.role}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '4px',
                backgroundColor: isReviewed ? '#D1FAE5' : '#FEF3C7',
                color: isReviewed ? '#065F46' : '#92400E'
              }}
            >
              STATUS
            </span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: isReviewed ? '#047857' : '#B45309' }}>
              {application.status}
            </span>
          </div>
        </div>

        {/* Applied date or notice if available */}
        {application.date && (
          <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>
            Submitted: {application.date}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* If reviewed, show interactive rating row */}
        {isReviewed && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px solid rgba(12, 70, 59, 0.08)' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>Rate Candidate:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`Rate ${star} star`}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Star
                    size={18}
                    fill={(hoverRating || userRating) >= star ? '#F59E0B' : 'transparent'}
                    color={(hoverRating || userRating) >= star ? '#F59E0B' : '#D1D5DB'}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => onViewApplication && onViewApplication(application)}
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              color: '#0C463B',
              border: '1px solid rgba(12, 70, 59, 0.25)',
              borderRadius: '9999px',
              padding: '9px 16px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E8F5E9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            <Eye size={15} />
            View Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default FigmaApplicationCard;
