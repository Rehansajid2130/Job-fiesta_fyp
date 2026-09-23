import React from 'react';

const LoginButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: "rgba(12, 70, 59, 1.00)",
        borderRadius: "8px",
        height: "68px",
        width: "100%",
        border: "none",
        cursor: "pointer",
        fontFamily: "Poppins",
        fontSize: "23.29px",
        fontWeight: "700",
        color: "white",
      }}
    >
      Login
    </button>
  );
};

export default LoginButton;
