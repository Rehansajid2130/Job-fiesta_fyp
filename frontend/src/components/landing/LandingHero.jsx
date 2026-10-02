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
            backgroundColor: '#FFFFFF', 
            borderRadius: '9999px', 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            width: '100%',
            maxWidth: '560px',
            height: '52px',
            padding: '4px 5px 4px 18px',
            border: '1px solid #E2E8F0',
            boxSizing: 'border-box'
          }}
        >
          {/* Magnifying Glass Icon */}
          <img 
            src="/assets/Landingpageimages/interface__search_magnifying_glass.svg" 
            alt="Search" 
            style={{ width: '18px', height: '18px', marginRight: '10px', opacity: 0.6, flexShrink: 0 }}
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
              fontSize: '14.5px', 
              color: '#1E293B',
              minWidth: '60px'
            }}
          />
          {/* Search Button */}
          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#0C463B', 
              color: '#FFFFFF', 
              border: 'none', 
              borderRadius: '9999px', 
              height: '42px', 
              padding: '0 22px', 
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px', 
              fontWeight: '600', 
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(12, 70, 59, 0.18)',
              transition: 'background-color 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 340ms cubic-bezier(0.4, 0, 0.2, 1)',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#08342c';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(12, 70, 59, 0.28)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0C463B';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(12, 70, 59, 0.18)';
            }}
          >
            Search
          </button>
        </form>

        {/* Quick Clickable Suggestions */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
          <span style={{ fontSize: '13px', color: '#64748B', fontFamily: 'Inter, sans-serif', alignSelf: 'center' }}>Popular:</span>
          {['Product Manager', 'Software Engineer', 'Product Designer', 'Customer Support'].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => onQuickSearch(chip)}
              style={{
                fontSize: '12px',
                fontWeight: '500',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '4px 12px',
                color: '#475569',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                transition: 'background-color 340ms cubic-bezier(0.4, 0, 0.2, 1), color 280ms cubic-bezier(0.4, 0, 0.2, 1), border-color 340ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EBF8F4';
                e.currentTarget.style.color = '#0C463B';
                e.currentTarget.style.borderColor = '#0C463B';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(12, 70, 59, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#475569';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.02)';
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
