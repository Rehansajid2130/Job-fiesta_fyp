import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Play, 
  Server, 
  Database, 
  Cpu, 
  Layers, 
  ChevronDown, 
  ChevronRight, 
  RefreshCw,
  Terminal,
  ShieldCheck,
  Zap
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const SystemStatusPage = () => {
  const [serverHealth, setServerHealth] = useState(null);
  const [testing, setTesting] = useState(false);
  const [expandedTest, setExpandedTest] = useState(null);
  const [testResults, setTestResults] = useState([]);

  // Fetch initial health check
  const fetchHealth = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/health`, { timeout: 3000 });
      setServerHealth(res.data);
    } catch (err) {
      setServerHealth({
        status: 'offline',
        message: 'Could not connect to backend on port 5001',
      });
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const runAllTests = async () => {
    setTesting(true);
    setTestResults([]);

    const tests = [
      {
        id: 'health',
        name: 'System Health & Metrics',
        endpoint: 'GET /api/health',
        run: async () => {
          const res = await axios.get(`${API_BASE}/api/health`);
          return { data: res.data, status: res.status };
        },
      },
      {
        id: 'auth',
        name: 'Recruiter Auth & JWT Issuance',
        endpoint: 'POST /api/auth/login',
        run: async () => {
          const res = await axios.post(`${API_BASE}/api/auth/login`, {
            email: 'suzana@nexusinnovations.io',
            password: 'password123',
          });
          sessionStorage.setItem('test_token', res.data.token);
          return { data: { token: '***JWT_TOKEN_RECEIVED***', user: res.data.user }, status: res.status };
        },
      },
      {
        id: 'companies',
        name: 'Companies Directory & Job Counts',
        endpoint: 'GET /api/companies',
        run: async () => {
          const res = await axios.get(`${API_BASE}/api/companies`);
          return { data: res.data, status: res.status };
        },
      },
      {
        id: 'company-slug',
        name: 'Company Detail & Populated Jobs',
        endpoint: 'GET /api/companies/nexus-innovations',
        run: async () => {
          const res = await axios.get(`${API_BASE}/api/companies/nexus-innovations`);
          return { data: res.data, status: res.status };
        },
      },
      {
        id: 'jobs',
        name: 'Active Jobs Search & Query',
        endpoint: 'GET /api/jobs',
        run: async () => {
          const res = await axios.get(`${API_BASE}/api/jobs`);
          if (res.data.jobs?.length > 0) {
            sessionStorage.setItem('test_job_id', res.data.jobs[0]._id);
          }
          return { data: { count: res.data.jobs?.length, sample: res.data.jobs?.[0] }, status: res.status };
        },
      },
      {
        id: 'ai-ats-matcher',
        name: 'AI ATS Resume Keyword Matcher',
        endpoint: 'POST /api/jobs/:id/match-resume',
        run: async () => {
          const jobId = sessionStorage.getItem('test_job_id');
          if (!jobId) throw new Error('No job ID available');
          const res = await axios.post(`${API_BASE}/api/jobs/${jobId}/match-resume`, {
            resumeText: 'Senior React TypeScript Developer with experience in Vite, REST APIs, and UI architecture.',
            skills: ['React', 'TypeScript', 'Vite'],
          });
          return { data: res.data, status: res.status };
        },
      },
      {
        id: 'candidate-pipeline',
        name: 'Recruiter ATS Kanban Pipeline',
        endpoint: 'GET /api/applications/candidate-pipeline',
        run: async () => {
          const token = sessionStorage.getItem('test_token');
          const res = await axios.get(`${API_BASE}/api/applications/candidate-pipeline`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.data?.length > 0) {
            sessionStorage.setItem('test_app_id', res.data.data[0].applicationId);
          }
          return { data: res.data, status: res.status };
        },
      },
      {
        id: 'stage-transition',
        name: 'ATS Kanban Stage Transition',
        endpoint: 'PATCH /api/applications/:id/stage',
        run: async () => {
          const token = sessionStorage.getItem('test_token');
          const appId = sessionStorage.getItem('test_app_id');
          if (!appId) throw new Error('No application ID available');
          const res = await axios.patch(
            `${API_BASE}/api/applications/${appId}/stage`,
            { stage: 'interviewing', notes: 'Automated test suite stage verification.' },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          return { data: res.data, status: res.status };
        },
      },
      {
        id: 'conversations',
        name: 'Persistent Chat Threads (Inbox)',
        endpoint: 'GET /api/conversations',
        run: async () => {
          const token = sessionStorage.getItem('test_token');
          const res = await axios.get(`${API_BASE}/api/conversations`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.data?.length > 0) {
            sessionStorage.setItem('test_conv_id', res.data.data[0].id);
          }
          return { data: res.data, status: res.status };
        },
      },
      {
        id: 'messages',
        name: 'Conversation Message History',
        endpoint: 'GET /api/conversations/:id/messages',
        run: async () => {
          const token = sessionStorage.getItem('test_token');
          const convId = sessionStorage.getItem('test_conv_id');
          if (!convId) throw new Error('No conversation ID available');
          const res = await axios.get(`${API_BASE}/api/conversations/${convId}/messages`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return { data: res.data, status: res.status };
        },
      },
      {
        id: 'notifications',
        name: 'Notification Center & Unread Count',
        endpoint: 'GET /api/notifications',
        run: async () => {
          const token = sessionStorage.getItem('test_token');
          const res = await axios.get(`${API_BASE}/api/notifications`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return { data: res.data, status: res.status };
        },
      },
      {
        id: 'notif-read-all',
        name: 'Bulk Notification Read Operation',
        endpoint: 'PATCH /api/notifications/read-all',
        run: async () => {
          const token = sessionStorage.getItem('test_token');
          const res = await axios.patch(
            `${API_BASE}/api/notifications/read-all`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          return { data: res.data, status: res.status };
        },
      },
    ];

    const results = [];
    for (const test of tests) {
      const start = performance.now();
      try {
        const response = await test.run();
        const duration = Math.round(performance.now() - start);
        results.push({
          id: test.id,
          name: test.name,
          endpoint: test.endpoint,
          passed: true,
          status: response.status,
          duration,
          response: response.data,
        });
      } catch (err) {
        const duration = Math.round(performance.now() - start);
        results.push({
          id: test.id,
          name: test.name,
          endpoint: test.endpoint,
          passed: false,
          status: err.response?.status || 500,
          duration,
          error: err.response?.data?.message || err.message,
          response: err.response?.data || null,
        });
      }
      setTestResults([...results]);
    }

    setTesting(false);
  };

  const isOnline = serverHealth?.status === 'online';
  const passedCount = testResults.filter((r) => r.passed).length;
  const failedCount = testResults.filter((r) => !r.passed).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Header Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '48px 0 36px' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Engineering & FYP Architecture
              </span>
              <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0F172A', marginTop: '6px' }}>
                System Architecture & API Diagnostics
              </h1>
              <p style={{ fontSize: '0.98rem', color: '#64748B' }}>
                Live verification dashboard executing end-to-end integration tests across all microservices.
              </p>
            </div>

            {/* Run Test Button */}
            <button
              type="button"
              onClick={runAllTests}
              disabled={testing}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 26px',
                borderRadius: '10px',
                backgroundColor: testing ? '#64748B' : '#0C463B',
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: '0.95rem',
                border: 'none',
                cursor: testing ? 'not-allowed' : 'pointer',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {testing ? <RefreshCw size={18} className="animate-spin" /> : <Play size={18} />}
              <span>{testing ? 'Executing Test Suite...' : 'Run All 12 Live API Tests'}</span>
            </button>
          </div>

          {/* Metrics Ribbon */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginTop: '32px',
          }}>
            <div style={{
              padding: '18px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: isOnline ? '#ECFDF5' : '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Server size={22} color={isOnline ? '#10B981' : '#EF4444'} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Express Server</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: isOnline ? '#0C463B' : '#EF4444' }}>
                  {isOnline ? 'Online (Port 5001)' : 'Offline'}
                </div>
              </div>
            </div>

            <div style={{
              padding: '18px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#EBF8F4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Database size={22} color="#0C463B" />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Database Engine</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>
                  MongoDB (localhost)
                </div>
              </div>
            </div>

            <div style={{
              padding: '18px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Zap size={22} color="#3B82F6" />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Socket.io Engine</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>
                  Persistent WebSocket
                </div>
              </div>
            </div>

            <div style={{
              padding: '18px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#F5F3FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ShieldCheck size={22} color="#8B5CF6" />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Test Status</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>
                  {testResults.length === 0 ? 'Ready to test' : `${passedCount} / ${testResults.length} Passed`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Results Table */}
      <main style={{ padding: '36px 0 80px', flex: 1 }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
              Automated API Endpoints Test Matrix ({testResults.length} Tests)
            </h2>
            {testResults.length > 0 && (
              <span style={{
                padding: '4px 12px',
                borderRadius: '20px',
                backgroundColor: failedCount === 0 ? '#ECFDF5' : '#FEF2F2',
                color: failedCount === 0 ? '#059669' : '#EF4444',
                fontSize: '0.82rem',
                fontWeight: '700',
              }}>
                {failedCount === 0 ? 'All Systems 100% Operational' : `${failedCount} Failed`}
              </span>
            )}
          </div>

          {testResults.length === 0 ? (
            <div style={{
              padding: '60px 24px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              textAlign: 'center',
            }}>
              <Terminal size={40} color="#94A3B8" style={{ marginBottom: '14px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A' }}>
                Test Suite Standing By
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.92rem', maxWidth: '480px', margin: '6px auto 20px' }}>
                Click the "Run All 12 Live API Tests" button above to send real HTTP requests to the backend server and inspect live payloads.
              </p>
              <button
                type="button"
                onClick={runAllTests}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Run Diagnostics Now
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {testResults.map((result, idx) => {
                const isExpanded = expandedTest === result.id;

                return (
                  <div
                    key={result.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '14px',
                      border: result.passed ? '1px solid #E2E8F0' : '1px solid #FCA5A5',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div
                      onClick={() => setExpandedTest(isExpanded ? null : result.id)}
                      style={{
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        backgroundColor: isExpanded ? '#F8FAFC' : '#FFFFFF',
                        transition: 'background-color 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        {result.passed ? (
                          <CheckCircle2 size={20} color="#10B981" />
                        ) : (
                          <XCircle size={20} color="#EF4444" />
                        )}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0F172A' }}>
                              #{idx + 1}. {result.name}
                            </span>
                            <span style={{
                              fontFamily: 'monospace',
                              fontSize: '0.78rem',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              backgroundColor: '#F1F5F9',
                              color: '#475569',
                            }}>
                              {result.endpoint}
                            </span>
                          </div>
                          {result.error && (
                            <span style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: '600' }}>
                              Error: {result.error}
                            </span>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: result.passed ? '#ECFDF5' : '#FEF2F2',
                          color: result.passed ? '#059669' : '#EF4444',
                          fontWeight: '800',
                          fontSize: '0.75rem',
                        }}>
                          HTTP {result.status}
                        </span>
                        <span style={{
                          fontSize: '0.82rem',
                          color: '#64748B',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}>
                          <Clock size={13} /> {result.duration}ms
                        </span>
                        {isExpanded ? <ChevronDown size={18} color="#94A3B8" /> : <ChevronRight size={18} color="#94A3B8" />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div style={{
                        padding: '16px 20px',
                        backgroundColor: '#0F172A',
                        color: '#38BDF8',
                        fontFamily: 'monospace',
                        fontSize: '0.82rem',
                        maxHeight: '320px',
                        overflowY: 'auto',
                        borderTop: '1px solid #1E293B',
                      }}>
                        <div style={{ color: '#94A3B8', marginBottom: '8px' }}>
                          // Real JSON payload returned from {result.endpoint}:
                        </div>
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                          {JSON.stringify(result.response, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SystemStatusPage;
