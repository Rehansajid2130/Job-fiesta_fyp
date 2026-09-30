import React from 'react';
import { ArrowRight } from 'lucide-react';

const QuestionsStepTwo = ({
  formData,
  handleChange,
  onBack,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#0D473B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Step 2 of 3: Details
        </span>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>
          {formData.role === 'jobseeker' ? 'Location & Salary Expectations' : 'Company & Organization Details'}
        </h3>
      </div>

      {formData.role === 'jobseeker' ? (
        <>
          {/* Question 1: Location */}
          <div style={{ marginBottom: '22px' }}>
            <label className="figma-label">Location / City*</label>
            <input
              type="text"
              className="figma-input"
              placeholder="e.g. Lahore, PK or San Francisco, CA (Remote)"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>

          {/* Question 2: Desired Salary */}
          <div style={{ marginBottom: '22px' }}>
            <label className="figma-label">Desired Salary Range*</label>
            <input
              type="text"
              className="figma-input"
              placeholder="e.g. 50k - 80k PKR / $120k - $150k"
              value={formData.desiredSalary}
              onChange={(e) => handleChange('desiredSalary', e.target.value)}
            />
          </div>

          {/* Question 3: Experience Level */}
          <div style={{ marginBottom: '26px' }}>
            <label className="figma-label">Experience Level*</label>
            <select
              className="figma-input"
              value={formData.experienceLevel}
              onChange={(e) => handleChange('experienceLevel', e.target.value)}
            >
              <option value="Beginner Level">Beginner Level (0-2 Yrs)</option>
              <option value="Mid-Level">Mid-Level (3-5 Yrs)</option>
              <option value="Advanced Level">Advanced / Senior (5+ Yrs)</option>
            </select>
          </div>
        </>
      ) : (
        <>
          {/* Question 1: Company Name */}
          <div style={{ marginBottom: '22px' }}>
            <label className="figma-label">Company Name*</label>
            <input
              type="text"
              className="figma-input"
              placeholder="e.g. Nexus Innovations"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
            />
          </div>

          {/* Question 2: Company Website */}
          <div style={{ marginBottom: '22px' }}>
            <label className="figma-label">Company Website*</label>
            <input
              type="text"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              id="companyWebsite"
              name="companyWebsite"
              className="figma-input"
              placeholder="e.g. company.com or https://company.com"
              value={formData.companyWebsite}
              onChange={(e) => handleChange('companyWebsite', e.target.value)}
            />
          </div>

          {/* Question 3: Company Address */}
          <div style={{ marginBottom: '26px' }}>
            <label className="figma-label">Company Address / Headquarters*</label>
            <input
              type="text"
              className="figma-input"
              placeholder="e.g. Silicon Valley, CA / Gulberg, Lahore"
              value={formData.companyAddress}
              onChange={(e) => handleChange('companyAddress', e.target.value)}
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
          Back
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
          <span>Next: Qualifications & Goals</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
};

export default QuestionsStepTwo;
