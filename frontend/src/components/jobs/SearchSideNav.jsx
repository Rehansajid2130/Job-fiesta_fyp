import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchSideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Profile Update', path: '/account-settings' },
    { label: 'Messages', path: '/chat' },
    { label: 'Account Settings', path: '/account-settings' }
  ];

  return (
    <aside style={{
      backgroundColor: '#0C463B',
      borderRadius: '8px',
      minHeight: '650px',
      height: '100%',
      padding: '60px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: '64px',
      color: '#FFFFFF',
      fontFamily: 'Inter, sans-serif'
    }}>
      {navItems.map((item, idx) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => navigate(item.path)}
            style={{
              textAlign: 'left',
              color: '#FFFFFF',
              fontSize: '17px',
              fontWeight: isActive ? '700' : '500',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '8px',
              transition: 'background-color 0.2s ease, opacity 0.2s ease',
              opacity: isActive ? 1 : 0.9,
              letterSpacing: '-0.01em'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.opacity = isActive ? '1' : '0.9';
            }}
          >
            {item.label}
          </button>
        );
      })}
    </aside>
  );
};

export default SearchSideNav;
