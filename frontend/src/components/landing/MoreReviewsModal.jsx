import React from 'react';
import Modal from '../common/Modal';

const MoreReviewsModal = ({ isOpen, onClose, testimonials = [] }) => {
  const allReviews = testimonials.concat([
    {
      name: 'David Chen',
      role: 'Engineering Lead at Velo',
      avatar: '/assets/Landingpageimages/cover_4.svg',
      text: 'JobFiesta helped our tech startup source four exceptional engineers in record time. The matching precision and clean profiles saved us weeks of screening.'
    },
    {
      name: 'Sarah Jenkins',
      role: 'Product Lead at Apex',
      avatar: '/assets/Landingpageimages/cover_1.svg',
      text: 'The best talent platform I have used. Clean interface, verified applicant credentials, and instant communication with qualified professionals.'
    }
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Client Reviews &amp; Testimonials"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '60vh', overflowY: 'auto', paddingRight: '6px' }}>
        {allReviews.map((t, i) => (
          <div key={i} style={{ padding: '16px', backgroundColor: '#F2FFF2', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <img src={t.avatar} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              <div>
                <div style={{ fontWeight: '700', color: '#0C463B', fontSize: '15px' }}>{t.name}</div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>{t.role}</div>
              </div>
            </div>
            <div style={{ color: '#F59E0B', fontSize: '14px', marginBottom: '6px' }}>★★★★★</div>
            <p style={{ fontSize: '13px', color: '#374151', margin: 0, lineHeight: 1.5 }}>{t.text}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default MoreReviewsModal;
