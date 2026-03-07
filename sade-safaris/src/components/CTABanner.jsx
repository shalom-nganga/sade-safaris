import { useNavigate } from 'react-router-dom';

function CTABanner() {
  const navigate = useNavigate();

  return (
    <>
      <section style={{ position: 'relative', padding: '100px 5%', overflow: 'hidden' }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1800&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(.28)',
        }} />

        {/* Green tint overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(45,106,26,.8), transparent)',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: '700px', margin: '0 auto', textAlign: 'center',
        }}>
          <p style={{
            fontSize: '12px', fontWeight: 800, color: '#f5c518',
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px',
          }}>
            READY FOR YOUR ADVENTURE?
          </p>
          <h2 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 700, color: 'white',
            textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '20px',
          }}>
            LET US PLAN YOUR<br />
            <span style={{ color: '#f5c518' }}>DREAM SAFARI</span>
          </h2>
          <p style={{
            fontSize: '16px', color: 'rgba(255,255,255,.8)',
            lineHeight: 1.7, marginBottom: '40px',
          }}>
            Our expert team is ready to craft a personalized safari itinerary
            tailored perfectly to your budget, interests, and travel dates.
          </p>

          {/* Buttons */}
          <div className="cta-buttons" style={{
            display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <button
              onClick={() => navigate('/contact')}
              className="cta-btn"
              style={{
                background: '#f5c518', color: '#1a1a1a', border: 'none',
                padding: '16px 36px', fontSize: '15px', fontWeight: 800,
                cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit',
                letterSpacing: '.5px', transition: 'all .25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e6b800'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f5c518'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              START PLANNING NOW →
            </button>
            <button
              onClick={() => window.location.href = 'tel:+254722864021'}
              className="cta-btn"
              style={{
                background: 'rgba(255,255,255,.1)', color: 'white',
                border: '2px solid rgba(255,255,255,.4)',
                padding: '14px 32px', fontSize: '15px', fontWeight: 700,
                cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit',
                backdropFilter: 'blur(8px)', transition: 'all .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
            >
              📞 CALL US NOW
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .cta-buttons {
            flex-direction: column !important;
            align-items: center !important;
          }
          .cta-btn {
            width: 100% !important;
            max-width: 320px !important;
          }
        }
      `}</style>
    </>
  );
}

export default CTABanner;