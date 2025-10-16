import React from 'react';
import HeadingTitle from '@/shared/ui/HeadingTitle';

export const ContactInfo: React.FC = () => {
  return (
    <section className="container" style={{ padding: '80px 0' }}>
      <div style={{ textAlign: 'center' }}>
        <HeadingTitle title="Контакты" />
        <p style={{ marginTop: 24, fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: 'var(--color-text)' }}>
          Для сотрудничества, заказа работ свяжитесь со мной любым удобным способом.
        </p>
      </div>

      <div style={{ marginTop: 48, textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: 'var(--color-text)' }}>Социальные сети</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
        
          <Circle48>
            <div style={{ background: 'var(--color-text-muted)', borderRadius: 4, color: '#fff', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, lineHeight: '16px' }}>
              VK
            </div>
          </Circle48>
        </div>
      </div>
    </section>
  );
};

const Circle48: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ width: 48, height: 48, borderRadius: 1000, background: 'var(--color-gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {children}
  </div>
);

export default ContactInfo;


