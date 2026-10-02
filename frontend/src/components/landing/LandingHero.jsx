import React from 'react';
import HeroOfficeIllustration from './HeroOfficeIllustration';

const LandingHero = ({ keyword, setKeyword, onSearchSubmit, onQuickSearch }) => {
  return (
    <section 
      className="container" 
      style={{ 
        position: 'relative', 
        paddingTop: '16px', 
        paddingBottom: '20px', 
        textAlign: 'center' 
      }}
    >
      {/* Top-Left Lightbulb Doodle */}
      <div className="hero-doodle" style={{ position: 'absolute', left: '4%', top: '10px', pointerEvents: 'none', zIndex: 1 }}>
        <img 
          src="/assets/Landingpageimages/group_3.svg" 
          alt="Lightbulb doodle" 
          style={{ width: '120px', height: 'auto', opacity: 0.95 }}
        />
      </div>

      {/* Top-Right Origami Paper Airplane Doodle */}
      <div className="hero-doodle" style={{ position: 'absolute', right: '5%', top: '20px', pointerEvents: 'none', zIndex: 1 }}>
        <img 
          src="/assets/Landingpageimages/group_24.svg" 
          alt="Airplane doodle" 
          style={{ width: '130px', height: 'auto', opacity: 0.9 }}
        />
      </div>

      {/* Main Headline: Find your Perfecto job */}
      <div style={{ marginBottom: '24px', position: 'relative', zIndex: 2, padding: '0 16px' }}>
        <div style={{ fontFamily: "'League Script', cursive", fontSize: 'clamp(36px, 5.5vw, 64px)', color: '#333333', lineHeight: '1.1' }}>
          Find your
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Martel', serif", fontSize: 'clamp(44px, 8vw, 84px)', fontWeight: '700', color: '#0C463B', lineHeight: '1' }}>
            Perfecto
          </span>
          <span style={{ fontFamily: "'League Script', cursive", fontSize: 'clamp(38px, 6.5vw, 72px)', color: '#0C463B', lineHeight: '1' }}>
            job
          </span>
        </div>
      </div>

      {/* Pill Search Bar - Positioned cleanly right above the illustration SVGs */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '-10px', position: 'relative', zIndex: 10, padding: '0 clamp(12px, 3vw, 20px)' }}>
        {/* ponytail: pill-search-form class provides focus-within ring without extra JS state */}
        <form 
          className="pill-search-form"
          onSubmit={onSearchSubmit}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: '#F2FFF2', 
            borderRadius: '50px', 
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
            width: '100%',
            maxWidth: '660px',
            minHeight: '62px',
            height: 'auto',
            padding: '6px 8px 6px clamp(14px, 3vw, 26px)',
            border: '1px solid rgba(12, 70, 59, 0.12)'
          }}
        >
          {/* Magnifying Glass Icon */}
          <img 
            src="/assets/Landingpageimages/interface__search_magnifying_glass.svg" 
            alt="Search" 
            style={{ width: '22px', height: '22px', marginRight: '12px', opacity: 0.7, flexShrink: 0 }}
          />
          {/* Input */}
          <input 
            type="text" 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Job title, skills, or company..."
            style={{ 
              flex: 1, 
              border: 'none', 
              background: 'transparent', 
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(15px, 2.4vw, 20px)', 
              color: '#1E293B',
              minWidth: '60px'
            }}
          />
          {/* Search Button */}
          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#0C463B', 
              color: '#F2FFF2', 
              border: 'none', 
              borderRadius: '50px', 
              height: 'clamp(48px, 6vw, 60px)', 
              padding: '0 clamp(18px, 3vw, 36px)', 
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(16px, 2.5vw, 22px)', 
              fontWeight: '600', 
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(12, 70, 59, 0.2)',
              transition: 'background-color 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 340ms cubic-bezier(0.4, 0, 0.2, 1)',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#08342c';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(12, 70, 59, 0.32)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0C463B';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(12, 70, 59, 0.2)';
            }}
          >
            Search
          </button>
        </form>

        {/* Quick Clickable Suggestions */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
          <span style={{ fontSize: '13px', color: '#64748B', fontFamily: 'Inter, sans-serif' }}>Popular:</span>
          {['Product Manager', 'Software Engineer', 'Product Designer', 'Customer Support'].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => onQuickSearch(chip)}
              style={{
                fontSize: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(12, 70, 59, 0.18)',
                borderRadius: '20px',
                padding: '4px 14px',
                color: '#0C463B',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
                transition: 'background-color 340ms cubic-bezier(0.4, 0, 0.2, 1), color 280ms cubic-bezier(0.4, 0, 0.2, 1), border-color 340ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F2FFF2';
                e.currentTarget.style.borderColor = '#0C463B';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(12, 70, 59, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                e.currentTarget.style.borderColor = 'rgba(12, 70, 59, 0.18)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.03)';
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Office Freepik Illustration (Scaled dynamically & smoothly) */}
      <div style={{ width: '100%', padding: '0 clamp(10px, 3vw, 20px)', position: 'relative', zIndex: 1 }}>
        <HeroOfficeIllustration maxWidth="840px" />
      </div>
    </section>
  );
};

export default LandingHero;
