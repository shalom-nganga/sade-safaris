import { useState } from 'react';

const testimonials = [
  { name: 'Sarah Mitchell', country: 'United Kingdom', flag: '🇬🇧', text: 'Witnessing the Great Migration was beyond anything I could have imagined. Our guide knew exactly where to be and when — it was truly magical and life changing.', avatar: 'SM', color: '#4a9c2f' },
  { name: 'James Oduya', country: 'Nigeria', flag: '🇳🇬', text: 'From the seamless booking to the stunning camps and expert guiding, every single detail was handled perfectly. The best travel experience of my entire life.', avatar: 'JO', color: '#2d6a1a' },
  { name: 'Elena Rossi', country: 'Italy', flag: '🇮🇹', text: 'I was nervous traveling solo but the Sade Safaris team made me feel completely safe and at home. The wildlife encounters were absolutely breathtaking.', avatar: 'ER', color: '#2d8a6e' },
];

function Testimonials() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <section style={{ padding: '72px 5%', background: 'white' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '8px' }}>REAL EXPERIENCES</p>
            <h2 className="testi-title" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '38px', fontWeight: 700, textTransform: 'uppercase', color: '#1a1a1a' }}>WHAT OUR TRAVELERS SAY</h2>
          </div>

          <div className="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {testimonials.map(t => (
              <div key={t.name}
                onMouseEnter={() => setHovered(t.name)} onMouseLeave={() => setHovered(null)}
                style={{
                  background: 'white', borderRadius: '8px', padding: '32px',
                  borderLeft: `4px solid ${hovered === t.name ? '#f5c518' : '#4a9c2f'}`,
                  boxShadow: hovered === t.name ? '0 16px 40px rgba(0,0,0,.1)' : '0 2px 12px rgba(0,0,0,.06)',
                  transform: hovered === t.name ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all .3s ease',
                }}
              >
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f5c518', fontSize: '18px' }}>★</span>)}
                </div>
                <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.75, marginBottom: '24px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '16px', fontFamily: "'Oswald', sans-serif", flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '15px', color: '#1a1a1a' }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{t.flag} {t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .testi-grid { grid-template-columns: 1fr !important; }
          .testi-title { font-size: 28px !important; }
        }
        @media (max-width: 600px) {
          .testi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

export default Testimonials;