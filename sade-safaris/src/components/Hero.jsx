import { useState, useEffect } from 'react';

const heroSlides = [
  {
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1800&q=90',
    headline: 'YOUR ABSOLUTE',
    sub: 'AFRICAN SAFARI EXPERIENCE',
    caption: 'Witness the Great Migration — 2 million wildebeest crossing the Masai Mara',
  },
  {
    img: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=1800&q=90',
    headline: 'WALK AMONG',
    sub: 'GIANTS OF AMBOSELI',
    caption: 'Legendary elephants roaming freely beneath the shadow of Kilimanjaro',
  },
  {
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=90',
    headline: 'ESCAPE TO THE',
    sub: 'KENYAN COASTLINE',
    caption: 'Pristine white sands and crystal-clear Indian Ocean waters await you',
  },
];

function Hero() {
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 700);
      setSlide(s => (s + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const current = heroSlides[slide];

  const goToSlide = (i) => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 700);
    setSlide(i);
  };

  return (
    <section style={{
      position: 'relative',
      height: '88vh',
      minHeight: '560px',
      overflow: 'hidden',
    }}>

      {/* Background Images */}
      {heroSlides.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${s.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: slide === i ? 1 : 0,
          transition: 'opacity 1.4s ease',
        }} />
      ))}

      {/* Overlays */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.2) 50%, rgba(0,0,0,.1) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,.45) 0%, transparent 60%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 5% 60px', zIndex: 2,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

          {/* Badge */}
          <div style={{
            marginBottom: '14px',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(10px)' : 'translateY(0)',
            transition: 'all .6s ease',
          }}>
            <span style={{
              background: '#4a9c2f', color: 'white', fontSize: '11px',
              fontWeight: 800, letterSpacing: '2px', padding: '5px 14px',
              borderRadius: '3px', textTransform: 'uppercase',
            }}>
              🌍 KENYA'S PREMIER SAFARI COMPANY
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 'clamp(48px, 7vw, 88px)',
            fontWeight: 700, color: 'white', lineHeight: 1.05,
            textTransform: 'uppercase', marginBottom: '10px',
            textShadow: '0 2px 20px rgba(0,0,0,.3)',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(16px)' : 'translateY(0)',
            transition: 'all .6s ease .1s',
          }}>
            {current.headline}<br />
            <span style={{ color: '#f5c518' }}>{current.sub}</span>
          </h1>

          {/* Caption */}
          <p style={{
            fontSize: '16px', color: 'rgba(255,255,255,.85)',
            marginBottom: '28px', maxWidth: '520px',
            lineHeight: 1.65, fontWeight: 400,
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(16px)' : 'translateY(0)',
            transition: 'all .6s ease .2s',
          }}>
            {current.caption}
          </p>

          {/* Buttons */}
          <div style={{
            display: 'flex', gap: '14px', flexWrap: 'wrap',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(16px)' : 'translateY(0)',
            transition: 'all .6s ease .3s',
          }}>
            <button
              style={{
                background: '#f5c518', color: '#1a1a1a', border: 'none',
                padding: '16px 32px', fontSize: '14px', fontWeight: 800,
                letterSpacing: '.5px', cursor: 'pointer', borderRadius: '4px',
                fontFamily: 'inherit', transition: 'all .25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#e6b800';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#f5c518';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              LET US PLAN YOUR DREAM SAFARI →
            </button>
            <button
              style={{
                background: 'transparent', color: 'white',
                border: '2px solid rgba(255,255,255,.6)',
                padding: '14px 28px', fontSize: '14px', fontWeight: 700,
                cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit',
                transition: 'all .25s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'white'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.6)'}
            >
              ▶ WATCH OUR STORY
            </button>
          </div>

        </div>
      </div>

      {/* Slide Indicators */}
      <div style={{
        position: 'absolute', right: '5%', bottom: '60px',
        zIndex: 3, display: 'flex', flexDirection: 'column', gap: '8px',
      }}>
        {heroSlides.map((_, i) => (
          <div
            key={i}
            onClick={() => goToSlide(i)}
            style={{
              width: '4px',
              height: slide === i ? '40px' : '14px',
              background: slide === i ? '#f5c518' : 'rgba(255,255,255,.4)',
              borderRadius: '4px', cursor: 'pointer',
              transition: 'all .4s',
            }}
          />
        ))}
      </div>

    </section>
  );
}

export default Hero;