import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useJobs } from '../context/JobContext';
import { 
  CheckCheck, 
  MessageSquare, 
  Briefcase, 
  Calendar, 
  Sparkles, 
  Trash2, 
  ExternalLink,
  Info,
  Clock,
  Send,
  UserCheck
} from 'lucide-react';

const NotificationsPage = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    addNotification, 
    showToast 
  } = useJobs();

  const [filterType, setFilterType] = useState('all');

  const filteredNotifications = filterType === 'all'
    ? notifications
    : notifications.filter(n => n.type === filterType);

  const getIconForType = (type) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={18} color="#0C463B" />;
      case 'application':
        return <Briefcase size={18} color="#10B981" />;
      case 'interview':
        return <Calendar size={18} color="#8B5CF6" />;
      default:
        return <Sparkles size={18} color="#3B82F6" />;
    }
  };

  // Test simulation buttons to demo transitions-dev skill
  const simulateApplicationAlert = () => {
    addNotification({
      title: 'Application Shortlisted! 🚀',
      message: 'Nexus Innovations selected your resume for the next technical screening round.',
      type: 'application',
      link: '/jobseeker-dashboard'
    });
  };

  const simulateMessageAlert = () => {
    addNotification({
      title: 'New Message from Suzana Colin 💬',
      message: 'Hey Furqan! Can you share your availability for a 30-min discovery call tomorrow?',
      type: 'message',
      link: '/chat'
    });
  };

  const simulateInterviewAlert = () => {
    addNotification({
      title: 'Technical Interview Confirmed 🗓️',
      message: 'Your Google Meet link for Senior UI Engineer has been generated for Thursday 3:00 PM EST.',
      type: 'interview',
      link: '/jobseeker-dashboard'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Header Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '40px 0 28px' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Activity & Alerts
              </span>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
                Notification Center
              </h1>
              <p style={{ fontSize: '0.92rem', color: '#64748B' }}>
                Real-time alerts on your applications, recruiter messages, and scheduled interviews.
              </p>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={markAllNotificationsAsRead}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  backgroundColor: '#EBF8F4',
                  color: '#0C463B',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  border: '1px solid rgba(12, 70, 59, 0.15)',
                  cursor: 'pointer'
                }}
              >
                <CheckCheck size={16} /> Mark All as Read
              </button>
            </div>
          </div>

          {/* Interactive Simulation Bar to showcase transitions-dev motion */}
          <div style={{
            marginTop: '24px',
            padding: '16px 20px',
            borderRadius: '12px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="#0C463B" />
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0F172A' }}>
                Live Transitions Demo:
              </span>
              <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                Click below to trigger instant real-time alerts with transitions-dev motion tokens:
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={simulateApplicationAlert}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: '#0F172A',
                  cursor: 'pointer'
                }}
              >
                + Shortlist Alert
              </button>
              <button
                type="button"
                onClick={simulateMessageAlert}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: '#0F172A',
                  cursor: 'pointer'
                }}
              >
                + Message Alert
              </button>
              <button
                type="button"
                onClick={simulateInterviewAlert}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: '#0F172A',
                  cursor: 'pointer'
                }}
              >
                + Interview Alert
              </button>
            </div>
          </div>

          {/* Type Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Notifications' },
              { id: 'application', label: 'Applications' },
              { id: 'message', label: 'Messages' },
              { id: 'interview', label: 'Interviews' },
              { id: 'system', label: 'System Alerts' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterType(tab.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: filterType === tab.id ? '700' : '500',
                  backgroundColor: filterType === tab.id ? '#0C463B' : '#FFFFFF',
                  color: filterType === tab.id ? '#FFFFFF' : '#475569',
                  border: filterType === tab.id ? '1px solid #0C463B' : '1px solid #E2E8F0',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main List */}
      <main style={{ padding: '36px 0 80px', flex: 1 }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          {filteredNotifications.length === 0 ? (
            <div style={{
              padding: '48px 24px',
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0'
            }}>
              <img
                src="/assets/searchimages/no-notifications.svg"
                alt="All caught up"
                style={{
                  width: '100%',
                  maxWidth: '220px',
                  height: 'auto',
                  margin: '0 auto 16px auto',
                  display: 'block'
                }}
              />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0C463B', marginBottom: '8px' }}>
                All caught up!
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto', lineHeight: '1.5' }}>
                You have no notifications right now. We will notify you when there are updates on your jobs or messages.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredNotifications.map(item => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: item.unread ? '#F2FFF2' : '#FFFFFF',
                    borderRadius: '14px',
                    border: item.unread ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {getIconForType(item.type)}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{ fontSize: '0.98rem', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                          {item.title}
                        </h4>
                        {item.unread && (
                          <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#10B981'
                          }} />
                        )}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#94A3B8', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {item.time}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: '0 0 12px' }}>
                      {item.message}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {item.link && (
                        <Link
                          to={item.link}
                          onClick={() => markNotificationAsRead(item.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.82rem',
                            fontWeight: '700',
                            color: '#0C463B',
                            textDecoration: 'none'
                          }}
                        >
                          <span>Open details</span>
                          <ExternalLink size={13} />
                        </Link>
                      )}

                      {item.unread && (
                        <button
                          type="button"
                          onClick={() => markNotificationAsRead(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '0.82rem',
                            fontWeight: '600',
                            color: '#64748B',
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotificationsPage;
