import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useJobs } from '../../context/JobContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  FileText, 
  CheckCircle2 
} from 'lucide-react';

const ROUND_TYPES = [
  'System Architecture & Technical Deep Dive',
  'Technical Screening & Coding Round',
  'Lead Portfolio Presentation & Critique',
  'Behavioral & Cultural Alignment',
  'Hiring Manager & Executive Final Round'
];

const TIME_PRESETS = [
  '10:00 AM',
  '11:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM'
];

const LOCATION_PRESETS = [
  'Office HQ (On-site)',
  'Main Conference Room',
  'Phone Discussion',
  'Executive Boardroom'
];

const ScheduleInterviewModal = ({ isOpen, onClose, candidate, onScheduled }) => {
  const { scheduleInterview } = useJobs();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('02:00 PM');
  const [duration, setDuration] = useState('45 mins');
  const [roundType, setRoundType] = useState(ROUND_TYPES[0]);
  const [location, setLocation] = useState('Office HQ (On-site)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Default to 2 days from now (YYYY-MM-DD)
      const d = new Date();
      d.setDate(d.getDate() + 2);
      const isoDate = d.toISOString().split('T')[0];
      setDate(isoDate);
      setTime('02:00 PM');
      setDuration('45 mins');
      setRoundType(ROUND_TYPES[0]);
      setLocation('Office HQ (On-site)');
      setNotes(`Please prepare an overview of your recent projects and architecture decisions for the ${candidate?.role || 'open position'}.`);
    }
  }, [isOpen, candidate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !time) return;

    setIsSubmitting(true);

    try {
      const interviewData = {
        candidateId: candidate?.id || candidate?.candidateId || `cand-${Date.now()}`,
        candidateName: candidate?.name || candidate?.candidateName || candidate?.participantName || 'Candidate',
        candidateRole: candidate?.role || candidate?.jobTitle || candidate?.participantRole || 'Applicant',
        candidateAvatar: candidate?.avatar || candidate?.participantAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
        jobTitle: candidate?.role || candidate?.jobTitle || 'Position',
        company: candidate?.company || 'Nexus Innovations',
        interviewer: 'Hiring Committee',
        date,
        time,
        duration,
        roundType,
        location: location || 'Office HQ (On-site)',
        notes,
        conversationId: candidate?.conversationId
      };

      if (scheduleInterview) {
        const scheduled = scheduleInterview(interviewData);
        if (onScheduled) onScheduled(scheduled);
      }

      onClose();
    } catch (err) {
      console.error('Error scheduling interview:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Interview Round"
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Candidate Spotlight Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '14px 18px',
          backgroundColor: '#F0FDF4',
          border: '1px solid #BBF7D0',
          borderRadius: '12px'
        }}>
          <img
            src={candidate?.avatar || candidate?.participantAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'}
            alt={candidate?.name || 'Candidate'}
            style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A' }}>
              {candidate?.name || candidate?.participantName || 'Candidate Applicant'}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#047857', fontWeight: '600' }}>
              Applying for: {candidate?.role || candidate?.jobTitle || candidate?.participantRole || 'Open Position'}
            </div>
          </div>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '20px',
            backgroundColor: '#0C463B',
            color: '#FFFFFF'
          }}>
            Stage: Interviewing
          </span>
        </div>

        {/* Round Type Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
            Interview Round Type
          </label>
          <select
            value={roundType}
            onChange={(e) => setRoundType(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              fontSize: '0.92rem',
              color: '#0F172A',
              outline: 'none'
            }}
          >
            {ROUND_TYPES.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Date, Time & Duration Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '0.88rem',
                outline: 'none',
                color: '#0F172A'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 02:00 PM"
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '0.88rem',
                outline: 'none',
                color: '#0F172A'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                fontSize: '0.88rem',
                outline: 'none',
                color: '#0F172A'
              }}
            >
              <option value="30 mins">30 mins</option>
              <option value="45 mins">45 mins</option>
              <option value="60 mins">60 mins</option>
              <option value="90 mins">90 mins</option>
            </select>
          </div>
        </div>

        {/* Convenient Time Presets */}
        <div>
          <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Quick Time Slots:</span>
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
            {TIME_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setTime(preset)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: time === preset ? '1.5px solid #0C463B' : '1px solid #E2E8F0',
                  backgroundColor: time === preset ? '#EBF8F4' : '#F8FAFC',
                  color: time === preset ? '#0C463B' : '#475569',
                  fontSize: '0.82rem',
                  fontWeight: time === preset ? '700' : '500',
                  cursor: 'pointer'
                }}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Interview Location / Venue */}
        <div>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
            Interview Location / Venue
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            {LOCATION_PRESETS.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setLocation(loc)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: location === loc ? '2px solid #0C463B' : '1px solid #E2E8F0',
                  backgroundColor: location === loc ? '#EBF8F4' : '#FFFFFF',
                  color: location === loc ? '#0C463B' : '#64748B',
                  fontWeight: location === loc ? '700' : '500',
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <MapPin size={13} />
                {loc}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative' }}>
            <MapPin 
              size={16} 
              color="#94A3B8" 
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Nexus Innovation HQ, Floor 4 - Room 402, or Phone call details"
              required
              style={{
                width: '100%',
                padding: '10px 14px 10px 36px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '0.88rem',
                outline: 'none',
                color: '#0F172A',
                backgroundColor: '#FFFFFF'
              }}
            />
          </div>
        </div>

        {/* Preparation Notes / Agenda */}
        <div>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
            Candidate Instructions & Prep Notes
          </label>
          <textarea
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Agenda, expected portfolio samples, or team members attending..."
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '0.88rem',
              color: '#0F172A',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '6px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#64748B',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '10px 22px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#0C463B',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '0.92rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <Calendar size={16} />
            <span>{isSubmitting ? 'Scheduling...' : 'Confirm & Send Invitation'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ScheduleInterviewModal;
