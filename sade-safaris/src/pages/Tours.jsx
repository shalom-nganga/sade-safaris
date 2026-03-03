import { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getTours } from '../store';

const categories = ['All', 'Wildlife Safaris', 'Adventures', 'Beach & Coastal', 'Cultural Tours'];
const durations = ['Any Duration', '1-3 Days', '4-6 Days', '7+ Days'];
const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

function Tours() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [activeCat, setActiveCat] = useState('All');
  const [duration, setDuration] = useState('Any Duration');
  const [sort, setSort] = useState('Default');
  const [maxPrice, setMaxPrice] = useState(150000);
  const [hovered, setHovered] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setTours(getTours());
  }, []);

  // Filter
  let filtered = tours.filter(t => {
    const matchCat = activeCat === 'All' || t.category === activeCat;
    const matchPrice = t.price <= maxPrice;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase());
    const matchDuration = duration === 'Any Duration' ||
      (duration === '1-3 Days' && parseInt(t.days) <= 3) ||
      (duration === '4-6 Days' && parseInt(t.days) >= 4 && parseInt(t.days) <= 6) ||
      (duration === '7+ Days' && parseInt(t.days) >= 7);
    return matchCat && matchPrice && matchSearch && matchDuration;
  });

  // Sort
  if (sort === 'Price: Low to High') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'Price: High to Low') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'Top Rated') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div>
      <TopBar />
      <Navbar />

      {/* Page Header */}
      <section style={{
        position: 'relative', padding: '80px 5%',
        backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1800&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,.75) 0%, rgba(0,0,0,.4) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{
            fontSize: '12px', fontWeight: 800, color: '#f5c518',
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px',
          }}>
            EXPLORE WITH US
          </p>
          <h1 style={{
            fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 700, color: 'white', textTransform: 'uppercase',
            lineHeight: 1.1, marginBottom: '16px',
          }}>
            ALL TOURS & SAFARIS
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.8)', maxWidth: '500px' }}>
            Discover our full collection of handcrafted safari experiences across Kenya and East Africa.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '48px 5%', background: '#f9f9f7' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>

          {/* ── SIDEBAR FILTERS ── */}
          <div>

            {/* Search */}
            <div style={{
              background: 'white', borderRadius: '8px', padding: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,.06)', marginBottom: '20px',
            }}>
              <h3 style={{
                fontFamily: "'Oswald', sans-serif", fontSize: '16px',
                fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px',
                color: '#1a1a1a', borderBottom: '2px solid #f5c518', paddingBottom: '8px',
              }}>
                SEARCH
              </h3>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tours or destinations..."
                style={{
                  width: '100%', border: '2px solid #eee', borderRadius: '4px',
                  padding: '10px 14px', fontSize: '13px', fontFamily: 'inherit',
                  outline: 'none', transition: 'border .2s',
                }}
                onFocus={e => e.target.style.borderColor = '#4a9c2f'}
                onBlur={e => e.target.style.borderColor = '#eee'}
              />
            </div>

            {/* Categories */}
            <div style={{
              background: 'white', borderRadius: '8px', padding: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,.06)', marginBottom: '20px',
            }}>
              <h3 style={{
                fontFamily: "'Oswald', sans-serif", fontSize: '16px',
                fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px',
                color: '#1a1a1a', borderBottom: '2px solid #f5c518', paddingBottom: '8px',
              }}>
                CATEGORY
              </h3>
              {categories.map(c => (
                <div
                  key={c}
                  onClick={() => setActiveCat(c)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '9px 0', cursor: 'pointer', borderBottom: '1px solid #f5f5f5',
                    transition: 'color .2s',
                    color: activeCat === c ? '#4a9c2f' : '#555',
                    fontWeight: activeCat === c ? 800 : 500,
                    fontSize: '13px',
                  }}
                >
                  <div style={{
                    width: '16px', height: '16px', borderRadius: '50%',
                    border: `2px solid ${activeCat === c ? '#4a9c2f' : '#ddd'}`,
                    background: activeCat === c ? '#4a9c2f' : 'white',
                    flexShrink: 0, transition: 'all .2s',
                  }} />
                  {c}
                </div>
              ))}
            </div>

            {/* Duration */}
            <div style={{
              background: 'white', borderRadius: '8px', padding: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,.06)', marginBottom: '20px',
            }}>
              <h3 style={{
                fontFamily: "'Oswald', sans-serif", fontSize: '16px',
                fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px',
                color: '#1a1a1a', borderBottom: '2px solid #f5c518', paddingBottom: '8px',
              }}>
                DURATION
              </h3>
              {durations.map(d => (
                <div
                  key={d}
                  onClick={() => setDuration(d)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '9px 0', cursor: 'pointer', borderBottom: '1px solid #f5f5f5',
                    color: duration === d ? '#4a9c2f' : '#555',
                    fontWeight: duration === d ? 800 : 500,
                    fontSize: '13px', transition: 'color .2s',
                  }}
                >
                  <div style={{
                    width: '16px', height: '16px', borderRadius: '3px',
                    border: `2px solid ${duration === d ? '#4a9c2f' : '#ddd'}`,
                    background: duration === d ? '#4a9c2f' : 'white',
                    flexShrink: 0, transition: 'all .2s',
                  }} />
                  {d}
                </div>
              ))}
            </div>

            {/* Max Price */}
            <div style={{
              background: 'white', borderRadius: '8px', padding: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,.06)',
            }}>
              <h3 style={{
                fontFamily: "'Oswald', sans-serif", fontSize: '16px',
                fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px',
                color: '#1a1a1a', borderBottom: '2px solid #f5c518', paddingBottom: '8px',
              }}>
                MAX PRICE
              </h3>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#4a9c2f' }}>
                  Up to KES {maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="150000"
                step="5000"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#4a9c2f', cursor: 'pointer' }}
              />
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: '11px', color: '#aaa', marginTop: '4px',
              }}>
                <span>KES 20,000</span>
                <span>KES 150,000</span>
              </div>
            </div>

          </div>

          {/* ── TOURS GRID ── */}
          <div>

            {/* Top bar */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px',
            }}>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#555' }}>
                Showing <span style={{ color: '#4a9c2f' }}>{filtered.length}</span> tours
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '13px', color: '#888' }}>Sort by:</span>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  style={{
                    border: '2px solid #eee', borderRadius: '4px', padding: '8px 12px',
                    fontSize: '13px', fontFamily: 'inherit', fontWeight: 600,
                    outline: 'none', cursor: 'pointer', color: '#333',
                  }}
                >
                  {sortOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Cards */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', marginBottom: '8px', color: '#555' }}>
                  NO TOURS FOUND
                </h3>
                <p>Try adjusting your filters</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
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
                      transform: hovered === tour.id ? 'translateY(-6px)' : 'translateY(0)',
                      transition: 'all .3s ease', cursor: 'pointer',
                    }}
                  >
                    {/* Image */}
                    <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
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
                      <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                        <span style={{
                          background: '#f5c518', color: '#1a1a1a', fontSize: '10px',
                          fontWeight: 800, padding: '4px 10px', borderRadius: '3px',
                          textTransform: 'uppercase', letterSpacing: '.5px',
                        }}>
                          {tour.badge}
                        </span>
                      </div>
                      <div style={{
                        position: 'absolute', top: '12px', right: '12px',
                        background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(8px)',
                        borderRadius: '4px', padding: '4px 8px',
                        fontSize: '12px', fontWeight: 700, color: 'white',
                      }}>
                        ⭐ {tour.rating}
                      </div>
                      <div style={{
                        position: 'absolute', bottom: '12px', left: '12px',
                        fontSize: '12px', fontWeight: 700, color: 'white',
                      }}>
                        📍 {tour.location}
                      </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '20px' }}>
                      <div style={{
                        fontSize: '10px', fontWeight: 800, color: '#4a9c2f',
                        letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px',
                      }}>
                        {tour.category}
                      </div>
                      <h3 style={{
                        fontFamily: "'Oswald', sans-serif", fontSize: '20px',
                        fontWeight: 600, color: '#1a1a1a', marginBottom: '10px',
                      }}>
                        {tour.title}
                      </h3>

                      {/* Meta */}
                      <div style={{
                        display: 'flex', gap: '16px', marginBottom: '14px',
                        fontSize: '12px', color: '#888', fontWeight: 600,
                      }}>
                        <span>⏱ {tour.days}</span>
                        <span>👥 {tour.groupSize}</span>
                        <span>🏃 {tour.difficulty}</span>
                      </div>

                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: '16px',
                      }}>
                        <div>
                          <span style={{ fontSize: '10px', color: '#aaa', display: 'block' }}>FROM</span>
                          <span style={{
                            fontFamily: "'Oswald', sans-serif", fontSize: '22px',
                            fontWeight: 700, color: '#4a9c2f',
                          }}>
                            KES {tour.price.toLocaleString()}
                          </span>
                          <span style={{ fontSize: '11px', color: '#aaa' }}> /person</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#888' }}>
                          ({tour.reviews} reviews)
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
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
                          DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Tours;