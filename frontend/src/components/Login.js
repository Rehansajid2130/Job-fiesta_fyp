import React, { useState } from 'react';
  import { useAuth } from '../context/AuthContext';
  import { useNavigate } from 'react-router-dom';

  const Login = () => {
    const [email, setEmail] = useState('alice.jobseeker@example.com');
    const [password, setPassword] = useState('Password123');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      const success = await login(email, password);
      if (success) navigate('/chat');
    };

    return (
      <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
        </form>
      </div>
    );
  };

  export default Login;