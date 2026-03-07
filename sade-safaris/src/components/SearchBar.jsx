import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [dest, setDest] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [duration, setDuration] = useState('Any Duration');
  const navigate = useNavigate();

  return (
    <>
      <section style={{ background: '#eaf5e3', padding: '40px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <p style={{
            textAlign: 'center', fontSize: '13px', fontWeight: 700,
            color: '#4a9c2f', letterSpacing: '2px',
            textTransform: 'uppercase', marginBottom: '20px',
          }}>
            ✦ FIND YOUR PERFECT SAFARI ✦
          </p>

          {/* Search Box */}
          <div className="searchbar-box" style={{
            background: 'white', borderRadius: '6px', padding: '8px',
            display: 'flex', gap: '6px', alignItems: 'stretch',
            boxShadow: '0 24px 64px rgba(0,0,0,.12)',
          }}>

            {/* Destination */}
            <div className="searchbar-field" style={{ flex: 2, display: 'flex', flexDirection: 'column', padding: '10px 16px', minWidth: 0 }}>
              <div style={{ fontSize: '9px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '5px' }}>
                📍 Destination
              </div>
              <input
                value={dest}
                onChange={e => setDest(e.target.value)}
                placeholder="Where do you want to go?"
                style={{
                  border: 'none', outline: 'none', fontSize: '14px',
                  fontWeight: 600, color: '#222', fontFamily: 'inherit',
                  background: 'transparent', width: '100%',
                }}
              />
            </div>

            <div className="searchbar-divider" style={{ width: '1px', background: '#eee', alignSelf: 'stretch' }} />

            {/* Date */}
            <div className="searchbar-field" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px 16px', minWidth: 0 }}>
              <div style={{ fontSize: '9px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '5px' }}>
                📅 Travel Date
              </div>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                style={{
                  border: 'none', outline: 'none', fontSize: '14px',
                  fontWeight: 600, color: date ? '#222' : '#bbb',
                  fontFamily: 'inherit', background: 'transparent',
                  colorScheme: 'light', width: '100%',
                }}
              />
            </div>

            <div className="searchbar-divider" style={{ width: '1px', background: '#eee', alignSelf: 'stretch' }} />

            {/* Guests */}
            <div className="searchbar-field" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px 16px', minWidth: 0 }}>
              <div style={{ fontSize: '9px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '5px' }}>
                👥 Guests
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={() => setGuests(g => Math.max(1, g - 1))}
                  style={{
                    width: '26px', height: '26px', borderRadius: '50%',
                    border: '2px solid #4a9c2f', background: 'white',
                    color: '#4a9c2f', fontSize: '16px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, lineHeight: 1, fontFamily: 'inherit', flexShrink: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#4a9c2f'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#4a9c2f'; }}
                >−</button>
                <span style={{ fontSize: '16px', fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>{guests}</span>
                <button onClick={() => setGuests(g => Math.min(20, g + 1))}
                  style={{
                    width: '26px', height: '26px', borderRadius: '50%',
                    border: 'none', background: '#4a9c2f', color: 'white',
                    fontSize: '16px', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, lineHeight: 1, fontFamily: 'inherit', flexShrink: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#2d6a1a'}
                  onMouseLeave={e => e.currentTarget.style.background = '#4a9c2f'}
                >+</button>
              </div>
            </div>

            <div className="searchbar-divider" style={{ width: '1px', background: '#eee', alignSelf: 'stretch' }} />

            {/* Duration */}
            <div className="searchbar-field" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px 16px', minWidth: 0 }}>
              <div style={{ fontSize: '9px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '5px' }}>
                🗓️ Duration
              </div>
              <select value={duration} onChange={e => setDuration(e.target.value)}
                style={{
                  border: 'none', outline: 'none', fontSize: '14px',
                  fontWeight: 600, color: '#222', fontFamily: 'inherit',
                  background: 'transparent', cursor: 'pointer', width: '100%',
                }}
              >
                {['Any Duration', '1–3 Days', '4–6 Days', '7–10 Days', '10+ Days'].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={() => navigate(`/tours?dest=${dest}&date=${date}&guests=${guests}&duration=${duration}`)}
              className="searchbar-btn"
              style={{
                background: '#4a9c2f', color: 'white', border: 'none',
                padding: '0 36px', borderRadius: '4px', fontSize: '14px',
                fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap',
                fontFamily: 'inherit', letterSpacing: '.5px', transition: 'all .25s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#2d6a1a'}
              onMouseLeave={e => e.currentTarget.style.background = '#4a9c2f'}
            >
              SEARCH TOURS
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .searchbar-box {
            flex-direction: column !important;
            gap: 0 !important;
            padding: 0 !important;
          }
          .searchbar-field {
            flex: none !important;
            padding: 14px 16px !important;
            border-bottom: 1px solid #eee;
          }
          .searchbar-divider {
            display: none !important;
          }
          .searchbar-btn {
            margin: 8px !important;
            padding: 14px !important;
            border-radius: 4px !important;
            width: calc(100% - 16px) !important;
          }
        }
      `}</style>
    </>
  );
}

export default SearchBar;