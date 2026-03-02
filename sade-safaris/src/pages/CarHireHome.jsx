import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarNavbar from '../components/CarNavbar';
import CarFooter from '../components/CarFooter';
import vehicles from '../data/vehicles';

function CarHireHome() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [withDriver, setWithDriver] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [vehicleType, setVehicleType] = useState('All');

  const featured = vehicles.filter(v => v.available).slice(0, 4);

  const days = pickupDate && returnDate
    ? Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif", background: '#f0f4ff' }}>
      <CarNavbar />

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1a56db 100%)',
        padding: '90px 5% 100px', position: 'relative', overflow: 'hidden',
        minHeight: '90vh', display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: .04,
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <div style={{
          position: 'absolute', top: '-100px', right: '10%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,.25), transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: '60px', alignItems: 'center' }}>

            {/* Left */}
            <div>
              {/* <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(96,165,250,.15)', border: '1px solid rgba(96,165,250,.3)',
                borderRadius: '20px', padding: '6px 16px', marginBottom: '24px',
              }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#60a5fa', display: 'inline-block' }} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#93c5fd', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  NAIROBI'S #1 CAR HIRE SERVICE
                </span>
              </div> */}

              <h1 style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 'clamp(48px, 6vw, 88px)',
                fontWeight: 700, color: 'white',
                textTransform: 'uppercase', lineHeight: .95, marginBottom: '24px',
              }}>
                DRIVE<br />
                <span style={{ color: '#60a5fa' }}>KENYA</span><br />
                YOUR WAY
              </h1>

              <p style={{
                fontSize: '17px', color: 'rgba(255,255,255,.7)',
                lineHeight: 1.8, marginBottom: '40px', maxWidth: '500px',
              }}>
                Premium car hire in Nairobi and across Kenya. Safari 4x4s,
                executive saloons, minibuses and more — with or without a
                professional driver. Transparent pricing, zero hidden fees.
              </p>

              <div style={{ display: 'flex', gap: '40px', marginBottom: '44px' }}>
                {[
                  ['50+', 'Vehicles'],
                  ['10K+', 'Happy Clients'],
                  ['15', 'Years Experience'],
                  ['24/7', 'Support'],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div style={{
                      fontFamily: "'Oswald', sans-serif", fontSize: '36px',
                      fontWeight: 700, color: '#60a5fa', lineHeight: 1,
                    }}>{n}</div>
                    <div style={{
                      fontSize: '11px', fontWeight: 700,
                      color: 'rgba(255,255,255,.45)', letterSpacing: '1px', marginTop: '4px',
                    }}>{l}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate('/car-hire/fleet')}
                  style={{
                    background: '#1a56db', color: 'white',
                    border: '2px solid #60a5fa',
                    padding: '16px 32px', fontSize: '15px', fontWeight: 800,
                    cursor: 'pointer', borderRadius: '8px', fontFamily: 'inherit',
                    letterSpacing: '.5px', transition: 'all .25s',
                    boxShadow: '0 8px 24px rgba(26,86,219,.5)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#60a5fa';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#1a56db';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  BROWSE OUR FLEET →
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  style={{
                    background: 'rgba(255,255,255,.08)', color: 'white',
                    border: '2px solid rgba(255,255,255,.25)',
                    padding: '14px 28px', fontSize: '15px', fontWeight: 700,
                    cursor: 'pointer', borderRadius: '8px', fontFamily: 'inherit',
                    transition: 'all .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.16)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
                >
                  📞 GET A QUOTE
                </button>
              </div>
            </div>

            {/* Right — Booking widget */}
            <div style={{
              background: 'white', borderRadius: '16px',
              padding: '36px', boxShadow: '0 32px 80px rgba(0,0,0,.35)',
            }}>
              <h3 style={{
                fontFamily: "'Oswald', sans-serif", fontSize: '24px',
                fontWeight: 700, textTransform: 'uppercase',
                marginBottom: '4px', color: '#1a1a2e',
              }}>
                BOOK A VEHICLE
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
                Quick & easy — takes less than 2 minutes
              </p>

              <div style={{ marginBottom: '18px' }}>
                <label style={{
                  display: 'block', fontSize: '10px', fontWeight: 800,
                  color: '#1a56db', letterSpacing: '1.5px',
                  textTransform: 'uppercase', marginBottom: '8px',
                }}>
                  RENTAL TYPE
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[{ val: false, label: '🚗 Self Drive' }, { val: true, label: '👨‍✈️ With Driver' }].map(opt => (
                    <button
                      key={String(opt.val)}
                      onClick={() => setWithDriver(opt.val)}
                      style={{
                        flex: 1, padding: '11px', fontSize: '13px', fontWeight: 700,
                        borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit',
                        transition: 'all .2s', border: '2px solid',
                        background: withDriver === opt.val ? '#1a56db' : '#f8fafc',
                        color: withDriver === opt.val ? 'white' : '#64748b',
                        borderColor: withDriver === opt.val ? '#1a56db' : '#e2e8f0',
                        boxShadow: withDriver === opt.val ? '0 4px 12px rgba(26,86,219,.3)' : 'none',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{
                  display: 'block', fontSize: '10px', fontWeight: 800,
                  color: '#1a56db', letterSpacing: '1.5px',
                  textTransform: 'uppercase', marginBottom: '8px',
                }}>
                  🚙 VEHICLE TYPE
                </label>
                <select
                  value={vehicleType}
                  onChange={e => setVehicleType(e.target.value)}
                  style={{
                    width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px',
                    padding: '12px 14px', fontSize: '14px', fontFamily: 'inherit',
                    outline: 'none', cursor: 'pointer', color: '#333', background: '#f8fafc',
                  }}
                  onFocus={e => e.target.style.borderColor = '#1a56db'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                >
                  {['All', 'Safari 4x4', 'SUV', 'Minibus', 'Luxury Van', 'Family Van', 'Saloon'].map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
                {[
                  { label: '📅 PICKUP DATE', value: pickupDate, setter: setPickupDate },
                  { label: '📅 RETURN DATE', value: returnDate, setter: setReturnDate },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{
                      display: 'block', fontSize: '10px', fontWeight: 800,
                      color: '#1a56db', letterSpacing: '1.5px',
                      textTransform: 'uppercase', marginBottom: '6px',
                    }}>
                      {f.label}
                    </label>
                    <input
                      type="date"
                      value={f.value}
                      onChange={e => f.setter(e.target.value)}
                      style={{
                        width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px',
                        padding: '11px 12px', fontSize: '13px', fontFamily: 'inherit',
                        outline: 'none', transition: 'border .2s',
                        colorScheme: 'light', background: '#f8fafc',
                      }}
                      onFocus={e => e.target.style.borderColor = '#1a56db'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                ))}
              </div>

              {days && (
                <div style={{
                  background: '#eff6ff', border: '1px solid #bfdbfe',
                  borderRadius: '8px', padding: '10px 16px', marginBottom: '16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e40af' }}>
                    📆 {days} day{days > 1 ? 's' : ''} rental
                  </span>
                  {withDriver && (
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e40af' }}>
                      +Driver: KES {(2500 * days).toLocaleString()}
                    </span>
                  )}
                </div>
              )}

              <button
                onClick={() => navigate('/car-hire/fleet')}
                style={{
                  width: '100%', padding: '16px', fontSize: '15px', fontWeight: 800,
                  background: 'linear-gradient(135deg, #1a56db, #0e3fa5)',
                  color: 'white', border: 'none', borderRadius: '8px',
                  cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '.5px',
                  transition: 'all .25s', boxShadow: '0 6px 20px rgba(26,86,219,.4)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                SEARCH AVAILABLE VEHICLES →
              </button>

              <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '12px' }}>
                🔒 Free cancellation · No hidden fees · Instant confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{ background: 'white', padding: '32px 5%', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px',
        }}>
          {[
            ['🛡️', 'Fully Insured', 'Comprehensive cover on all vehicles'],
            ['👨‍✈️', 'Licensed Drivers', 'Professional, vetted drivers available'],
            ['✅', 'No Hidden Fees', 'Transparent pricing, always'],
            ['🔧', 'Roadside Assist', '24/7 breakdown support across Kenya'],
          ].map(([icon, title, sub]) => (
            <div key={title} style={{
              display: 'flex', gap: '14px', alignItems: 'center',
              padding: '16px', borderRadius: '10px', transition: 'background .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: '50px', height: '50px', background: '#eff6ff',
                borderRadius: '12px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '22px', flexShrink: 0,
              }}>
                {icon}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#1a1a2e' }}>{title}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED VEHICLES ── */}
      <section style={{ padding: '72px 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '16px',
          }}>
            <div>
              <p style={{
                fontSize: '12px', fontWeight: 800, color: '#1a56db',
                letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '8px',
              }}>
                HANDPICKED FOR YOU
              </p>
              <h2 style={{
                fontFamily: "'Oswald', sans-serif", fontSize: '38px',
                fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase',
              }}>
                FEATURED VEHICLES
              </h2>
            </div>
            <button
              onClick={() => navigate('/car-hire/fleet')}
              style={{
                background: 'transparent', color: '#1a56db',
                border: '2px solid #1a56db', padding: '12px 24px',
                fontSize: '13px', fontWeight: 800, cursor: 'pointer',
                borderRadius: '8px', fontFamily: 'inherit', transition: 'all .2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#1a56db';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1a56db';
              }}
            >
              VIEW ALL VEHICLES →
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {featured.map(vehicle => (
              <div
                key={vehicle.id}
                onClick={() => navigate(`/car-hire/vehicle/${vehicle.id}`)}
                onMouseEnter={() => setHovered(vehicle.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: 'white', borderRadius: '12px', overflow: 'hidden',
                  boxShadow: hovered === vehicle.id ? '0 20px 48px rgba(26,86,219,.15)' : '0 2px 12px rgba(0,0,0,.06)',
                  transform: hovered === vehicle.id ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all .3s ease', cursor: 'pointer',
                  border: hovered === vehicle.id ? '1px solid #bfdbfe' : '1px solid transparent',
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={vehicle.img}
                    alt={vehicle.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transform: hovered === vehicle.id ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform .5s ease',
                    }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 55%)',
                  }} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span style={{
                      background: vehicle.badgeColor, color: 'white',
                      fontSize: '10px', fontWeight: 800, padding: '4px 10px',
                      borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '.5px',
                    }}>
                      {vehicle.badge}
                    </span>
                  </div>
                  <div style={{
                    position: 'absolute', bottom: '12px', left: '12px', right: '12px',
                    display: 'flex', gap: '8px',
                  }}>
                    {[`💺 ${vehicle.seats}`, `⚙️ ${vehicle.transmission}`, `⛽ ${vehicle.fuel}`].map(item => (
                      <span key={item} style={{
                        fontSize: '11px', fontWeight: 700, color: 'white',
                        background: 'rgba(0,0,0,.4)', backdropFilter: 'blur(4px)',
                        padding: '3px 8px', borderRadius: '20px',
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{
                    fontSize: '10px', fontWeight: 800, color: '#1a56db',
                    letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px',
                  }}>
                    {vehicle.type}
                  </div>
                  <h3 style={{
                    fontFamily: "'Oswald', sans-serif", fontSize: '20px',
                    fontWeight: 700, color: '#1a1a2e', marginBottom: '12px',
                  }}>
                    {vehicle.name}
                  </h3>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', paddingTop: '12px',
                    borderTop: '1px solid #f1f5f9',
                  }}>
                    <div>
                      <span style={{ fontSize: '10px', color: '#aaa', display: 'block' }}>FROM</span>
                      <span style={{
                        fontFamily: "'Oswald', sans-serif", fontSize: '24px',
                        fontWeight: 700, color: '#1a56db',
                      }}>
                        KES {vehicle.pricePerDay.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '11px', color: '#aaa' }}> /day</span>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/car-hire/vehicle/${vehicle.id}`); }}
                      style={{
                        background: 'linear-gradient(135deg, #1a56db, #0e3fa5)',
                        color: 'white', border: 'none', padding: '10px 20px',
                        fontSize: '12px', fontWeight: 800, cursor: 'pointer',
                        borderRadius: '6px', fontFamily: 'inherit',
                        boxShadow: '0 4px 12px rgba(26,86,219,.3)', transition: 'all .2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '72px 5%', background: 'white' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <p style={{
              fontSize: '12px', fontWeight: 800, color: '#1a56db',
              letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px',
            }}>
              WHAT WE OFFER
            </p>
            <h2 style={{
              fontFamily: "'Oswald', sans-serif", fontSize: '38px',
              fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase',
            }}>
              OUR SERVICES
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { icon: '🚗', title: 'Self Drive Hire', desc: 'Take the wheel yourself. All vehicles come with comprehensive insurance, GPS, and 24/7 phone support. Valid driving licence required.', cta: 'Browse Fleet', path: '/car-hire/fleet' },
              { icon: '👨‍✈️', title: 'Hire With Driver', desc: 'Sit back and relax. Our professional, licensed, and vetted drivers know every road in Kenya. Add KES 2,500/day to any vehicle.', cta: 'Learn More', path: '/contact' },
              { icon: '✈️', title: 'Airport Transfers', desc: 'Reliable pickups and drop-offs at JKIA, Wilson Airport, and Moi International. Flight tracking included — we wait for you.', cta: 'Book Transfer', path: '/contact' },
              { icon: '🦁', title: 'Safari Vehicle Hire', desc: "Rugged 4x4s with pop-up roofs, fridges, and camping gear for self-drive safari adventures across Kenya's national parks.", cta: 'View 4x4 Fleet', path: '/car-hire/fleet' },
              { icon: '🏢', title: 'Corporate Hire', desc: 'Monthly and long-term hire solutions for businesses. Dedicated fleet manager, invoicing, and priority support included.', cta: 'Get a Quote', path: '/contact' },
              { icon: '🎉', title: 'Events & Weddings', desc: 'Luxury vehicles for your special day. Decorated wedding cars, VIP transport for guests, and full-day chauffeur packages.', cta: 'Enquire Now', path: '/contact' },
            ].map(service => (
              <div
                key={service.title}
                style={{
                  background: '#f8fafc', borderRadius: '12px', padding: '32px',
                  border: '1px solid #e2e8f0', transition: 'all .3s', cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#eff6ff';
                  e.currentTarget.style.borderColor = '#bfdbfe';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(26,86,219,.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '56px', height: '56px', background: '#eff6ff',
                  borderRadius: '14px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '26px', marginBottom: '18px',
                  border: '1px solid #bfdbfe',
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontFamily: "'Oswald', sans-serif", fontSize: '20px',
                  fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', marginBottom: '12px',
                }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.75, marginBottom: '20px' }}>
                  {service.desc}
                </p>
                <button
                  onClick={() => navigate(service.path)}
                  style={{
                    background: 'none', border: 'none', color: '#1a56db',
                    fontSize: '13px', fontWeight: 800, cursor: 'pointer',
                    fontFamily: 'inherit', padding: 0, letterSpacing: '.5px',
                    display: 'flex', alignItems: 'center', gap: '6px', transition: 'gap .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                >
                  {service.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '72px 5%', background: '#f0f4ff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{
              fontSize: '12px', fontWeight: 800, color: '#1a56db',
              letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px',
            }}>
              WHAT OUR CLIENTS SAY
            </p>
            <h2 style={{
              fontFamily: "'Oswald', sans-serif", fontSize: '38px',
              fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase',
            }}>
              TRUSTED BY THOUSANDS
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { name: 'Michael Otieno', role: 'Business Traveller', text: 'Fast Lane has been my go-to for corporate travel for 3 years. Reliable, professional, and always on time. The drivers know Nairobi inside out.', rating: 5, flag: '🇰🇪' },
              { name: 'Emma Richardson', role: 'Tourist from UK', text: 'Hired a Land Cruiser for our self-drive safari to the Mara. Vehicle was in perfect condition, GPS worked great, and the team was incredibly helpful.', rating: 5, flag: '🇬🇧' },
              { name: 'Fatima Al-Hassan', role: 'Wedding Client', text: 'They handled all our wedding transport flawlessly. Beautifully decorated cars, punctual drivers, and such a personal touch. Highly recommend!', rating: 5, flag: '🇦🇪' },
            ].map(t => (
              <div key={t.name} style={{
                background: 'white', borderRadius: '12px', padding: '28px',
                boxShadow: '0 2px 16px rgba(0,0,0,.06)',
                borderTop: '4px solid #1a56db', transition: 'all .3s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(26,86,219,.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,.06)';
                }}
              >
                <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f5c518', fontSize: '16px' }}>★</span>)}
                </div>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '20px' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#1a1a2e' }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{t.role}</div>
                  </div>
                  <span style={{ fontSize: '24px' }}>{t.flag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
        padding: '90px 5%', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: .04,
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <p style={{
            fontSize: '12px', fontWeight: 800, color: '#60a5fa',
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px',
          }}>
            READY TO HIT THE ROAD?
          </p>
          <h2 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 700, color: 'white',
            textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '20px',
          }}>
            YOUR PERFECT VEHICLE<br />
            <span style={{ color: '#60a5fa' }}>IS WAITING FOR YOU</span>
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.65)', lineHeight: 1.75, marginBottom: '40px' }}>
            Book online in minutes or call us directly. Our team is available 7 days a week to get you on the road fast.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/car-hire/fleet')}
              style={{
                background: '#1a56db', color: 'white', border: '2px solid #60a5fa',
                padding: '16px 36px', fontSize: '15px', fontWeight: 800,
                cursor: 'pointer', borderRadius: '8px', fontFamily: 'inherit',
                letterSpacing: '.5px', transition: 'all .25s',
                boxShadow: '0 8px 24px rgba(26,86,219,.5)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#60a5fa';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#1a56db';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              BROWSE THE FLEET →
            </button>
            <button
              onClick={() => navigate('/contact')}
              style={{
                background: 'rgba(255,255,255,.08)', color: 'white',
                border: '2px solid rgba(255,255,255,.3)',
                padding: '14px 32px', fontSize: '15px', fontWeight: 700,
                cursor: 'pointer', borderRadius: '8px', fontFamily: 'inherit',
                transition: 'all .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.16)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
            >
              📞 +254 722 864 021
            </button>
          </div>
        </div>
      </section>

      <CarFooter />
    </div>
  );
}

export default CarHireHome;