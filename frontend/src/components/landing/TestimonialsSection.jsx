import React from 'react';

const TestimonialsSection = ({ testimonials, onOpenMoreReviews }) => {
  return (
    <section className="container" style={{ marginBottom: '80px', textAlign: 'center' }}>
      <h2 style={{ fontFamily: "'Martel', serif", fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: '700', color: '#0C463B', marginBottom: '36px', textAlign: 'left' }}>
        What our Client say
      </h2>

      {/* 3 Client Cards (Responsive Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px', textAlign: 'left', marginBottom: '36px' }}>
        {testimonials.map((client, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#F2FFF2',
              borderRadius: '16px',
              padding: 'clamp(24px, 4vw, 36px) clamp(20px, 3.5vw, 30px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {/* User Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <img 
                src={client.avatar} 
                alt={client.name} 
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontFamily: "'Martel', serif", fontSize: '20px', fontWeight: '700', color: '#0C463B', margin: 0 }}>
                  {client.name}
                </h4>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#718096' }}>
                  {client.role}
                </div>
              </div>
            </div>

            {/* 5 Solid Gold Stars */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '18px', color: '#F59E0B', fontSize: '18px' }}>
              {'★★★★★'}
            </div>

            {/* Review Text */}
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#515151', lineHeight: '1.6', margin: 0 }}>
              {client.text}
            </p>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <button
        onClick={onOpenMoreReviews}
        style={{
          backgroundColor: '#0C463B',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '50px',
          padding: '12px 42px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'background-color 0.2s ease'
        }}
      >
        See More &rarr;
      </button>
    </section>
  );
};

export default TestimonialsSection;
