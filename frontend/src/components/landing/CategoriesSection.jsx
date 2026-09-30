import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoriesSection = ({ categories, onCategoryClick }) => {
  const navigate = useNavigate();

  return (
    <section id="categories" className="container" style={{ marginBottom: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
        <div>
          <h2 style={{ fontFamily: "'Martel', serif", fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: '700', color: '#0C463B', margin: 0, textAlign: 'left' }}>
            Our Categories
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', fontSize: '15px', marginTop: '6px' }}>
            Click any category to search open positions in that discipline.
          </p>
        </div>
        <button
          onClick={() => navigate('/search')}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            fontWeight: '600',
            color: '#0C463B',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          Browse All Categories &rarr;
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: 'clamp(14px, 2vw, 22px)' }}>
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="category-card"
            onClick={() => onCategoryClick(cat)}
          >
            <div className="category-icon-wrap">
              <img 
                src={cat.icon} 
                alt={cat.name} 
                className="category-icon-img"
              />
            </div>
            <span className="category-title">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
