import { useNavigate } from 'react-router-dom';
import CarNavbar from '../components/CarNavbar';
import CarFooter from '../components/CarFooter';

function CarServices() {
  const navigate = useNavigate();

  const services = [
    {
      icon: '🚗', title: 'Self Drive Hire',
      desc: 'Take full control of your journey. Choose from our wide fleet of well-maintained vehicles — from budget saloons to rugged safari 4x4s. All vehicles come with comprehensive insurance, GPS navigation, unlimited mileage, and 24/7 phone support. A valid driving licence is required.',
      features: ['Comprehensive insurance included', 'Unlimited mileage', 'GPS navigation', '24/7 phone support', 'Full tank on collection', 'Free cancellation 24hrs prior'],
      price: 'From KES 3,500/day',
      cta: 'Browse Fleet',
      path: '/car-hire/fleet',
      color: '#1a56db',
    },
    {
      icon: '👨‍✈️', title: 'Hire With Driver',
      desc: 'Sit back, relax, and let one of our professional drivers take the wheel. All our drivers are licensed, vetted, and have extensive knowledge of Kenya\'s roads, traffic patterns, and destinations. Perfect for business travel, airport transfers, and touring.',
      features: ['Licensed & vetted drivers', 'Knowledge of all Kenya routes', 'Punctual & professional', 'Available for full or half days', 'Flight tracking for airport runs', 'Available 7 days a week'],
      price: 'Add KES 2,500/day to any vehicle',
      cta: 'Book With Driver',
      path: '/car-hire/fleet',
      color: '#0e3fa5',
    },
    {
      icon: '✈️', title: 'Airport Transfers',
      desc: 'Start and end your trip stress-free with our reliable airport transfer service. We cover JKIA, Wilson Airport, and Moi International Airport in Mombasa. We track your flight in real time — if you\'re delayed, we wait at no extra charge.',
      features: ['JKIA, Wilson & Moi Airport', 'Real-time flight tracking', 'Meet & greet in arrivals', 'No extra charge for delays', 'Available 24 hours a day', 'Fixed transparent pricing'],
      price: 'From KES 2,500 one way',
      cta: 'Book Transfer',
      path: '/car-hire/contact',
      color: '#1a56db',
    },
    {
      icon: '🦁', title: 'Safari Vehicle Hire',
      desc: 'Explore Kenya\'s breathtaking national parks in the right vehicle. Our safari fleet includes Land Cruisers and Prados with pop-up roofs, jerry cans, camping gear, and fridges. Perfect for self-drive adventures to the Masai Mara, Amboseli, Tsavo, and Samburu.',
      features: ['Pop-up roofs for game viewing', 'High ground clearance 4WDs', 'Camping gear available', 'Fridge & recovery kit', 'GPS with park maps', 'Driver-guides available'],
      price: 'From KES 9,500/day',
      cta: 'View Safari Fleet',
      path: '/car-hire/fleet',
      color: '#4a9c2f',
    },
    {
      icon: '🏢', title: 'Corporate Hire',
      desc: 'We partner with businesses across Nairobi and Kenya to provide reliable, professional transport solutions. Whether you need a single executive vehicle or a full fleet for your team, we offer flexible monthly contracts, dedicated account managers, and priority support.',
      features: ['Monthly & long-term contracts', 'Dedicated fleet manager', 'Invoice & purchase orders accepted', 'Priority 24/7 support line', 'Executive & economy options', 'Flexible scaling up or down'],
      price: 'Custom pricing — contact us',
      cta: 'Get a Quote',
      path: '/car-hire/contact',
      color: '#0e3fa5',
    },
    {
      icon: '🎉', title: 'Events & Weddings',
      desc: 'Make your special day even more memorable with our luxury vehicle hire for weddings and events. We offer beautifully decorated cars, experienced chauffeurs in formal attire, and seamless coordination to ensure your guests arrive in style and on time.',
      features: ['Luxury vehicle selection', 'Decorated wedding cars', 'Chauffeurs in formal attire', 'Full-day packages available', 'Guest transport coordination', 'Flexible pickup locations'],
      price: 'From KES 15,000/day',
      cta: 'Enquire Now',
      path: '/car-hire/contact',
      color: '#9b59b6',
    },
  ];

  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif", background: '#f0f4ff' }}>
      <CarNavbar />

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1a56db 100%)',
        padding: '90px 5%', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: .04,
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ fontSize: '12px', fontWeight: 800, color: '#60a5fa', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
            EVERYTHING WE OFFER
          </p>
          <h1 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 700, color: 'white',
            textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '20px',
          }}>
            OUR SERVICES &<br />
            <span style={{ color: '#60a5fa' }}>SOLUTIONS</span>
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.75)', maxWidth: '560px', lineHeight: 1.75 }}>
            From self-drive rentals to full corporate fleet solutions —
            Fast Lane has the right vehicle and service for every journey.
          </p>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '72px 5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {services.map((service, i) => (
            <div key={service.title} style={{
              background: 'white', borderRadius: '12px', overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,.07)',
              display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
              transition: 'all .3s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(26,86,219,.12)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.07)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Left — color panel */}
              <div style={{
                background: `linear-gradient(135deg, ${service.color}, #0f172a)`,
                padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                order: i % 2 === 0 ? 0 : 1,
              }}>
                <div style={{
                  width: '64px', height: '64px', background: 'rgba(255,255,255,.12)',
                  borderRadius: '16px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '30px', marginBottom: '20px',
                  border: '1px solid rgba(255,255,255,.2)',
                }}>
                  {service.icon}
                </div>
                <h2 style={{
                  fontFamily: "'Oswald', sans-serif", fontSize: '28px',
                  fontWeight: 700, color: 'white', textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  {service.title}
                </h2>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.75)', lineHeight: 1.8, marginBottom: '24px' }}>
                  {service.desc}
                </p>
                <div style={{
                  display: 'inline-block', background: 'rgba(255,255,255,.15)',
                  border: '1px solid rgba(255,255,255,.3)',
                  padding: '10px 18px', borderRadius: '6px', marginBottom: '24px',
                }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#60a5fa' }}>{service.price}</span>
                </div>
                <button
                  onClick={() => navigate(service.path)}
                  style={{
                    background: 'white', color: service.color,
                    border: 'none', padding: '13px 28px', fontSize: '13px',
                    fontWeight: 800, cursor: 'pointer', borderRadius: '6px',
                    fontFamily: 'inherit', letterSpacing: '.5px',
                    transition: 'all .2s', alignSelf: 'flex-start',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {service.cta} →
                </button>
              </div>

              {/* Right — features */}
              <div style={{
                padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                order: i % 2 === 0 ? 1 : 0,
              }}>
                <h3 style={{
                  fontFamily: "'Oswald', sans-serif", fontSize: '20px',
                  fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase',
                  marginBottom: '24px', letterSpacing: '.5px',
                }}>
                  WHAT'S INCLUDED
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {service.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: '#eff6ff', border: `2px solid ${service.color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, fontSize: '12px', fontWeight: 800, color: service.color,
                      }}>
                        ✓
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
        padding: '80px 5%', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ fontSize: '12px', fontWeight: 800, color: '#60a5fa', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px' }}>
            READY TO GET STARTED?
          </p>
          <h2 style={{
            fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700, color: 'white', textTransform: 'uppercase',
            lineHeight: 1.1, marginBottom: '20px',
          }}>
            LET'S GET YOU<br /><span style={{ color: '#60a5fa' }}>ON THE ROAD</span>
          </h2>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/car-hire/fleet')} style={{
              background: '#1a56db', color: 'white', border: '2px solid #60a5fa',
              padding: '16px 36px', fontSize: '15px', fontWeight: 800,
              cursor: 'pointer', borderRadius: '8px', fontFamily: 'inherit',
              letterSpacing: '.5px', transition: 'all .25s',
              boxShadow: '0 8px 24px rgba(26,86,219,.5)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#60a5fa'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1a56db'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              BROWSE FLEET →
            </button>
            <button onClick={() => navigate('/car-hire/contact')} style={{
              background: 'rgba(255,255,255,.08)', color: 'white',
              border: '2px solid rgba(255,255,255,.3)',
              padding: '14px 32px', fontSize: '15px', fontWeight: 700,
              cursor: 'pointer', borderRadius: '8px', fontFamily: 'inherit', transition: 'all .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.16)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
            >
              📞 CONTACT US
            </button>
          </div>
        </div>
      </section>

      <CarFooter />
    </div>
  );
}

export default CarServices;