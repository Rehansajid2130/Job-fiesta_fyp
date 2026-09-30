import React from 'react';
import { useJobs } from '../../context/JobContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = () => {
  const { toast } = useJobs();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        pointerEvents: toast.open ? 'auto' : 'none'
      }}
    >
      <div
        className={`t-toast ${toast.open ? 'is-open' : ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 20px',
          borderRadius: '12px',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          maxWidth: '420px',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <div style={{ flexShrink: 0 }}>
          {isSuccess && <CheckCircle2 size={20} color="#10B981" />}
          {isError && <AlertCircle size={20} color="#EF4444" />}
          {!isSuccess && !isError && <Info size={20} color="#38BDF8" />}
        </div>

        <div style={{ fontSize: '0.9rem', fontWeight: '500', lineHeight: 1.4 }}>
          {toast.message}
        </div>
      </div>
    </div>
  );
};

export default Toast;
