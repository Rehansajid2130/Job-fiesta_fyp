import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { 
  initialJobs, 
  initialApplications, 
  initialConversations, 
  initialCompanies, 
  initialCandidates, 
  initialNotifications 
} from '../data/mockData';

const JobContext = createContext();

export const useJobs = () => useContext(JobContext);

// Security & Privacy: Purge any legacy database collections from localStorage
try {
  [
    'jobfiesta_jobs',
    'jobfiesta_applications',
    'jobfiesta_candidates',
    'jobfiesta_conversations',
    'jobfiesta_notifications',
    'jobfiesta_companies',
    'jobfiesta_saved_jobs'
  ].forEach(k => localStorage.removeItem(k));
} catch (e) {}

export const JobProvider = ({ children }) => {
  // Pure in-memory state: loaded from and synchronized with secure backend API
  const [jobs, setJobs] = useState(initialJobs);
  const [companies, setCompanies] = useState(initialCompanies);
  const [candidates, setCandidates] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [applications, setApplications] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [conversations, setConversations] = useState([]);

  // Global toast state for user feedback
  const [toast, setToast] = useState({ open: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ open: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, open: false }));
    }, 3800);
  };

  const [searchFilters, setSearchFilters] = useState({
    keyword: '',
    location: '',
    category: 'all',
    type: 'all',
    experience: 'all',
    minSalary: 0
  });

  // Sync jobs from backend API
  const fetchLiveJobs = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await axios.get(`${apiUrl}/api/jobs`, { timeout: 3500 });
      if (res.data?.jobs && Array.isArray(res.data.jobs)) {
        const mappedJobs = res.data.jobs.map((job) => ({
          id: job._id,
          _id: job._id,
          title: job.title,
          company: job.company,
          logo: job.companyLogo || 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=faces',
          location: `${job.location} (${job.workplaceType || 'On-site'})`,
          type: job.jobType || 'Full-time',
          category: job.category?.toLowerCase() || 'tech',
          salary: `$${Math.round((job.salaryMin || 100000) / 1000)}k - $${Math.round((job.salaryMax || 140000) / 1000)}k`,
          salaryMin: job.salaryMin || 100000,
          salaryMax: job.salaryMax || 140000,
          experience: job.experienceLevel || 'Mid-level',
          postedDate: 'Recently',
          featured: job.viewsCount > 200,
          tags: job.skills || ['Full-Time'],
          description: job.description || '',
          requirements: job.requirements || [],
          benefits: job.benefits || ['Flexible work hours', 'Health insurance'],
        }));
        setJobs(prev => {
          const backendKeys = new Set(mappedJobs.map(j => `${j.title.toLowerCase()}::${j.company.toLowerCase()}`));
          const remainingInitial = initialJobs.filter(j => !backendKeys.has(`${j.title.toLowerCase()}::${j.company.toLowerCase()}`));
          return [...mappedJobs, ...remainingInitial];
        });
      }
    } catch (err) {
      console.info('Backend API unavailable or error fetching jobs:', err.message);
    }
  };

  // Sync user applications and candidate pipeline based on logged-in role
  const refreshUserData = async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    let userObj = null;
    try {
      if (storedUser) userObj = JSON.parse(storedUser);
    } catch (e) {}

    if (token && !token.startsWith('demo-token')) {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      // If recruiter or employer: fetch candidates ATS pipeline
      if (userObj?.role === 'recruiter' || userObj?.role === 'employer') {
        try {
          const res = await axios.get(`${apiUrl}/api/applications/candidate-pipeline`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const candList = res.data?.data || res.data?.candidates || [];
          if (Array.isArray(candList)) {
            setCandidates(candList);
          }
        } catch (err) {
          console.warn('Candidate pipeline fetch error:', err.message);
        }
      }

      // If jobseeker: fetch personal applications
      if (userObj?.role === 'jobseeker') {
        try {
          const res = await axios.get(`${apiUrl}/api/applications/my`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const rawApps = res.data?.data || res.data?.applications || [];
          if (Array.isArray(rawApps)) {
            setApplications(rawApps.map(app => ({
              id: app._id,
              jobId: app.job?._id || app.job,
              jobTitle: app.job?.title || 'Position',
              company: app.job?.company || 'Company',
              appliedDate: app.createdAt ? new Date(app.createdAt).toISOString().split('T')[0] : 'Today',
              status: app.status === 'applied' ? 'Applied' : (app.status === 'screening' ? 'Screening' : (app.status === 'interviewing' ? 'Interviewing' : app.status)),
              matchScore: app.matchScore || 85,
              coverNote: app.coverLetter || ''
            })));
          }
        } catch (err) {
          console.warn('My applications fetch error:', err.message);
        }
      }
      // Fetch live conversations for current authenticated user
      fetchConversations();
    }
  };

  const fetchConversations = async () => {
    const token = localStorage.getItem('token');
    if (!token || token.startsWith('demo-token')) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await axios.get(`${apiUrl}/api/conversations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const convList = res.data?.data || [];
      if (Array.isArray(convList) && convList.length > 0) {
        setConversations(convList);
      }
    } catch (err) {
      console.warn('Backend conversations fetch error:', err.message);
    }
  };

  const fetchConversationMessages = async (convId) => {
    const token = localStorage.getItem('token');
    if (!token || token.startsWith('demo-token') || !convId || convId.length !== 24) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await axios.get(`${apiUrl}/api/conversations/${convId}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const msgs = res.data?.data || [];
      if (Array.isArray(msgs)) {
        setConversations(prev => prev.map(c => 
          (c.id === convId || c._id === convId) ? { ...c, messages: msgs } : c
        ));
      }
    } catch (err) {
      console.warn('Backend conversation messages fetch error:', err.message);
    }
  };

  useEffect(() => {
    fetchLiveJobs();
    refreshUserData();
    fetchConversations();
  }, []);

  const toggleSaveJob = async (jobId) => {
    setSavedJobIds(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );

    const token = localStorage.getItem('token');
    if (token && !token.startsWith('demo-token') && typeof jobId === 'string' && jobId.length === 24) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        await axios.post(`${apiUrl}/api/jobs/${jobId}/save`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.warn('Backend toggle save job sync:', err.response?.data?.message || err.message);
      }
    }
  };

  const applyToJob = async (jobId, customCoverNote = '') => {
    // 1. Guard against unauthenticated application submission
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    let currentUser = null;
    try {
      if (savedUser) currentUser = JSON.parse(savedUser);
    } catch (e) {}

    if (!currentUser || !token) {
      return { 
        success: false, 
        requireLogin: true, 
        message: 'Please log in to apply for this job.' 
      };
    }

    if (currentUser.userType === 'recruiter') {
      return {
        success: false,
        message: 'Recruiter accounts cannot apply to jobs.'
      };
    }

    const targetJob = jobs.find(j => j.id === jobId || j._id === jobId) || {};
    const alreadyApplied = applications.some(a => a.jobId === jobId || (targetJob._id && a.jobId === targetJob._id));
    if (alreadyApplied) {
      return { success: false, message: 'You have already applied to this position.' };
    }

    let backendApp = null;
    const realJobId = targetJob._id || (typeof jobId === 'string' && jobId.length === 24 ? jobId : null);

    if (token && !token.startsWith('demo-token') && realJobId) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const res = await axios.post(`${apiUrl}/api/applications/${realJobId}`, {
          coverLetter: customCoverNote
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data?.data || res.data?.application) {
          backendApp = res.data?.data || res.data?.application;
        }
      } catch (err) {
        console.warn('Backend application submission:', err.response?.data?.message || err.message);
        return {
          success: false,
          message: err.response?.data?.message || 'Failed to submit application to server.'
        };
      }
    }

    const newApplication = {
      id: backendApp ? backendApp._id : `app-${Date.now()}`,
      jobId: realJobId || jobId,
      jobTitle: targetJob.title || 'Position',
      company: targetJob.company || 'Company',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied',
      matchScore: backendApp?.matchScore || 88,
      coverNote: customCoverNote
    };

    setApplications(prev => [newApplication, ...prev]);

    // Automatically initiate chat for this job application so job seeker and recruiter can chat
    const jobConvId = `conv-job-${realJobId || jobId}`;
    setConversations(prev => {
      const exists = prev.find(c => c.id === jobConvId || c.jobId === (realJobId || jobId));
      if (exists) return prev;
      const initialChatMsg = customCoverNote
        ? `Application submitted for ${targetJob.title || 'the role'}. Note: "${customCoverNote}"`
        : `Hi! I have submitted my application for the ${targetJob.title || 'position'} at ${targetJob.company || 'your company'}. Looking forward to discussing this opportunity!`;
      const newChat = {
        id: jobConvId,
        jobId: realJobId || jobId,
        participantName: targetJob.company || 'Hiring Team',
        participantRole: `${targetJob.title || 'Position'} • Recruiter`,
        participantAvatar: targetJob.logo || 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=faces',
        company: targetJob.company || 'Company',
        date: 'Today',
        lastMessage: initialChatMsg,
        unread: false,
        unreadCount: 0,
        messages: [
          {
            id: Date.now(),
            sender: 'jobseeker',
            text: initialChatMsg,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ],
        rated: false
      };
      return [newChat, ...prev];
    });

    showToast(`Application submitted successfully for ${targetJob.title || 'position'}!`, 'success');
    return { success: true, message: `Application submitted successfully for ${targetJob.title || 'position'}!` };
  };

  const postNewJob = async (newJobData) => {
    const token = localStorage.getItem('token');
    let backendJob = null;

    const payload = {
      title: newJobData.title,
      company: newJobData.company || 'Nexus Innovations',
      companyLogo: newJobData.logo || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=faces',
      location: newJobData.location || 'Remote',
      workplaceType: newJobData.location?.toLowerCase().includes('remote') ? 'Remote' : (newJobData.location?.toLowerCase().includes('hybrid') ? 'Hybrid' : 'On-site'),
      jobType: newJobData.type || 'Full-time',
      experienceLevel: newJobData.experience || 'Mid-level',
      category: newJobData.category || 'Development',
      salaryMin: Number(newJobData.salaryMin) > 1000 ? Number(newJobData.salaryMin) : (Number(newJobData.salaryMin) * 1000 || 100000),
      salaryMax: Number(newJobData.salaryMax) > 1000 ? Number(newJobData.salaryMax) : (Number(newJobData.salaryMax) * 1000 || 140000),
      salaryPeriod: 'year',
      currency: 'USD',
      description: newJobData.description || 'Join our team to build state-of-the-art products.',
      requirements: typeof newJobData.requirements === 'string' ? newJobData.requirements.split('\n').filter(Boolean) : (newJobData.requirements || []),
      benefits: typeof newJobData.benefits === 'string' ? newJobData.benefits.split('\n').filter(Boolean) : (newJobData.benefits || ['Health insurance', 'Flexible PTO']),
      skills: typeof newJobData.tags === 'string' ? newJobData.tags.split(',').map(t => t.trim()).filter(Boolean) : (newJobData.tags || []),
    };

    if (token && !token.startsWith('demo-token')) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const res = await axios.post(`${apiUrl}/api/jobs`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data?.job) {
          backendJob = res.data.job;
        }
      } catch (err) {
        console.warn('Backend post job error:', err.response?.data?.message || err.message);
        throw new Error(err.response?.data?.message || 'Failed to post job listing.');
      }
    }

    const createdId = backendJob ? backendJob._id : `job-${Date.now()}`;
    const newJob = {
      id: createdId,
      _id: createdId,
      title: payload.title,
      company: payload.company,
      location: `${payload.location} (${payload.workplaceType})`,
      type: payload.jobType,
      category: payload.category.toLowerCase(),
      postedDate: 'Just now',
      featured: false,
      salaryMin: payload.salaryMin,
      salaryMax: payload.salaryMax,
      salary: `$${Math.round(payload.salaryMin / 1000)}k - $${Math.round(payload.salaryMax / 1000)}k`,
      logo: payload.companyLogo,
      tags: payload.skills,
      requirements: payload.requirements,
      benefits: payload.benefits,
      description: payload.description
    };

    setJobs(prev => [newJob, ...prev]);
    showToast(`Job listing "${newJob.title}" published!`, 'success');
    return { success: true, job: newJob };
  };

  const updateCandidateStage = async (candId, newStage) => {
    setCandidates(prev => prev.map(c => (c.id === candId || c.applicationId === candId) ? { ...c, stage: newStage } : c));
    const token = localStorage.getItem('token');
    if (token && !token.startsWith('demo-token') && typeof candId === 'string' && candId.length === 24) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        await axios.patch(`${apiUrl}/api/applications/${candId}/stage`, { status: newStage }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showToast(`Candidate stage moved to ${newStage}`, 'info');
      } catch (err) {
        console.warn('Failed to update stage on backend:', err.message);
      }
    }
  };

  const updateApplicationStatus = (appId, newStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
  };

  const sendMessage = async (conversationId, text, sender = 'jobseeker') => {
    const newMessage = {
      id: Date.now(),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    // If message is from someone else, mark unread
    const currentUserRole = localStorage.getItem('userType') || 'jobseeker';
    const isIncoming = sender !== currentUserRole && sender !== 'user';

    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId || conv._id === conversationId) {
        return {
          ...conv,
          lastMessage: text,
          date: 'Just now',
          unread: isIncoming ? true : conv.unread,
          unreadCount: isIncoming ? (conv.unreadCount || 0) + 1 : (conv.unreadCount || 0),
          messages: [...(conv.messages || []), newMessage]
        };
      }
      return conv;
    }));

    // Secure live persistence to backend MongoDB
    const token = localStorage.getItem('token');
    if (token && !token.startsWith('demo-token') && typeof conversationId === 'string' && conversationId.length === 24) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        await axios.post(`${apiUrl}/api/conversations/messages`, {
          conversationId,
          content: text
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.warn('Backend message save error:', err.message);
      }
    }
  };

  const markConversationAsRead = (conversationId) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId || conv._id === conversationId) {
        return {
          ...conv,
          unread: false,
          unreadCount: 0
        };
      }
      return conv;
    }));
  };

  const rateJobseeker = async (conversationId, rating, reviewText) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId || conv._id === conversationId) {
        return {
          ...conv,
          rated: true,
          rating,
          reviewText
        };
      }
      return conv;
    }));

    // Secure live persistence to backend MongoDB
    const token = localStorage.getItem('token');
    if (token && !token.startsWith('demo-token') && typeof conversationId === 'string' && conversationId.length === 24) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        await axios.post(`${apiUrl}/api/conversations/${conversationId}/rate`, {
          rating,
          reviewText
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.warn('Backend rate candidate error:', err.message);
      }
    }
  };

  const startOrGetConversation = (candidateInfo) => {
    if (!candidateInfo) return null;

    const candId = candidateInfo.id || candidateInfo.candidateId;
    const candName = (candidateInfo.name || candidateInfo.candidateName || candidateInfo.fullName || candidateInfo.participantName || '').trim();
    const candRole = candidateInfo.role || candidateInfo.jobTitle || candidateInfo.participantRole || 'Candidate Applicant';
    const candAvatar = candidateInfo.avatar || candidateInfo.participantAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces';
    const companyName = candidateInfo.company || 'Nexus Innovations';

    // 1. Search for existing conversation in memory
    let existing = null;
    if (candId) {
      existing = conversations.find(c => c.candidateId === candId || c.id === `conv-${candId}` || c.participantId === candId);
    }
    if (!existing && candName) {
      existing = conversations.find(c => 
        c.participantName && c.participantName.trim().toLowerCase() === candName.toLowerCase()
      );
    }

    if (existing) {
      return existing.id || existing._id;
    }

    // 2. First time opening chat with this candidate! Create new conversation in memory
    const newConvId = `conv-${candId || Date.now()}`;
    const initialText = candidateInfo.initialMessage || 
      `Hi ${candName || 'there'}, thank you for applying for the ${candRole} role. We've reviewed your profile and would love to connect with you!`;

    const newConv = {
      id: newConvId,
      candidateId: candId || null,
      participantName: candName || 'Candidate Applicant',
      participantRole: candRole,
      participantAvatar: candAvatar,
      company: companyName,
      date: 'Just now',
      lastMessage: initialText,
      messages: [
        {
          id: Date.now(),
          sender: 'recruiter',
          text: initialText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      rated: false
    };

    setConversations(prev => [newConv, ...prev]);
    return newConvId;
  };


  const markNotificationAsRead = (notifId) => {
    setNotifications(prev => prev.map(n => 
      n.id === notifId ? { ...n, unread: false } : n
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('All notifications marked as read', 'info');
  };

  const addNotification = (notifData) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      time: 'Just now',
      unread: true,
      ...notifData
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(newNotif.title, 'info');
  };

  const unreadNotificationsCount = notifications.filter(n => n.unread).length;
  const unreadMessagesCount = conversations.reduce((sum, c) => sum + (c.unreadCount || (c.unread ? 1 : 0)), 0);

  return (
    <JobContext.Provider value={{
      jobs,
      companies,
      candidates,
      updateCandidateStage,
      notifications,
      unreadNotificationsCount,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      addNotification,
      toast,
      showToast,
      applications,
      savedJobIds,
      conversations,
      unreadMessagesCount,
      markConversationAsRead,
      searchFilters,
      setSearchFilters,
      toggleSaveJob,
      applyToJob,
      postNewJob,
      updateApplicationStatus,
      fetchLiveJobs,
      refreshUserData,
      fetchConversations,
      fetchConversationMessages,
      sendMessage,
      rateJobseeker,
      startOrGetConversation
    }}>
      {children}
    </JobContext.Provider>
  );
};

