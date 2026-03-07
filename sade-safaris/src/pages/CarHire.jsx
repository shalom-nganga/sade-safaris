import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarNavbar from '../components/CarNavbar';
import CarFooter from '../components/CarFooter';
import vehicles from '../data/vehicles';

const types = ['All', 'Safari 4x4', 'SUV', 'Minibus', 'Luxury Van', 'Family Van', 'Saloon'];
const seats = ['Any', '1-5', '6-9', '10+'];
const transmissions = ['Any', 'Automatic', 'Manual'];
const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low'];

function CarHire() {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState('All');
  const [activeSeat, setActiveSeat] = useState('Any');
  const [activeTransmission, setActiveTransmission] = useState('Any');
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sort, setSort] = useState('Default');
  const [hovered, setHovered] = useState(null);
  const [withDriver, setWithDriver] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  let filtered = vehicles.filter(v => {
    const matchType = activeType === 'All' || v.type === activeType;
    const matchPrice = v.pricePerDay <= maxPrice;
    const matchSeat = activeSeat === 'Any' || (activeSeat === '1-5' && v.seats <= 5) || (activeSeat === '6-9' && v.seats >= 6 && v.seats <= 9) || (activeSeat === '10+' && v.seats >= 10);
    const matchTrans = activeTransmission === 'Any' || v.transmission === activeTransmission;
    return matchType && matchPrice && matchSeat && matchTrans;
  });

  if (sort === 'Price: Low to High') filtered = [...filtered].sort((a, b) => a.pricePerDay - b.pricePerDay);
  if (sort === 'Price: High to Low') filtered = [...filtered].sort((a, b) => b.pricePerDay - a.pricePerDay);

  const days = pickupDate && returnDate ? Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))) : 1;

  return (
    <>
      <div style={{ fontFamily: "'Nunito Sans', sans-serif", background: '#f0f4ff' }}>
        <CarNavbar />

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1a56db 100%)', padding: '80px 5% 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: .05, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div className="carhire-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

              {/* Left */}
              <div style={{ paddingBottom: '60px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.1)', borderRadius: '20px', padding: '6px 16px', marginBottom: '20px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#60a5fa', display: 'inline-block' }} />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,.8)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>NAIROBI'S #1 CAR HIRE SERVICE</span>
                </div>
                <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 700, color: 'white', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '20px' }}>
                  DRIVE KENYA<br /><span style={{ color: '#60a5fa' }}>YOUR WAY</span>
                </h1>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.75)', lineHeight: 1.8, marginBottom: '36px', maxWidth: '460px' }}>
                  From rugged safari 4x4s to sleek executive saloons — hire the perfect vehicle for any journey across Kenya. With or without a driver.
                </p>
                <div className="carhire-stats" style={{ display: 'flex', gap: '32px', marginBottom: '36px', flexWrap: 'wrap' }}>
                  {[['50+', 'Vehicles'], ['10K+', 'Happy Clients'], ['24/7', 'Support']].map(([n, l]) => (
                    <div key={l}>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '32px', fontWeight: 700, color: '#60a5fa', lineHeight: 1 }}>{n}</div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,.5)', letterSpacing: '1px', marginTop: '2px' }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div className="carhire-hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button style={{ background: '#1a56db', color: 'white', border: '2px solid #60a5fa', padding: '14px 28px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', borderRadius: '6px', fontFamily: 'inherit', letterSpacing: '.5px', transition: 'all .25s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#60a5fa'}
                    onMouseLeave={e => e.currentTarget.style.background = '#1a56db'}
                  >BROWSE FLEET ↓</button>
                  <button onClick={() => navigate('/contact')} style={{ background: 'rgba(255,255,255,.1)', color: 'white', border: '2px solid rgba(255,255,255,.3)', padding: '14px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', borderRadius: '6px', fontFamily: 'inherit', transition: 'all .2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
                  >📞 CALL US</button>
                </div>
              </div>

              {/* Booking widget */}
              <div className="carhire-widget" style={{ paddingBottom: '40px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 24px 64px rgba(0,0,0,.3)' }}>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: '#1a1a2e' }}>CHECK AVAILABILITY</h3>
                  <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>Find your perfect vehicle in seconds</p>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>RENTAL TYPE</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[{ val: false, label: '🚗 Self Drive' }, { val: true, label: '👨‍✈️ With Driver' }].map(opt => (
                        <button key={String(opt.val)} onClick={() => setWithDriver(opt.val)} style={{ flex: 1, padding: '11px', fontSize: '13px', fontWeight: 700, borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', border: '2px solid', background: withDriver === opt.val ? '#1a56db' : 'white', color: withDriver === opt.val ? 'white' : '#555', borderColor: withDriver === opt.val ? '#1a56db' : '#e2e8f0' }}>{opt.label}</button>
                      ))}
                    </div>
                  </div>
                  {[{ label: '📅 PICKUP DATE', value: pickupDate, setter: setPickupDate }, { label: '📅 RETURN DATE', value: returnDate, setter: setReturnDate }].map(f => (
                    <div key={f.label} style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{f.label}</label>
                      <input type="date" value={f.value} onChange={e => f.setter(e.target.value)} style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '6px', padding: '11px 14px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', transition: 'border .2s', colorScheme: 'light', boxSizing: 'border-box' }}
                        onFocus={e => e.target.style.borderColor = '#1a56db'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                    </div>
                  ))}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>🚙 VEHICLE TYPE</label>
                    <select value={activeType} onChange={e => setActiveType(e.target.value)} style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '6px', padding: '11px 14px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', cursor: 'pointer', color: '#333' }}
                      onFocus={e => e.target.style.borderColor = '#1a56db'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}>
                      {types.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  {pickupDate && returnDate && (
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '12px 16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e40af' }}>📆 {days} day{days > 1 ? 's' : ''} rental</span>
                      {withDriver && <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e40af' }}>+ Driver: KES {(2500 * days).toLocaleString()}</span>}
                    </div>
                  )}
                  <button style={{ width: '100%', padding: '15px', fontSize: '14px', fontWeight: 800, background: 'linear-gradient(135deg, #1a56db, #0e3fa5)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '.5px', transition: 'all .25s', boxShadow: '0 4px 16px rgba(26,86,219,.4)' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >SEARCH AVAILABLE VEHICLES →</button>
                  <p style={{ fontSize: '11px', color: '#aaa', textAlign: 'center', marginTop: '12px' }}>Free cancellation up to 24 hours before pickup</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section style={{ background: 'white', padding: '28px 5%', borderBottom: '1px solid #e2e8f0' }}>
          <div className="carhire-trust" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[['🛡️', 'Fully Insured', 'Comprehensive cover on all vehicles'], ['👨‍✈️', 'Licensed Drivers', 'Professional, vetted drivers available'], ['✅', 'No Hidden Fees', 'Transparent pricing, always'], ['🔧', 'Roadside Assist', '24/7 breakdown support across Kenya']].map(([icon, title, sub]) => (
              <div key={title} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '16px', borderRadius: '8px', transition: 'background .2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: '48px', height: '48px', background: '#eff6ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#1a1a2e' }}>{title}</div>
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FLEET SECTION */}
        <section style={{ padding: '64px 5%' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 800, color: '#1a56db', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '8px' }}>CHOOSE YOUR RIDE</p>
                <h2 className="carhire-fleet-title" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '38px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase' }}>OUR FLEET</h2>
              </div>
              <div className="carhire-type-filters" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {types.map(t => (
                  <button key={t} onClick={() => setActiveType(t)} style={{ fontSize: '12px', fontWeight: 700, padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', background: activeType === t ? '#1a56db' : 'white', color: activeType === t ? 'white' : '#555', border: activeType === t ? '2px solid #1a56db' : '2px solid #e2e8f0', boxShadow: activeType === t ? '0 4px 12px rgba(26,86,219,.3)' : 'none' }}>{t}</button>
                ))}
              </div>
            </div>

            {/* Mobile filter toggle */}
            <button className="carhire-filter-toggle" onClick={() => setShowFilters(!showFilters)} style={{ display: 'none', width: '100%', padding: '13px', fontSize: '13px', fontWeight: 800, background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '16px' }}>
              {showFilters ? '✕ HIDE FILTERS' : '⚙️ SHOW FILTERS'}
            </button>

            {/* Filters row */}
            <div className={`carhire-filters${showFilters ? ' carhire-filters-open' : ''}`} style={{ background: 'white', borderRadius: '10px', padding: '20px 24px', boxShadow: '0 2px 12px rgba(0,0,0,.05)', marginBottom: '32px', display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>SEATS</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {seats.map(s => (
                    <button key={s} onClick={() => setActiveSeat(s)} style={{ padding: '6px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', border: '1.5px solid', background: activeSeat === s ? '#1a56db' : 'white', color: activeSeat === s ? 'white' : '#555', borderColor: activeSeat === s ? '#1a56db' : '#e2e8f0' }}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="carhire-divider" style={{ width: '1px', height: '40px', background: '#e2e8f0' }} />
              <div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>TRANSMISSION</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {transmissions.map(t => (
                    <button key={t} onClick={() => setActiveTransmission(t)} style={{ padding: '6px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', border: '1.5px solid', background: activeTransmission === t ? '#1a56db' : 'white', color: activeTransmission === t ? 'white' : '#555', borderColor: activeTransmission === t ? '#1a56db' : '#e2e8f0' }}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="carhire-divider" style={{ width: '1px', height: '40px', background: '#e2e8f0' }} />
              <div style={{ flex: 1, minWidth: '180px' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>MAX: KES {maxPrice.toLocaleString()}/DAY</div>
                <input type="range" min="3000" max="20000" step="500" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} style={{ width: '100%', accentColor: '#1a56db', cursor: 'pointer' }} />
              </div>
              <div className="carhire-divider" style={{ width: '1px', height: '40px', background: '#e2e8f0' }} />
              <div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>SORT BY</div>
                <select value={sort} onChange={e => setSort(e.target.value)} style={{ border: '1.5px solid #e2e8f0', borderRadius: '4px', padding: '7px 12px', fontSize: '12px', fontFamily: 'inherit', fontWeight: 700, outline: 'none', cursor: 'pointer', color: '#333' }}>
                  {sortOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: '13px', fontWeight: 700, color: '#888' }}>
                <span style={{ color: '#1a56db' }}>{filtered.length}</span> vehicles found
              </div>
            </div>

            {/* Vehicle Cards */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚗</div>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', marginBottom: '8px', color: '#555' }}>NO VEHICLES FOUND</h3>
                <p>Try adjusting your filters</p>
              </div>
            ) : (
              <div className="carhire-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {filtered.map(vehicle => (
                  <div key={vehicle.id} onClick={() => navigate(`/car-hire/vehicle/${vehicle.id}`)} onMouseEnter={() => setHovered(vehicle.id)} onMouseLeave={() => setHovered(null)}
                    style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: hovered === vehicle.id ? '0 20px 48px rgba(26,86,219,.15)' : '0 2px 12px rgba(0,0,0,.06)', transform: hovered === vehicle.id ? 'translateY(-6px)' : 'translateY(0)', transition: 'all .3s ease', cursor: 'pointer', opacity: vehicle.available ? 1 : 0.65, border: hovered === vehicle.id ? '1px solid #bfdbfe' : '1px solid transparent' }}
                  >
                    <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                      <img src={vehicle.img} alt={vehicle.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered === vehicle.id ? 'scale(1.06)' : 'scale(1)', transition: 'transform .5s ease' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 55%)' }} />
                      <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                        <span style={{ background: vehicle.badgeColor, color: 'white', fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '.5px' }}>{vehicle.badge}</span>
                      </div>
                      {!vehicle.available && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ background: '#e74c3c', color: 'white', fontSize: '14px', fontWeight: 800, padding: '8px 20px', borderRadius: '4px', letterSpacing: '1px' }}>CURRENTLY UNAVAILABLE</span>
                        </div>
                      )}
                      <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {[`💺 ${vehicle.seats}`, `⚙️ ${vehicle.transmission}`, `⛽ ${vehicle.fuel}`].map(item => (
                          <span key={item} style={{ fontSize: '11px', fontWeight: 700, color: 'white', background: 'rgba(0,0,0,.4)', backdropFilter: 'blur(4px)', padding: '3px 8px', borderRadius: '20px' }}>{item}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: '20px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{vehicle.type}</div>
                      <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', fontWeight: 700, color: '#1a1a2e', marginBottom: '12px' }}>{vehicle.name}</h3>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {vehicle.features.slice(0, 4).map(f => (
                          <span key={f} style={{ fontSize: '10px', fontWeight: 700, color: '#444', background: '#f0f4ff', padding: '3px 8px', borderRadius: '20px', border: '1px solid #e0e7ff' }}>{f}</span>
                        ))}
                        {vehicle.features.length > 4 && <span style={{ fontSize: '10px', fontWeight: 700, color: '#1a56db', background: '#eff6ff', padding: '3px 8px', borderRadius: '20px', border: '1px solid #bfdbfe' }}>+{vehicle.features.length - 4}</span>}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #f1f5f9', marginBottom: '14px' }}>
                        <div>
                          <span style={{ fontSize: '10px', color: '#aaa', display: 'block' }}>FROM</span>
                          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '26px', fontWeight: 700, color: '#1a56db' }}>KES {(withDriver ? vehicle.pricePerDay + 2500 : vehicle.pricePerDay).toLocaleString()}</span>
                          <span style={{ fontSize: '11px', color: '#aaa' }}> /day</span>
                        </div>
                        {pickupDate && returnDate && (
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '10px', color: '#aaa', display: 'block' }}>{days} DAYS TOTAL</span>
                            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, color: '#0e3fa5' }}>KES {((withDriver ? vehicle.pricePerDay + 2500 : vehicle.pricePerDay) * days).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={e => { e.stopPropagation(); navigate(`/car-hire/vehicle/${vehicle.id}`); }} disabled={!vehicle.available}
                          style={{ flex: 1, padding: '11px', fontSize: '12px', fontWeight: 800, background: vehicle.available ? 'linear-gradient(135deg, #1a56db, #0e3fa5)' : '#e2e8f0', color: vehicle.available ? 'white' : '#aaa', border: 'none', borderRadius: '6px', cursor: vehicle.available ? 'pointer' : 'not-allowed', fontFamily: 'inherit', letterSpacing: '.5px', boxShadow: vehicle.available ? '0 4px 12px rgba(26,86,219,.3)' : 'none', transition: 'all .2s' }}>
                          {vehicle.available ? 'BOOK NOW' : 'UNAVAILABLE'}
                        </button>
                        <button onClick={e => { e.stopPropagation(); navigate(`/car-hire/vehicle/${vehicle.id}`); }}
                          style={{ padding: '11px 16px', fontSize: '12px', fontWeight: 700, background: 'transparent', color: '#1a56db', border: '2px solid #1a56db', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#1a56db'; e.currentTarget.style.color = 'white'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a56db'; }}
                        >DETAILS</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '80px 5%', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, color: '#60a5fa', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px' }}>NEED HELP CHOOSING?</p>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 700, color: 'white', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '20px' }}>
              LET US FIND YOUR<br /><span style={{ color: '#60a5fa' }}>PERFECT VEHICLE</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.7)', lineHeight: 1.75, marginBottom: '36px' }}>
              Our team is available 7 days a week to help you choose the right vehicle and arrange pickups, drivers, and custom itineraries.
            </p>
            <div className="carhire-cta-btns" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/contact')} style={{ background: '#1a56db', color: 'white', border: '2px solid #60a5fa', padding: '16px 36px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', borderRadius: '6px', fontFamily: 'inherit', letterSpacing: '.5px', transition: 'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#60a5fa'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1a56db'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >CONTACT US →</button>
              <button style={{ background: 'rgba(255,255,255,.08)', color: 'white', border: '2px solid rgba(255,255,255,.3)', padding: '14px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', borderRadius: '6px', fontFamily: 'inherit', transition: 'all .2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.16)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
              >📞 +254 722 864 021</button>
            </div>
          </div>
        </section>

        <CarFooter />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .carhire-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .carhire-widget { padding-bottom: 0 !important; }
          .carhire-widget > div { max-width: 540px !important; }
          .carhire-trust { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .carhire-filter-toggle { display: block !important; }
          .carhire-filters { display: none !important; flex-direction: column !important; align-items: flex-start !important; }
          .carhire-filters.carhire-filters-open { display: flex !important; }
          .carhire-divider { display: none !important; }
          .carhire-type-filters { overflow-x: auto; flex-wrap: nowrap !important; padding-bottom: 8px; width: 100%; }
          .carhire-fleet-title { font-size: 28px !important; }
        }
        @media (max-width: 600px) {
          .carhire-cards { grid-template-columns: 1fr !important; }
          .carhire-trust { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .carhire-stats { gap: 20px !important; }
          .carhire-hero-btns button { width: 100% !important; }
          .carhire-cta-btns button { width: 100% !important; }
        }
      `}</style>
    </>
  );
}

export default CarHire;