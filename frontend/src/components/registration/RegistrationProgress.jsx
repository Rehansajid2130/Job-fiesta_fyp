import React from 'react';
import { User, Briefcase, Sparkles, Check } from 'lucide-react';

const RegistrationProgress = ({ currentStep, progressPercent }) => {
  const steps = [
    { key: 'primary', label: 'Account', icon: User, num: 1 },
    { key: 'questions_step_1', label: 'Essentials', icon: Briefcase, num: 2 },
    { key: 'questions_step_2', label: 'Details', icon: Briefcase, num: 3 },
    { key: 'questions_step_3', label: 'Qualifications', icon: Sparkles, num: 4 },
  ];

  const getStepStatus = (key) => {
    const order = ['primary', 'questions_step_1', 'questions_step_2', 'questions_step_3'];
    const curIdx = order.indexOf(currentStep);
    const itemIdx = order.indexOf(key);
    if (curIdx > itemIdx) return 'completed';
    if (curIdx === itemIdx) return 'active';
    return 'pending';
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Progress Bar Track */}
      <div style={{
        height: '6px',
        backgroundColor: '#E2E8F0',
        borderRadius: '999px',
        overflow: 'hidden',
        marginBottom: '16px'
      }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          backgroundColor: '#0D473B',
          borderRadius: '999px',
          transition: 'width 0.4s ease'
        }} />
      </div>

      {/* Steps Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {steps.map((st) => {
          const status = getStepStatus(st.key);
          const Icon = st.icon;
          const isDone = status === 'completed';
          const isActive = status === 'active';

          return (
            <div 
              key={st.key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                flex: 1
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: isDone ? '#0D473B' : isActive ? '#0D473B' : '#FFFFFF',
                color: isDone || isActive ? '#FFFFFF' : '#94A3B8',
                border: isDone || isActive ? 'none' : '2px solid #CBD5E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: '700',
                transition: 'all 0.2s ease'
              }}>
                {isDone ? <Check size={16} strokeWidth={3} /> : <Icon size={15} />}
              </div>
              <span style={{
                fontSize: '12px',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? '#0D473B' : '#64748B'
              }}>
                {st.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegistrationProgress;
