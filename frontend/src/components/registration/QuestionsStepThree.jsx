import React from 'react';
import { UploadCloud, Check } from 'lucide-react';

const QuestionsStepThree = ({
  formData,
  handleChange,
  onBack,
  onSubmit,
  loading
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#0D473B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Step 3 of 3: Final Polish
        </span>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>
          {formData.role === 'jobseeker' ? 'Education, Photo & Career Goals' : 'Hiring Goals & Team Scope'}
        </h3>
      </div>

      {formData.role === 'jobseeker' ? (
        <>
          {/* Question 1: Education & Institution */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '22px' }}>
            <div>
              <label className="figma-label">Education / Degree*</label>
              <input
                type="text"
                className="figma-input"
                placeholder="e.g. BS Computer Science"
                value={formData.education}
                onChange={(e) => handleChange('education', e.target.value)}
              />
            </div>
            <div>
              <label className="figma-label">Institution / University*</label>
              <input
                type="text"
                className="figma-input"
                placeholder="e.g. FAST, NUST, Stanford"
                value={formData.institution}
                onChange={(e) => handleChange('institution', e.target.value)}
              />
            </div>
          </div>

          {/* Question 2: Upload Photo / Resume */}
          <div style={{ marginBottom: '22px' }}>
            <label className="figma-label">Upload Profile Photo / Resume</label>
            <label style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #CBD5E1',
              borderRadius: '12px',
              padding: '24px',
              backgroundColor: '#F8FAFC',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease'
            }}>
              <UploadCloud size={32} color="#0D473B" style={{ marginBottom: '8px' }} />
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>
                {formData.photoName || 'Click or drop file to upload photo'}
              </span>
              <span style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                PNG, JPG, or PDF (Max 5MB)
              </span>
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleChange('photoName', e.target.files[0].name);
                  }
                }}
              />
            </label>
          </div>

          {/* Question 3: Career Goals */}
          <div style={{ marginBottom: '26px' }}>
            <label className="figma-label">Career Goals & Bio*</label>
            <textarea
              rows={3}
              className="figma-input"
              style={{ height: 'auto', padding: '12px 16px', resize: 'vertical' }}
              placeholder="Describe what you are looking to achieve in your next role..."
              value={formData.careerGoals}
              onChange={(e) => handleChange('careerGoals', e.target.value)}
            />
          </div>
        </>
      ) : (
        <>
          {/* Question 1: Team Size */}
          <div style={{ marginBottom: '22px' }}>
            <label className="figma-label">Current Company Size*</label>
            <select
              className="figma-input"
              value={formData.teamSize}
              onChange={(e) => handleChange('teamSize', e.target.value)}
            >
              <option value="1-10 employees">Startup (1-10 employees)</option>
              <option value="10-50 employees">Growing Team (10-50 employees)</option>
              <option value="50-250 employees">Medium Enterprise (50-250 employees)</option>
              <option value="250+ employees">Large Scale (250+ employees)</option>
            </select>
          </div>

          {/* Question 2: Company Goals */}
          <div style={{ marginBottom: '26px' }}>
            <label className="figma-label">Company Hiring Goals & Mission*</label>
            <textarea
              rows={4}
              className="figma-input"
              style={{ height: 'auto', padding: '12px 16px', resize: 'vertical' }}
              placeholder="Describe your company's mission and what qualities you look for in candidates..."
              value={formData.companyGoals}
              onChange={(e) => handleChange('companyGoals', e.target.value)}
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
          disabled={loading}
          style={{
            flex: 2,
            height: '48px',
            borderRadius: '8px',
            backgroundColor: '#0D473B',
            color: '#FFFFFF',
            fontSize: '15px',
            fontWeight: '700',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span>{loading ? 'Creating Profile...' : 'Complete & Sign Up'}</span>
          <Check size={18} />
        </button>
      </div>
    </form>
  );
};

export default QuestionsStepThree;
