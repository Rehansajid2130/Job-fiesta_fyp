import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try { return JSON.parse(savedUser); } catch (e) { return null; }
    }
    // Default logged in as demo Job Seeker for instant access
    return {
      id: 'usr-1',
      name: 'Alice Johnson',
      email: 'alice.jobseeker@example.com',
      userType: 'jobseeker',
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces'
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || 'demo-token');

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
      // If backend API URL is available, attempt real request
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await axios.post(`${apiUrl}/api/auth/login`, { email, password }, { timeout: 3000 });
      if (res.data?.token) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        const rawUser = res.data.user || {};
        const userData = {
          ...rawUser,
          userType: rawUser.role === 'employer' ? 'recruiter' : (rawUser.role || roleHint),
          name: rawUser.fullName || rawUser.name || email.split('@')[0],
        };
        setUser(userData);
        return { success: true, user: userData };
      }
    } catch (err) {
      console.warn('Backend server response:', err.response?.data?.message || err.message);
      // If server explicitly responded with an error (e.g. 401 Invalid credentials), return it to the UI
      if (err.response?.data?.message) {
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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
  };

  const switchRole = (newRole) => {
    if (newRole === 'recruiter') {
      setUser({
        id: 'rec-1',
        name: 'Robert Miller',
        email: 'bob.recruiter@example.com',
        userType: 'recruiter',
        company: 'Nexus Innovations',
        location: 'San Francisco, CA',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces'
      });
    } else {
      setUser({
        id: 'usr-1',
        name: 'Alice Johnson',
        email: 'alice.jobseeker@example.com',
        userType: 'jobseeker',
        title: 'Senior Frontend Developer',
        location: 'San Francisco, CA',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces'
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