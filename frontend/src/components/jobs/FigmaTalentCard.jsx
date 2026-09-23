import React, { useState } from 'react';
import { MapPin, Bookmark } from 'lucide-react';

const FigmaTalentCard = ({ talent, onViewProfile }) => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div style={{
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
        {/* Name & Bookmark */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>
            Name: {talent.name}
          </h4>
          <button
            type="button"
            onClick={() => setBookmarked(!bookmarked)}
            aria-label="Bookmark Candidate"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: bookmarked ? '#0C463B' : '#9CA3AF',
              padding: 0
            }}
          >
            <Bookmark size={20} fill={bookmarked ? '#0C463B' : 'none'} />
          </button>
        </div>

        {/* Skills Tag Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            padding: '3px 8px',
            borderRadius: '4px',
            backgroundColor: '#D1FAE5',
            color: '#065F46'
          }}>
            SKILLS
          </span>
          <span style={{ fontSize: '13.5px', color: '#0C463B', fontWeight: '600' }}>
            {talent.skills}
          </span>
        </div>

        {/* Location Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6B7280', marginBottom: '12px' }}>
          <MapPin size={14} color="#9CA3AF" />
          <span>{talent.location}</span>
        </div>

        {/* Salary Row */}
        <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: '500', marginBottom: '18px' }}>
          Salary: {talent.salary}
        </div>
      </div>

      {/* Button Row */}
      <div style={{ textAlign: 'center' }}>
        <button
          type="button"
          onClick={() => onViewProfile && onViewProfile(talent)}
          style={{
            backgroundColor: '#0C463B',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '50px',
            padding: '10px 36px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(12, 70, 59, 0.2)',
            transition: 'background-color 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#08342c'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0C463B'}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default FigmaTalentCard;
