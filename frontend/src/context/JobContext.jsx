import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { initialJobs, initialApplications, initialConversations } from '../data/mockData';

const JobContext = createContext();

export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('jobfiesta_jobs');
    return saved ? JSON.parse(saved) : initialJobs;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('jobfiesta_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [savedJobIds, setSavedJobIds] = useState(() => {
    const saved = localStorage.getItem('jobfiesta_saved_jobs');
    return saved ? JSON.parse(saved) : ['job-1', 'job-3'];
  });

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('jobfiesta_conversations');
    return saved ? JSON.parse(saved) : initialConversations;
  });

  const [searchFilters, setSearchFilters] = useState({
    keyword: '',
    location: '',
    category: 'all',
    type: 'all',
    experience: 'all',
    minSalary: 0
  });

  useEffect(() => {
    localStorage.setItem('jobfiesta_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('jobfiesta_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('jobfiesta_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('jobfiesta_conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Sync with backend API if running
  useEffect(() => {
    const fetchLiveJobs = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const res = await axios.get(`${apiUrl}/api/jobs`, { timeout: 3000 });
        if (res.data?.jobs && res.data.jobs.length > 0) {
          const mappedJobs = res.data.jobs.map((job) => ({
            id: job._id,
            title: job.title,
            company: job.company,
            logo: job.companyLogo || 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=faces',
            location: `${job.location} (${job.workplaceType})`,
            type: job.jobType,
            category: job.category?.toLowerCase() || 'tech',
            salary: `$${Math.round(job.salaryMin / 1000)}k - $${Math.round(job.salaryMax / 1000)}k`,
            salaryMin: job.salaryMin,
            salaryMax: job.salaryMax,
            experience: job.experienceLevel,
            postedDate: 'Recently',
            featured: job.viewsCount > 200,
            tags: job.skills || ['Full-Time'],
            description: job.description,
            requirements: job.requirements || [],
            benefits: job.benefits || ['Flexible work hours', 'Health insurance'],
          }));
          setJobs(mappedJobs);
        }
      } catch (err) {
        console.info('Using local jobs data (backend offline or loading):', err.message);
      }
    };
    fetchLiveJobs();
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
    const job = jobs.find(j => j.id === jobId) || {};
    const alreadyApplied = applications.some(a => a.jobId === jobId);
    if (alreadyApplied) {
      return { success: false, message: 'You have already applied to this position.' };
    }

    const token = localStorage.getItem('token');
    if (token && !token.startsWith('demo-token') && typeof jobId === 'string' && jobId.length === 24) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        await axios.post(`${apiUrl}/api/applications/${jobId}`, {
          coverLetter: customCoverNote
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.warn('Backend application submission:', err.response?.data?.message || err.message);
      }
    }

    const newApplication = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: job.title || 'Position',
      company: job.company || 'Company',
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Under Review',
      matchScore: Math.floor(Math.random() * 15) + 85,
      coverNote: customCoverNote
    };

    setApplications(prev => [newApplication, ...prev]);
    return { success: true, message: `Application submitted successfully for ${job.title || 'position'}!` };
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
      }
    }

    const newJob = {
      id: backendJob ? backendJob._id : `job-${Date.now()}`,
      postedDate: 'Just now',
      featured: false,
      salaryMin: payload.salaryMin,
      salaryMax: payload.salaryMax,
      salary: `$${Math.round(payload.salaryMin / 1000)}k - $${Math.round(payload.salaryMax / 1000)}k`,
      logo: payload.companyLogo,
      tags: payload.skills,
      requirements: payload.requirements,
      benefits: payload.benefits,
      ...newJobData,
      _id: backendJob ? backendJob._id : undefined
    };

    setJobs(prev => [newJob, ...prev]);
    return { success: true, job: newJob };
  };

  const updateApplicationStatus = (appId, newStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
  };

  const sendMessage = (conversationId, text, sender = 'jobseeker') => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const newMessage = {
          id: Date.now(),
          sender,
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...conv,
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    }));
  };

  const rateJobseeker = (conversationId, rating, reviewText) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          rated: true,
          rating,
          reviewText
        };
      }
      return conv;
    }));
  };

  return (
    <JobContext.Provider value={{
      jobs,
      applications,
      savedJobIds,
      conversations,
      searchFilters,
      setSearchFilters,
      toggleSaveJob,
      applyToJob,
      postNewJob,
      updateApplicationStatus,
      sendMessage,
      rateJobseeker
    }}>
      {children}
    </JobContext.Provider>
  );
};
