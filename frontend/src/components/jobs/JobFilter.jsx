import React from 'react';
import { Search, MapPin, DollarSign, Filter, RotateCcw } from 'lucide-react';
import { categories } from '../../data/mockData';

const JobFilter = ({ filters, setFilters, onReset }) => {
  const handleCategoryChange = (e) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  };

  const handleTypeChange = (type) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type === type ? 'all' : type
    }));
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      border: '1px solid #E2E8F0',
      padding: '24px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        paddingBottom: '14px',
        borderBottom: '1px solid #F1F5F9'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '1.05rem', color: '#0F172A' }}>
          <Filter size={18} color="#0C463B" />
          Filter Jobs
        </div>
        <button
          onClick={onReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.8rem',
            color: '#64748B',
            fontWeight: '600'
          }}
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      {/* Keyword Search */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
          Job Title or Keywords
        </label>
        <div style={{ position: 'relative' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input
            type="text"
            placeholder="e.g. Frontend, React, Lead..."
            value={filters.keyword}
            onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
            style={{
              width: '100%',
              padding: '10px 12px 10px 38px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              outline: 'none',
              fontSize: '0.88rem'
            }}
          />
        </div>
      </div>

      {/* Location */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
          Location
        </label>
        <div style={{ position: 'relative' }}>
          <MapPin size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input
            type="text"
            placeholder="e.g. San Francisco, Remote..."
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            style={{
              width: '100%',
              padding: '10px 12px 10px 38px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              outline: 'none',
              fontSize: '0.88rem'
            }}
          />
        </div>
      </div>

      {/* Category Dropdown */}
      <div style={{ marginBottom: '22px' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
          Job Category
        </label>
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            outline: 'none',
            fontSize: '0.88rem',
            backgroundColor: '#FFFFFF'
          }}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Employment Type */}
      <div style={{ marginBottom: '22px' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '10px' }}>
          Employment Type
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['Full-Time', 'Part-Time', 'Contract', 'Internship'].map((type) => (
            <label 
              key={type} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                fontSize: '0.88rem', 
                color: '#475569', 
                cursor: 'pointer' 
              }}
            >
              <input
                type="checkbox"
                checked={filters.type === type}
                onChange={() => handleTypeChange(type)}
                style={{ accentColor: '#0C463B', width: '16px', height: '16px' }}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Salary Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
            Min Salary (USD)
          </label>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0C463B' }}>
            ${filters.minSalary ? `${filters.minSalary / 1000}k` : 'Any'}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="200000"
          step="10000"
          value={filters.minSalary || 0}
          onChange={(e) => setFilters(prev => ({ ...prev, minSalary: Number(e.target.value) }))}
          style={{ width: '100%', accentColor: '#0C463B' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>
          <span>$0</span>
          <span>$100k</span>
          <span>$200k+</span>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
