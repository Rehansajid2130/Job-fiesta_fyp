import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { User, Mail, MapPin, Briefcase, CheckCircle2, Lock, Download, Trash2, ShieldCheck } from 'lucide-react';

const AccountsettingsPage = () => {
  // ponytail: use logout and auth token from existing AuthContext (KISS)
  const { user, updateProfile, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || 'Alice Johnson',
    email: user?.email || 'alice.jobseeker@example.com',
    title: user?.title || 'Senior Frontend Developer',
    location: user?.location || 'San Francisco, CA',
    company: user?.company || '',
    bio: 'Passionate developer dedicated to modern user experiences, high-performance web systems, and innovative tech products.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [privacyActionMsg, setPrivacyActionMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // ponytail: GDPR Art. 20 client-side JSON export using native browser Blob
  const handleExportData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const authToken = localStorage.getItem('token');
      const res = await fetch(`${apiUrl}/api/users/export-data`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const data = await res.json();
      const exportBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const exportUrl = URL.createObjectURL(exportBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = exportUrl;
      downloadLink.download = `jobfiesta_privacy_export_${user?.name?.replace(/\s+/g, '_') || 'account'}.json`;
      downloadLink.click();
      URL.revokeObjectURL(exportUrl);
      setPrivacyActionMsg('Personal data package exported successfully.');
      setTimeout(() => setPrivacyActionMsg(''), 3500);
    } catch (err) {
      alert('Could not export data. Please ensure the backend server is reachable.');
    }
  };

  // ponytail: GDPR Art. 17 permanent erasure with affirmative confirmation
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to permanently delete your JobFiesta account? Pursuant to GDPR Article 17, your profile, resumes, applications, and messages will be permanently erased. This cannot be undone.'
    );
    if (!confirmed) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const authToken = localStorage.getItem('token');
      await fetch(`${apiUrl}/api/users/profile`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` }
      });
      alert('Your account and all personal records have been permanently erased.');
      logout();
      window.location.href = '/';
    } catch (err) {
      alert('Failed to delete account. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '32px 0'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
            Account & Profile Settings
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#64748B' }}>
            Update your professional information, contact details, and account preferences.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 20px', flex: 1, maxWidth: '800px' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '36px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {savedSuccess && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 18px',
              borderRadius: '10px',
              backgroundColor: '#ECFDF5',
              color: '#065F46',
              marginBottom: '24px',
              border: '1px solid #A7F3D0',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              <CheckCircle2 size={18} />
              Profile settings updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Avatar Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces'}
                alt="Profile"
                style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #0C463B' }}
              />
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#0F172A' }}>{user?.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Role: <strong>{user?.userType === 'recruiter' ? 'Recruiter' : 'Job Seeker'}</strong></div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '11px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '11px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Professional Headline / Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '11px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  style={{ width: '100%', padding: '11px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Professional Biography
              </label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                style={{ width: '100%', padding: '11px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                type="submit"
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                Save Changes
              </button>
            </div>
          </form>

          {/* ponytail: GDPR Art. 17 & 20 Self-Service Privacy & Data Rights Card */}
          <div style={{
            marginTop: '28px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '28px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <ShieldCheck size={22} color="#0C463B" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                Privacy &amp; Data Rights (GDPR &amp; CCPA)
              </h2>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '20px', lineHeight: '1.5' }}>
              You retain complete control over your personal records. Exercise your statutory rights to receive a machine-readable JSON copy of your data or permanently erase your profile and records.
            </p>

            {privacyActionMsg && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                border: '1px solid #A7F3D0',
                fontSize: '0.88rem',
                fontWeight: '600',
                marginBottom: '18px'
              }}>
                {privacyActionMsg}
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleExportData}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  backgroundColor: '#F1F5F9',
                  color: '#1E293B',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Download size={16} />
                Export My Data (JSON)
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  backgroundColor: '#FEF2F2',
                  color: '#DC2626',
                  border: '1px solid #FECACA',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={16} />
                Delete Account (Permanent Erasure)
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AccountsettingsPage;
