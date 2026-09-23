import React from 'react';

const EmailInput = ({ value, onChange }) => {
  return (
    <input
      type="email"
      value={value}
      onChange={onChange}
      placeholder="Enter email"
      style={{
        width: '100%',
        padding: '18px 24px',
        border: '1px solid #acb2b972',
        borderRadius: '8px',
        fontFamily: 'Poppins',
        fontSize: '20px',
        outline: 'none',
        backgroundColor: 'transparent',
        color: '#121224',
      }}
    />
  );
};

export default EmailInput;
