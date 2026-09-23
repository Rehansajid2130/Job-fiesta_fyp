import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Check } from 'lucide-react';

const JobFilterSidebar = ({ 
  filters, 
  setFilters, 
  onReset 
}) => {
  const [openSections, setOpenSections] = useState({
    salary: true,
    jobType: true,
    workMode: true,
    experience: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleJobTypeChange = (type) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type === type ? 'all' : type
    }));
  };

  const handleWorkModeChange = (mode) => {
    setFilters(prev => ({
      ...prev,
      workMode: prev.workMode === mode ? 'all' : mode
    }));
  };

  const handleExperienceChange = (exp) => {
    setFilters(prev => ({
      ...prev,
      experience: prev.experience === exp ? 'all' : exp
    }));
  };

  const expandAll = () => {
    setOpenSections({
      salary: true,
      jobType: true,
      workMode: true,
      experience: true
    });
  };

  const collapseAll = () => {
    setOpenSections({
      salary: false,
      jobType: false,
      workMode: false,
      experience: false
    });
  };

  const allOpen = Object.values(openSections).every(Boolean);

  return (
    <aside style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      border: '1px solid #ECECEC',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      padding: '24px 22px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#111827',
          margin: 0
        }}>
          Filter
        </h3>
        <button
          type="button"
          onClick={onReset}
          style={{
            fontSize: '13px',
            color: '#6B7280',
            fontWeight: '500',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0
          }}
        >
          Clear all
        </button>
      </div>

      {/* 1. Salary Range */}
      <div style={{ marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => toggleSection('salary')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '15px',
            fontWeight: '600',
            color: '#111827',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 0',
            textAlign: 'left'
          }}
        >
          <span>Salary Range</span>
          {openSections.salary ? <ChevronUp size={18} color="#6B7280" /> : <ChevronDown size={18} color="#6B7280" />}
        </button>

        {openSections.salary && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
            <input
              type="number"
              placeholder="Min"
              value={filters.minSalary || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, minSalary: e.target.value ? Number(e.target.value) : 0 }))}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '13px',
                color: '#111827',
                outline: 'none',
                backgroundColor: '#F9FAFB'
              }}
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxSalary || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, maxSalary: e.target.value ? Number(e.target.value) : 0 }))}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '13px',
                color: '#111827',
                outline: 'none',
                backgroundColor: '#F9FAFB'
              }}
            />
          </div>
        )}
      </div>

      <div style={{ height: '1px', backgroundColor: '#F3F4F6', margin: '14px 0' }} />

      {/* 2. Job Type */}
      <div style={{ marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => toggleSection('jobType')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '15px',
            fontWeight: '600',
            color: '#111827',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 0',
            textAlign: 'left'
          }}
        >
          <span>Job Type</span>
          {openSections.jobType ? <ChevronUp size={18} color="#6B7280" /> : <ChevronDown size={18} color="#6B7280" />}
        </button>

        {openSections.jobType && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {[
              { id: 'all', label: 'All', count: 2567 },
              { id: 'Full-Time', label: 'Full-Time', count: 450 },
              { id: 'Part-Time', label: 'Part-Time', count: 145 },
              { id: 'Internship', label: 'Internship', count: 85 },
              { id: 'Contract', label: 'Contract', count: 12 }
            ].map(item => {
              const isChecked = filters.type === item.id || (item.id === 'all' && (!filters.type || filters.type === 'all'));
              return (
                <label 
                  key={item.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: isChecked ? '#0C463B' : '#4B5563',
                    fontWeight: isChecked ? '600' : '400'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleJobTypeChange(item.id)}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: '#0C463B',
                      cursor: 'pointer'
                    }}
                  />
                  <span>{item.label} ({item.count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ height: '1px', backgroundColor: '#F3F4F6', margin: '14px 0' }} />

      {/* 3. Work Mode */}
      <div style={{ marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => toggleSection('workMode')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '15px',
            fontWeight: '600',
            color: '#111827',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 0',
            textAlign: 'left'
          }}
        >
          <span>Work Mode</span>
          {openSections.workMode ? <ChevronUp size={18} color="#6B7280" /> : <ChevronDown size={18} color="#6B7280" />}
        </button>

        {openSections.workMode && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {[
              { id: 'on-site', label: 'On-Site', count: '' },
              { id: 'remote', label: 'Remote', count: '180' },
              { id: 'hybrid', label: 'Hybrid', count: '200' }
            ].map(item => {
              const isChecked = filters.workMode === item.id;
              return (
                <label 
                  key={item.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: isChecked ? '#0C463B' : '#4B5563',
                    fontWeight: isChecked ? '600' : '400'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleWorkModeChange(item.id)}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: '#0C463B',
                      cursor: 'pointer'
                    }}
                  />
                  <span>{item.label} {item.count ? `(${item.count})` : ''}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ height: '1px', backgroundColor: '#F3F4F6', margin: '14px 0' }} />

      {/* 4. Experience Level */}
      <div style={{ marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => toggleSection('experience')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '15px',
            fontWeight: '600',
            color: '#111827',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 0',
            textAlign: 'left'
          }}
        >
          <span>Experience Level</span>
          {openSections.experience ? <ChevronUp size={18} color="#6B7280" /> : <ChevronDown size={18} color="#6B7280" />}
        </button>

        {openSections.experience && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {[
              { id: 'entry', label: 'Fresher/Entry-Level', count: 265 },
              { id: 'junior', label: 'Junior', count: 21 },
              { id: 'mid', label: 'Mid-Level', count: 212 },
              { id: 'senior', label: 'Senior', count: 12 },
              { id: 'lead', label: 'Lead/Managerial', count: 24 },
              { id: 'executive', label: 'Director/Executive', count: 10 }
            ].map(item => {
              const isChecked = filters.experience === item.id;
              return (
                <label 
                  key={item.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: isChecked ? '#0C463B' : '#4B5563',
                    fontWeight: isChecked ? '600' : '400'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleExperienceChange(item.id)}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: '#0C463B',
                      cursor: 'pointer'
                    }}
                  />
                  <span>{item.label} ({item.count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ height: '1px', backgroundColor: '#F3F4F6', margin: '14px 0' }} />

      {/* Expand/Collapse Toggle */}
      <div style={{ textAlign: 'center', paddingTop: '4px' }}>
        <button
          type="button"
          onClick={allOpen ? collapseAll : expandAll}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#0C463B',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {allOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <span>{allOpen ? 'Collapse all' : 'Expand all'}</span>
        </button>
      </div>
    </aside>
  );
};

export default JobFilterSidebar;
