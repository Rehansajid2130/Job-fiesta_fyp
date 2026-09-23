import React from 'react';

const Badge = ({ children, variant = 'default', size = 'md' }) => {
  const variantStyles = {
    default: { bg: '#F1F5F9', color: '#475569', border: '#E2E8F0' },
    primary: { bg: '#EBF8F4', color: '#0C463B', border: '#A7F3D0' },
    success: { bg: '#ECFDF5', color: '#065F46', border: '#A7F3D0' },
    warning: { bg: '#FFFBEB', color: '#92400E', border: '#FDE68A' },
    danger: { bg: '#FEF2F2', color: '#991B1B', border: '#FECACA' },
    info: { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' }
  };

  const sizeStyles = {
    sm: { padding: '2px 8px', fontSize: '0.75rem' },
    md: { padding: '4px 10px', fontSize: '0.82rem' },
    lg: { padding: '6px 14px', fontSize: '0.9rem' }
  };

  const style = variantStyles[variant] || variantStyles.default;
  const sizeStyle = sizeStyles[size] || sizeStyles.md;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      borderRadius: '9999px',
      backgroundColor: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
      fontWeight: '600',
      lineHeight: '1',
      whiteSpace: 'nowrap',
      ...sizeStyle
    }}>
      {children}
    </span>
  );
};

export default Badge;
