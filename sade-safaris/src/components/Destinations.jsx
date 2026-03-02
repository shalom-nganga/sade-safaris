import { useState } from 'react';

const destinations = [
  {
    name: 'Masai Mara',
    tours: '12 Tours',
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=700&q=80',
  },
  {
    name: 'Amboseli',
    tours: '8 Tours',
    img: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=500&q=80',
  },
  {
    name: 'Diani Beach',
    tours: '15 Tours',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80',
  },
  {
    name: 'Mt. Kenya',
    tours: '6 Tours',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80',
  },
  {
    name: 'Tsavo East',
    tours: '9 Tours',
    img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=500&q=80',
  },
];

function Destinations() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{ padding: '72px 5%', background: 'white' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <p style={{
            fontSize: '12px', fontWeight: 800, color: '#4a9c2f',
            letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '8px',
          }}>
            EXPLORE AFRICA
          </p>
          <h2 style={{
            fontFamily: "'Oswald', sans-serif", fontSize: '38px',
            fontWeight: 700, textTransform: 'uppercase', color: '#1a1a1a',
          }}>
            TOP SAFARI DESTINATIONS
          </h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: '220px 220px',
          gap: '16px',
        }}>
          {destinations.map((dest, i) => (
            <div
              key={dest.name}
              onMouseEnter={() => setHovered(dest.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRadius: '8px', overflow: 'hidden',
                cursor: 'pointer', position: 'relative',
                gridRow: i === 0 ? '1 / 3' : 'auto',
                gridColumn: i === 0 ? '1' : 'auto',
                transition: 'transform .3s ease, box-shadow .3s ease',
                transform: hovered === dest.name ? 'scale(1.02)' : 'scale(1)',
                boxShadow: hovered === dest.name ? '0 16px 40px rgba(0,0,0,.2)' : '0 4px 16px rgba(0,0,0,.1)',
              }}
            >
              <img
                src={dest.img}
                alt={dest.name}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  transform: hovered === dest.name ? 'scale(1.07)' : 'scale(1)',
                  transition: 'transform .5s ease',
                }}
              />
              {/* Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: hovered === dest.name
                  ? 'linear-gradient(to top, rgba(0,0,0,.8) 0%, rgba(0,0,0,.2) 60%)'
                  : 'linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 55%)',
                transition: 'background .3s ease',
              }} />
              {/* Text */}
              <div style={{
                position: 'absolute', bottom: '20px', left: '20px',
              }}>
                <div style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: i === 0 ? '28px' : '20px',
                  fontWeight: 700, color: 'white', marginBottom: '4px',
                }}>
                  {dest.name}
                </div>
                <div style={{
                  fontSize: '12px', fontWeight: 700, color: '#f5c518',
                }}>
                  {dest.tours}
                </div>
              </div>

              {/* Hover arrow */}
              {hovered === dest.name && (
                <div style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: '#f5c518', color: '#1a1a1a',
                  width: '32px', height: '32px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', fontWeight: 800,
                }}>
                  →
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Destinations;