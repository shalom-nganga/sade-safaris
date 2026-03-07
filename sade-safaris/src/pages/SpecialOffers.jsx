import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getOffers } from '../store';

const staticOffers = [
  { id: 1, title: 'Early Bird Masai Mara', originalPrice: 85000, offerPrice: 63750, discount: '25% OFF', validUntil: '31 March 2026', badge: '🔥 Hot Deal', badgeColor: '#e74c3c', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', days: '5 Days / 4 Nights', location: 'Masai Mara, Kenya', desc: 'Book our iconic Masai Mara Safari 60 days in advance and save 25%. Same luxury experience, unbeatable price.', includes: ['All accommodation', 'Full board meals', 'Game drives', 'Park fees', 'Airport transfers'], tag: 'Early Bird' },
  { id: 2, title: "Couple's Diani Escape", originalPrice: 130000, offerPrice: 104000, discount: '20% OFF', validUntil: '28 February 2026', badge: '💑 Couples Special', badgeColor: '#e91e8c', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', days: '4 Days / 3 Nights', location: 'Diani Beach, Mombasa', desc: 'A romantic beach getaway for two — private beach hotel, sunset dhow cruise, and candlelit dinners included.', includes: ['Beachfront room for 2', 'Daily breakfast', 'Sunset dhow cruise', 'Candlelit dinner', 'Snorkeling trip'], tag: 'Couples' },
  { id: 3, title: 'Family Safari Bundle', originalPrice: 280000, offerPrice: 210000, discount: '25% OFF', validUntil: '30 April 2026', badge: '👨‍👩‍👧‍👦 Family Deal', badgeColor: '#4a9c2f', img: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=800&q=80', days: '6 Days / 5 Nights', location: 'Masai Mara + Amboseli', desc: 'The ultimate family safari combining Masai Mara wildlife with Amboseli elephant herds. Kids under 12 go FREE.', includes: ['Family lodge accommodation', 'All meals', 'Game drives', 'Maasai village visit', 'Kids under 12 free'], tag: 'Family' },
  { id: 4, title: 'Last Minute Nakuru', originalPrice: 38000, offerPrice: 26600, discount: '30% OFF', validUntil: '15 March 2026', badge: '⚡ Last Minute', badgeColor: '#f5a623', img: 'https://images.unsplash.com/photo-1559827291-72f56e1e8f8d?w=800&q=80', days: '2 Days / 1 Night', location: 'Lake Nakuru', desc: 'Snap up this last-minute deal on our popular Lake Nakuru flamingo safari. Limited spots available — book today!', includes: ['Lodge accommodation', 'All meals', 'Game drives', 'Park fees', 'Nairobi transfers'], tag: 'Last Minute' },
  { id: 5, title: 'Group Safari Discount', originalPrice: 85000, offerPrice: 59500, discount: '30% OFF', validUntil: '31 December 2026', badge: '👥 Group Offer', badgeColor: '#2d6a1a', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', days: '5 Days / 4 Nights', location: 'Masai Mara, Kenya', desc: 'Travelling with 8 or more people? Get 30% off any safari package. Perfect for corporates, schools, and large families.', includes: ['All accommodation', 'Full board', 'Dedicated guide', 'Private vehicle', 'Flexible itinerary'], tag: 'Group' },
  { id: 6, title: 'Honeymoon Safari Package', originalPrice: 180000, offerPrice: 144000, discount: '20% OFF', validUntil: '30 June 2026', badge: '💍 Honeymoon', badgeColor: '#9b59b6', img: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&q=80', days: '7 Days / 6 Nights', location: 'Mara + Diani', desc: 'Start your forever with the trip of a lifetime — luxury tented camps in the Mara followed by a private beach villa in Diani.', includes: ['Luxury accommodation', 'All meals', 'Private game drives', 'Couples spa treatment', 'Champagne on arrival'], tag: 'Honeymoon' },
];

const staticTags = ['All', 'Early Bird', 'Couples', 'Family', 'Last Minute', 'Group', 'Honeymoon'];

function SpecialOffers() {
  const navigate = useNavigate();
  const [dynamicOffers, setDynamicOffers] = useState([]);
  const [activeTag, setActiveTag] = useState('All');
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    async function load() {
      const all = await getOffers();
      setDynamicOffers(all.filter(o => o.status === 'Active'));
    }
    load();
  }, []);

  const allOffers = [...dynamicOffers, ...staticOffers.filter(so => !dynamicOffers.find(d => d.id === so.id))];
  const dynamicTags = dynamicOffers.map(o => o.tag).filter(Boolean);
  const allTags = ['All', ...new Set([...dynamicTags, ...staticTags.slice(1)])];
  const filtered = activeTag === 'All' ? allOffers : allOffers.filter(o => o.tag === activeTag);
  const getField = (offer, dynamic, stat) => offer[dynamic] !== undefined ? offer[dynamic] : offer[stat];

  return (
    <>
      <div>
        <TopBar />
        <Navbar />

        {/* HERO */}
        <section style={{ position: 'relative', padding: '100px 5%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(.3)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(45,106,26,.75), transparent)' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, color: '#f5c518', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>LIMITED TIME DEALS</p>
            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(32px, 6vw, 80px)', fontWeight: 700, color: 'white', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '20px' }}>
              SPECIAL OFFERS &<br /><span style={{ color: '#f5c518' }}>EXCLUSIVE DEALS</span>
            </h1>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.85)', maxWidth: '560px', lineHeight: 1.75 }}>
              Incredible safari experiences at unbeatable prices. These deals are time-limited — don't miss out on your dream African adventure.
            </p>
          </div>
        </section>

        {/* URGENCY STRIP */}
        <section style={{ background: '#e74c3c', padding: '16px 5%' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap', textAlign: 'center' }}>
            <span style={{ fontSize: '20px' }}>⏰</span>
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'white', letterSpacing: '.5px' }}>HURRY! These deals are selling fast. Limited availability on all offers.</span>
            <button onClick={() => navigate('/contact')} style={{ background: 'white', color: '#e74c3c', border: 'none', padding: '8px 20px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit', letterSpacing: '.5px' }}>CLAIM YOUR DEAL →</button>
          </div>
        </section>

        {/* OFFERS GRID */}
        <section style={{ padding: '72px 5%', background: '#f9f9f7' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

            <div className="offers-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '8px' }}>SAVE BIG ON SAFARI</p>
                <h2 className="offers-title" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '38px', fontWeight: 700, color: '#1a1a1a', textTransform: 'uppercase' }}>CURRENT DEALS</h2>
              </div>
              <div className="offers-tags" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {allTags.map(t => (
                  <button key={t} onClick={() => setActiveTag(t)} style={{ fontSize: '12px', fontWeight: 700, padding: '9px 18px', borderRadius: '3px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', background: activeTag === t ? '#4a9c2f' : 'white', color: activeTag === t ? 'white' : '#555', border: activeTag === t ? '2px solid #4a9c2f' : '2px solid #ddd' }}
                    onMouseEnter={e => { if (activeTag !== t) { e.currentTarget.style.borderColor = '#4a9c2f'; e.currentTarget.style.color = '#4a9c2f'; } }}
                    onMouseLeave={e => { if (activeTag !== t) { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#555'; } }}
                  >{t}</button>
                ))}
              </div>
            </div>

            <div className="offers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
              {filtered.map(offer => {
                const originalPrice = getField(offer, 'original_price', 'originalPrice');
                const offerPrice = getField(offer, 'offer_price', 'offerPrice');
                const validUntil = getField(offer, 'valid_until', 'validUntil');
                const desc = getField(offer, 'description', 'desc');
                const location = offer.location || '';
                const days = offer.days || '';

                return (
                  <div key={offer.id} onMouseEnter={() => setHovered(offer.id)} onMouseLeave={() => setHovered(null)}
                    style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: hovered === offer.id ? '0 20px 48px rgba(0,0,0,.14)' : '0 2px 12px rgba(0,0,0,.07)', transform: hovered === offer.id ? 'translateY(-8px)' : 'translateY(0)', transition: 'all .3s ease', cursor: 'pointer' }}
                  >
                    <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                      {offer.img ? (
                        <img src={offer.img} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered === offer.id ? 'scale(1.06)' : 'scale(1)', transition: 'transform .5s ease' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🎁</div>
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 55%)' }} />
                      <div style={{ position: 'absolute', top: '14px', left: '14px', background: '#e74c3c', color: 'white', fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 700, padding: '6px 14px', borderRadius: '4px' }}>{offer.discount}</div>
                      {offer.badge && <div style={{ position: 'absolute', top: '14px', right: '14px', background: offer.badgeColor || '#4a9c2f', color: 'white', fontSize: '11px', fontWeight: 800, letterSpacing: '.5px', padding: '5px 12px', borderRadius: '3px', textTransform: 'uppercase' }}>{offer.badge}</div>}
                      <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                          {location && <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,.8)' }}>📍 {location}</div>}
                          {days && <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,.8)', marginTop: '2px' }}>⏱ {days}</div>}
                        </div>
                        {(originalPrice || offerPrice) && (
                          <div style={{ background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(8px)', borderRadius: '4px', padding: '5px 10px', textAlign: 'right' }}>
                            {originalPrice && <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.6)', textDecoration: 'line-through' }}>KES {Number(originalPrice).toLocaleString()}</div>}
                            {offerPrice && <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, color: '#f5c518' }}>KES {Number(offerPrice).toLocaleString()}</div>}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ padding: '24px' }}>
                      <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1a1a1a', marginBottom: '10px' }}>{offer.title}</h3>
                      <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.7, marginBottom: '16px' }}>{desc}</p>
                      {(offer.includes || []).length > 0 && (
                        <div style={{ marginBottom: '16px' }}>
                          {offer.includes.map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: '#555', marginBottom: '5px' }}>
                              <span style={{ color: '#4a9c2f', fontWeight: 800, flexShrink: 0 }}>✓</span>{item}
                            </div>
                          ))}
                        </div>
                      )}
                      {validUntil && (
                        <div style={{ background: '#fff8e1', border: '1px solid #f5c518', borderRadius: '4px', padding: '8px 14px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '14px' }}>⏰</span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#b8860b' }}>OFFER VALID UNTIL: {validUntil}</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => navigate('/contact')} style={{ flex: 1, padding: '13px', fontSize: '13px', fontWeight: 800, background: '#4a9c2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '.5px' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#2d6a1a'}
                          onMouseLeave={e => e.currentTarget.style.background = '#4a9c2f'}
                        >CLAIM THIS OFFER →</button>
                        <button onClick={() => navigate('/tours')} style={{ padding: '13px 16px', fontSize: '12px', fontWeight: 700, background: 'transparent', color: '#4a9c2f', border: '2px solid #4a9c2f', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#4a9c2f'; e.currentTarget.style.color = 'white'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4a9c2f'; }}
                        >VIEW TOUR</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section style={{ padding: '72px 5%', background: '#2d6a1a' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, color: '#f5c518', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>NEVER MISS A DEAL</p>
            <h2 className="offers-newsletter-title" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '38px', fontWeight: 700, color: 'white', textTransform: 'uppercase', marginBottom: '16px' }}>
              GET EXCLUSIVE OFFERS<br />IN YOUR INBOX
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.75)', lineHeight: 1.75, marginBottom: '36px' }}>
              Subscribe to our newsletter and be the first to hear about flash sales, seasonal deals, and new safari packages before anyone else.
            </p>
            <div className="offers-newsletter-form" style={{ display: 'flex', maxWidth: '500px', margin: '0 auto', boxShadow: '0 8px 32px rgba(0,0,0,.2)' }}>
              <input type="email" placeholder="Enter your email address..." style={{ flex: 1, padding: '16px 20px', fontSize: '14px', border: 'none', outline: 'none', borderRadius: '4px 0 0 4px', fontFamily: 'inherit', minWidth: 0 }} />
              <button style={{ background: '#f5c518', color: '#1a1a1a', border: 'none', padding: '16px 24px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', borderRadius: '0 4px 4px 0', fontFamily: 'inherit', letterSpacing: '.5px', whiteSpace: 'nowrap' }}
                onMouseEnter={e => e.currentTarget.style.background = '#e6b800'}
                onMouseLeave={e => e.currentTarget.style.background = '#f5c518'}
              >SUBSCRIBE →</button>
            </div>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,.4)', marginTop: '12px' }}>No spam. Unsubscribe anytime. We respect your privacy.</p>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .offers-grid { grid-template-columns: 1fr 1fr !important; }
          .offers-title { font-size: 28px !important; }
          .offers-tags { overflow-x: auto; flex-wrap: nowrap !important; padding-bottom: 4px; width: 100%; }
        }
        @media (max-width: 600px) {
          .offers-grid { grid-template-columns: 1fr !important; }
          .offers-newsletter-title { font-size: 26px !important; }
          .offers-newsletter-form { flex-direction: column !important; }
          .offers-newsletter-form input { border-radius: 4px 4px 0 0 !important; }
          .offers-newsletter-form button { border-radius: 0 0 4px 4px !important; width: 100% !important; }
        }
      `}</style>
    </>
  );
}

export default SpecialOffers;