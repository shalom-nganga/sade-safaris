import React from 'react';

const features = [
  { icon: '🦁', title: 'Expert Local Guides', desc: 'Born and raised in Kenya, our guides carry generations of knowledge about every trail, animal, and story across East Africa.' },
  { icon: '🛡️', title: 'Fully Licensed & Safe', desc: 'Fully insured, government certified, and operating to the highest safety standards so you can explore with total peace of mind.' },
  { icon: '🌿', title: 'Eco-Conscious Travel', desc: '5% of every booking goes directly to local wildlife conservation and community development programs across Kenya.' },
  { icon: '✨', title: 'Tailored Itineraries', desc: 'Every safari is crafted around your budget, travel style, and schedule. No two Sade Safaris journeys are ever the same.' },
];

function WhyUs() {
  return (
    <>
      <section style={{ padding: '72px 5%', background: '#eaf5e3' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="whyus-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }}>

            {/* Left */}
            <div>
              <p style={{ fontSize: '12px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px' }}>WHY CHOOSE US</p>
              <h2 className="whyus-title" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '40px', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '20px', color: '#1a1a1a' }}>
                WE LIVE & BREATHE<br /><span style={{ color: '#4a9c2f' }}>AFRICAN SAFARI</span>
              </h2>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '36px' }}>
                Born from a genuine love of East Africa, our team of expert local guides and travel professionals have been curating unforgettable safari experiences for over 15 years. We don't just book tours — we craft journeys that change how you see the world.
              </p>

              <div className="whyus-features" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '36px' }}>
                {features.map(f => (
                  <div key={f.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0, boxShadow: '0 2px 10px rgba(0,0,0,.08)' }}>{f.icon}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '4px' }}>{f.title}</div>
                      <div style={{ fontSize: '12px', color: '#777', lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button style={{ background: '#4a9c2f', color: 'white', border: 'none', padding: '15px 32px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit', letterSpacing: '.5px', transition: 'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2d6a1a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#4a9c2f'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >LEARN ABOUT US →</button>
            </div>

            {/* Right — image */}
            <div className="whyus-image-col" style={{ position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=700&q=80" alt="Safari guide"
                style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '8px', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: '#f5c518', padding: '28px 32px', borderRadius: '6px', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,.15)' }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '52px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>15</div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#1a1a1a', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>YEARS OF<br />SAFARI EXCELLENCE</div>
              </div>
              <div style={{ position: 'absolute', top: '20px', left: '-20px', background: '#4a9c2f', padding: '16px 20px', borderRadius: '6px', color: 'white', boxShadow: '0 8px 24px rgba(0,0,0,.15)' }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '28px', fontWeight: 700 }}>4.9★</div>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', opacity: .85 }}>RATED BY<br />1,200+ GUESTS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .whyus-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .whyus-title { font-size: 30px !important; }
          .whyus-image-col { display: none !important; }
        }
        @media (max-width: 480px) {
          .whyus-features { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

export default WhyUs;