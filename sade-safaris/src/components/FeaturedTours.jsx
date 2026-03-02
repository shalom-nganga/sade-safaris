import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tours from '../data/tours';

const categories = ['All', 'Wildlife Safaris', 'Adventures', 'Beach & Coastal', 'Cultural Tours'];

function FeaturedTours() {
  const [activeCat, setActiveCat] = useState('All');
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const filtered = activeCat === 'All' ? tours : tours.filter(t => t.category === activeCat);

  return (
    <section style={{ padding: '72px 5%', background: '#f9f9f7' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: '36px',
          flexWrap: 'wrap', gap: '20px',
        }}>
          <div>
            <p style={{
              fontSize: '12px', fontWeight: 800, color: '#4a9c2f',
              letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '8px',
            }}>
              HANDPICKED EXPERIENCES
            </p>
            <h2 style={{
              fontFamily: "'Oswald', sans-serif", fontSize: '38px',
              fontWeight: 700, color: '#1a1a1a', textTransform: 'uppercase',
            }}>
              FEATURED TOURS & SAFARIS
            </h2>
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button
                key={c}
                onClick={e => { e.stopPropagation(); setActiveCat(c); }}
                style={{
                  fontSize: '12px', fontWeight: 700, padding: '9px 20px',
                  borderRadius: '3px', cursor: 'pointer', fontFamily: 'inherit',
                  letterSpacing: '.3px', transition: 'all .2s',
                  background: activeCat === c ? '#4a9c2f' : 'white',
                  color: activeCat === c ? 'white' : '#555',
                  border: activeCat === c ? '2px solid #4a9c2f' : '2px solid #ddd',
                }}
                onMouseEnter={e => {
                  if (activeCat !== c) {
                    e.currentTarget.style.borderColor = '#4a9c2f';
                    e.currentTarget.style.color = '#4a9c2f';
                  }
                }}
                onMouseLeave={e => {
                  if (activeCat !== c) {
                    e.currentTarget.style.borderColor = '#ddd';
                    e.currentTarget.style.color = '#555';
                  }
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Tour Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          {filtered.map(tour => (
            <div
              key={tour.id}
              onClick={() => navigate(`/tours/${tour.id}`)}
              onMouseEnter={() => setHovered(tour.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: 'white', borderRadius: '8px', overflow: 'hidden',
                boxShadow: hovered === tour.id ? '0 20px 48px rgba(0,0,0,.14)' : '0 2px 12px rgba(0,0,0,.07)',
                transform: hovered === tour.id ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'all .3s ease', cursor: 'pointer',
              }}
            >
              {/* Image */}
              <div style={{ height: '230px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={tour.img}
                  alt={tour.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transform: hovered === tour.id ? 'scale(1.06)' : 'scale(1)',
                    transition: 'transform .5s ease',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 55%)',
                }} />
                {/* Badge */}
                <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                  <span style={{
                    background: '#f5c518', color: '#1a1a1a', fontSize: '10px',
                    fontWeight: 800, letterSpacing: '.5px', padding: '4px 10px',
                    borderRadius: '3px', textTransform: 'uppercase',
                  }}>
                    {tour.badge}
                  </span>
                </div>
                {/* Rating */}
                <div style={{
                  position: 'absolute', top: '14px', right: '14px',
                  background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(8px)',
                  borderRadius: '4px', padding: '5px 10px',
                  fontSize: '12px', fontWeight: 700, color: 'white',
                }}>
                  ⭐ {tour.rating} ({tour.reviews})
                </div>
                {/* Location */}
                <div style={{
                  position: 'absolute', bottom: '14px', left: '14px',
                  fontSize: '13px', fontWeight: 700, color: 'white',
                }}>
                  📍 {tour.location}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '22px' }}>
                <div style={{
                  fontSize: '11px', fontWeight: 700, color: '#4a9c2f',
                  letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px',
                }}>
                  {tour.category}
                </div>
                <h3 style={{
                  fontFamily: "'Oswald', sans-serif", fontSize: '22px',
                  fontWeight: 600, color: '#1a1a1a', marginBottom: '10px',
                }}>
                  {tour.title}
                </h3>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: '18px',
                }}>
                  <div style={{ fontSize: '13px', color: '#888', fontWeight: 600 }}>
                    ⏱ {tour.days}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', color: '#aaa', display: 'block' }}>FROM</span>
                    <span style={{
                      fontFamily: "'Oswald', sans-serif", fontSize: '22px',
                      fontWeight: 700, color: '#4a9c2f',
                    }}>
                      KES {tour.price.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '11px', color: '#aaa' }}> /person</span>
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={e => { e.stopPropagation(); navigate(`/tours/${tour.id}`); }}
                    style={{
                      flex: 1, padding: '11px', fontSize: '12px', fontWeight: 800,
                      background: '#4a9c2f', color: 'white', border: 'none',
                      borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit',
                      letterSpacing: '.5px', transition: 'background .2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#2d6a1a'}
                    onMouseLeave={e => e.currentTarget.style.background = '#4a9c2f'}
                  >
                    BOOK NOW
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); navigate(`/tours/${tour.id}`); }}
                    style={{
                      padding: '11px 16px', fontSize: '12px', fontWeight: 700,
                      background: 'transparent', color: '#4a9c2f',
                      border: '2px solid #4a9c2f', borderRadius: '4px',
                      cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#4a9c2f';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#4a9c2f';
                    }}
                  >
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center', marginTop: '44px' }}>
          <button
            onClick={() => navigate('/tours')}
            style={{
              background: 'transparent', color: '#4a9c2f',
              border: '2px solid #4a9c2f', padding: '14px 40px',
              fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              borderRadius: '4px', fontFamily: 'inherit',
              letterSpacing: '.5px', transition: 'all .25px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#4a9c2f';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#4a9c2f';
            }}
          >
            VIEW ALL TOURS & SAFARIS →
          </button>
        </div>

      </div>
    </section>
  );
}

export default FeaturedTours;