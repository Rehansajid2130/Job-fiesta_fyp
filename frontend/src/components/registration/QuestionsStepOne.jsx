import React from 'react';
import { ArrowRight } from 'lucide-react';

const QuestionsStepOne = ({
  formData,
  handleChange,
  onBack,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#0D473B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Step 1 of 3: Essentials
        </span>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>
          {formData.role === 'jobseeker' ? 'What kind of work are you seeking?' : 'Tell us about your recruiting role'}
        </h3>
      </div>

      {formData.role === 'jobseeker' ? (
        <>
          {/* Question 1: Job Title */}
          <div style={{ marginBottom: '22px' }}>
            <label className="figma-label">Target Job Title*</label>
            <input
              type="text"
              className="figma-input"
              placeholder="e.g. Senior Frontend Engineer, UX Designer"
              value={formData.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
            />
          </div>

          {/* Question 2: Job Type */}
          <div style={{ marginBottom: '22px' }}>
            <label className="figma-label">Preferred Job Type*</label>
            <select
              className="figma-input"
              value={formData.jobType}
              onChange={(e) => handleChange('jobType', e.target.value)}
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Question 3: Preferred Industry */}
          <div style={{ marginBottom: '26px' }}>
            <label className="figma-label">Preferred Industry*</label>
            <select
              className="figma-input"
              value={formData.preferredIndustry}
              onChange={(e) => handleChange('preferredIndustry', e.target.value)}
            >
              <option value="Technology & Software">Technology & Software</option>
              <option value="Product Design & UX">Product Design & UX</option>
              <option value="Healthcare & Biotech">Healthcare & Biotech</option>
              <option value="Banking & Finance">Banking & Finance</option>
              <option value="Marketing & Content">Marketing & Content</option>
            </select>
          </div>
        </>
      ) : (
        <>
          {/* Recruiter Question 1: Job Title */}
          <div style={{ marginBottom: '22px' }}>
            <label className="figma-label">Your Position / Title*</label>
            <input
              type="text"
              className="figma-input"
              placeholder="e.g. Head of Talent Acquisition, HR Director"
              value={formData.recruiterTitle}
              onChange={(e) => handleChange('recruiterTitle', e.target.value)}
            />
          </div>

          {/* Recruiter Question 2: Experience */}
          <div style={{ marginBottom: '22px' }}>
            <label className="figma-label">Hiring Experience Level*</label>
            <select
              className="figma-input"
              value={formData.hiringExperience}
              onChange={(e) => handleChange('hiringExperience', e.target.value)}
            >
              <option value="1-3 Years">Beginner (1-3 Years)</option>
              <option value="4-7 Years">Mid-Level (4-7 Years)</option>
              <option value="8+ Years Executive">Advanced / Executive (8+ Years)</option>
            </select>
          </div>

          {/* Recruiter Question 3: Language */}
          <div style={{ marginBottom: '26px' }}>
            <label className="figma-label">Preferred Language*</label>
            <input
              type="text"
              className="figma-input"
              placeholder="e.g. English, Urdu, Bilingual"
              value={formData.preferredLanguage}
              onChange={(e) => handleChange('preferredLanguage', e.target.value)}
            />
          </div>
        </>
      )}

      <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            flex: 1,
            height: '48px',
            borderRadius: '8px',
            border: '1px solid #D1D5DB',
            backgroundColor: '#FFFFFF',
            color: '#4B5563',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            flex: 2,
            height: '48px',
            borderRadius: '8px',
            backgroundColor: '#0D473B',
            color: '#FFFFFF',
            fontSize: '15px',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span>Next: Location & Background</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
};

export default QuestionsStepOne;
