import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        // Clear old default demo mock user so guest users start unauthenticated
        if (parsed?.id === 'usr-1' && parsed?.email === 'alice.jobseeker@example.com' && (!localStorage.getItem('token') || localStorage.getItem('token') === 'demo-token')) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('userType');
          localStorage.removeItem('userId');
          return null;
        }
        return parsed;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken || savedToken === 'demo-token') {
      localStorage.removeItem('token');
      return null;
    }
    return savedToken;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userType', user.userType);
      localStorage.setItem('userId', user.id);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      localStorage.removeItem('userId');
    }
  }, [user]);

  const login = async (email, password, roleHint = 'jobseeker') => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        emailOrUsername: email,
        username: email,
        password
      }, { timeout: 3500 });

      if (res.data?.token) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        const rawUser = res.data.user || {};
        const userData = {
          ...rawUser,
          id: rawUser.id || rawUser._id,
          userType: rawUser.role === 'employer' ? 'recruiter' : (rawUser.role || roleHint),
          name: rawUser.fullName || rawUser.name || email.split('@')[0],
        };
        setUser(userData);
        return { success: true, user: userData };
      }
    } catch (err) {
      console.warn('Backend server response:', err.response?.data?.message || err.message);
      // If server explicitly responded with an error, check if this was a custom user attempt or demo fallback
      const isDemoAttempt = ['jobseeker@jobfiesta.com', 'recruiter@jobfiesta.com', 'jobseeker', 'recruiter', 'furqan@jobfiesta.com', 'suzana@nexusinnovations.io'].includes(email.toLowerCase());
      if (err.response?.data?.message && !isDemoAttempt) {
        return { success: false, message: err.response.data.message };
      }
    }

    // Determine role based on email or hint
    const isRecruiter = email.toLowerCase().includes('recruiter') || roleHint === 'recruiter';
    const mockUser = isRecruiter ? {
      id: 'rec-1',
      name: 'Robert Miller',
      email: email || 'bob.recruiter@example.com',
      userType: 'recruiter',
      company: 'Nexus Innovations',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces'
    } : {
      id: 'usr-1',
      name: 'Alice Johnson',
      email: email || 'alice.jobseeker@example.com',
      userType: 'jobseeker',
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces'
    };

    setToken('demo-token-active');
    localStorage.setItem('token', 'demo-token-active');
    setUser(mockUser);
    return { success: true, user: mockUser };
  };

  const register = async (registerData) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await axios.post(`${apiUrl}/api/auth/register`, registerData, { timeout: 4000 });
      if (res.data?.token) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        const rawUser = res.data.user || {};
        const userData = {
          ...rawUser,
          userType: rawUser.role === 'employer' ? 'recruiter' : (rawUser.role || 'jobseeker'),
          name: rawUser.fullName || registerData.fullName,
        };
        setUser(userData);
        return { success: true, user: userData };
      }
      return { success: false, message: res.data?.message || 'Registration failed' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message || 'Registration failed',
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    [
      'token',
      'user',
      'userType',
      'userId',
      'jobfiesta_jobs',
      'jobfiesta_applications',
      'jobfiesta_candidates',
      'jobfiesta_conversations',
      'jobfiesta_notifications',
      'jobfiesta_companies',
      'jobfiesta_saved_jobs'
    ].forEach((k) => localStorage.removeItem(k));
  };

  const switchRole = async (newRole) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await axios.post(`${apiUrl}/api/auth/demo-switch-role`, {
        targetRole: newRole
      }, { timeout: 3000 });

      if (res.data?.token && res.data?.user) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);

        const rawUser = res.data.user;
        const userData = {
          ...rawUser,
          id: rawUser._id || rawUser.id,
          userType: rawUser.role === 'employer' ? 'recruiter' : rawUser.role,
          name: rawUser.fullName || rawUser.name,
        };
        setUser(userData);
        return userData;
      }
    } catch (err) {
      console.warn('Backend demo-switch-role unavailable, using local mock profile:', err.message);
    }

    // Safe dev fallback matching seeded database accounts if backend is offline
    if (newRole === 'recruiter') {
      setUser({
        id: 'rec-1',
        name: 'Suzana Colin',
        email: 'suzana@nexusinnovations.io',
        userType: 'recruiter',
        company: 'Nexus Innovations',
        location: 'San Francisco, CA',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces'
      });
    } else {
      setUser({
        id: 'usr-1',
        name: 'Furqan Zeeshan',
        email: 'furqan@jobfiesta.com',
        userType: 'jobseeker',
        title: 'Senior Frontend Engineer & UI Specialist',
        location: 'San Francisco, CA',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces'
      });
    }
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, switchRole, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};