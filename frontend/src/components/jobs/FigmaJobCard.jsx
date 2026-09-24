import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bookmark } from 'lucide-react';

const FigmaJobCard = ({ 
  job, 
  onApply, 
  isApplied = false,
  isBookmarked = false,
  onToggleBookmark 
}) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
    if (onToggleBookmark) {
      onToggleBookmark(job.id);
    }
  };

  const isPartTime = job.type?.toLowerCase().includes('part') || job.type === 'Part-Time';
  const applicantsCount = job.applicantsCount || 10;

  return (
    <div 
      style={{
        backgroundColor: '#F2FFF2',
        borderRadius: '16px',
        border: '1px solid rgba(13, 71, 59, 0.04)',
        boxShadow: 'none',
        padding: '24px 22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        fontFamily: 'Inter, sans-serif'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(13, 71, 59, 0.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div>
        {/* Top Title & Bookmark */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
          <h4 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#111827',
            margin: 0,
            lineHeight: 1.3
          }}>
            {job.title}
          </h4>
          <button
            type="button"
            onClick={handleBookmarkClick}
            aria-label="Bookmark Job"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              color: bookmarked ? '#0D473B' : '#9CA3AF',
              flexShrink: 0
            }}
          >
            <Bookmark size={20} fill={bookmarked ? '#0D473B' : 'none'} />
          </button>
        </div>

        {/* Badge & Salary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '18px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            padding: '4px 9px',
            borderRadius: '4px',
            backgroundColor: isPartTime ? '#DCFCE7' : '#F1E0FF',
            color: isPartTime ? '#0D473B' : '#7C3AED'
          }}>
            {job.type || 'Full-Time'}
          </span>
          <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: '500' }}>
            {job.salary ? `Salary: ${job.salary}` : 'Salary: 20,000 INR - 25,000 INR'}
          </span>
        </div>

        {/* Company & Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            flexShrink: 0,
            padding: '6px'
          }}>
            <img 
              src={job.logo || '/assets/images/google_logo.png'} 
              alt={job.company} 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/images/google_logo.png';
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>
              {job.company}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#6B7280' }}>
              <MapPin size={13} color="#9CA3AF" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>

        {/* Applicants Avatar Pile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop"
              alt="Applicant"
              style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #FFFFFF', objectFit: 'cover' }}
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop"
              alt="Applicant"
              style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #FFFFFF', marginLeft: '-8px', objectFit: 'cover' }}
            />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop"
              alt="Applicant"
              style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #FFFFFF', marginLeft: '-8px', objectFit: 'cover' }}
            />
          </div>
          <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>
            {applicantsCount}+ applicants
          </span>
        </div>
      </div>

      {/* Buttons Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <button
          type="button"
          onClick={() => navigate(`/job/${job.id}`)}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#0D473B',
            border: '1.5px solid #0D473B',
            borderRadius: '50px',
            padding: '8px 16px',
            fontSize: '13.5px',
            fontWeight: '600',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0D473B';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.color = '#0D473B';
          }}
        >
          View details
        </button>

        {isApplied ? (
          <button
            type="button"
            disabled
            style={{
              backgroundColor: '#DCFCE7',
              color: '#0D473B',
              border: '1px solid #86EFAC',
              borderRadius: '50px',
              padding: '8px 16px',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'default',
              textAlign: 'center'
            }}
          >
            ✓ Applied
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onApply && onApply(job)}
            style={{
              backgroundColor: '#0D473B',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '50px',
              padding: '8px 16px',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: 'none',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#092F27'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0D473B'}
          >
            Apply now
          </button>
        )}
      </div>
    </div>
  );
};

export default FigmaJobCard;
