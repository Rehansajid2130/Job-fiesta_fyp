import React, { useState } from 'react';

function PasswordInput({ onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (onChange) {
      onChange(newPassword); // Call parent's onChange with the new password
    }
  };

  return (
    <div
      style={{
        position: "relative",
        borderColor: "#acb2b972",
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "8px",
        height: "68px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        paddingLeft: "30px",
        paddingRight: "60px",
        boxSizing: "border-box",
      }}
    >
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter password"
        value={password}
        onChange={handleChange}
        style={{
          border: "none",
          outline: "none",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontSize: "20px",
          fontWeight: "400",
          lineHeight: "20px",
          width: "100%",
          backgroundColor: "transparent",
          color: "#121224",
        }}
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        style={{
          cursor: "pointer",
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          height: "20px",
          fontFamily: "Poppins",
          fontSize: "20px",
          fontWeight: "400",
          background: "rgba(17, 17, 17, 1.00)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          textFillColor: "transparent",
          WebkitTextFillColor: "transparent",
        }}
      >
        {showPassword ? "Hide" : "Show"}
      </span>
    </div>
  );
}

export default PasswordInput;