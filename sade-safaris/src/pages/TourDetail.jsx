import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getTours } from '../store';

function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tours = getTours();
  const tour = tours.find(t => String(t.id) === String(id));

  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!tour) {
    return (
      <div>
        <TopBar />
        <Navbar />
        <div style={{ textAlign: 'center', padding: '120px 5%' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '32px', marginBottom: '12px' }}>TOUR NOT FOUND</h2>
          <button onClick={() => navigate('/tours')} style={{ background: '#4a9c2f', color: 'white', border: 'none', padding: '14px 32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit' }}>
            BACK TO TOURS
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const tabs = ['overview', 'itinerary', 'includes', 'reviews'];
  const handleSubmit = () => { if (!name || !email || !date) return; setSubmitted(true); };

  return (
    <>
      <div>
        <TopBar />
        <Navbar />

        {/* Hero */}
        <section style={{ position: 'relative', height: '60vh', minHeight: '400px', overflow: 'hidden' }}>
          <img src={tour.images[activeImg]} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity .4s' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.2) 60%)' }} />

          <button onClick={() => navigate('/tours')} style={{ position: 'absolute', top: '24px', left: '5%', zIndex: 3, background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.3)', color: 'white', padding: '9px 18px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, fontFamily: 'inherit', transition: 'all .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.15)'}
          >← BACK TO TOURS</button>

          {/* Title overlay */}
          <div className="td-hero-bottom" style={{ position: 'absolute', bottom: '32px', left: '5%', right: '5%', zIndex: 2 }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#f5c518', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{tour.category}</div>
            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(24px, 5vw, 56px)', fontWeight: 700, color: 'white', textTransform: 'uppercase', marginBottom: '12px' }}>{tour.title}</h1>
            <div className="td-hero-meta" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {[`📍 ${tour.location}`, `⏱ ${tour.days}`, `👥 ${tour.groupSize} people`, `🏃 ${tour.difficulty}`, `⭐ ${tour.rating} (${tour.reviews} reviews)`].map(item => (
                <span key={item} style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,.9)' }}>{item}</span>
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="td-thumbs" style={{ position: 'absolute', bottom: '32px', right: '5%', zIndex: 3, display: 'flex', gap: '8px' }}>
            {tour.images.map((img, i) => (
              <div key={i} onClick={() => setActiveImg(i)} style={{ width: '60px', height: '60px', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', border: activeImg === i ? '3px solid #f5c518' : '3px solid transparent', transition: 'border .2s', flexShrink: 0 }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <section style={{ padding: '48px 5%', background: '#f9f9f7' }}>
          <div className="td-main-grid" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>

            {/* LEFT */}
            <div>
              {/* Tabs */}
              <div className="td-tabs" style={{ display: 'flex', gap: '0', marginBottom: '32px', borderBottom: '2px solid #eee', overflowX: 'auto' }}>
                {tabs.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '14px 24px', fontSize: '12px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', color: activeTab === tab ? '#4a9c2f' : '#888', borderBottom: activeTab === tab ? '3px solid #4a9c2f' : '3px solid transparent', marginBottom: '-2px', whiteSpace: 'nowrap' }}>{tab}</button>
                ))}
              </div>

              {/* OVERVIEW */}
              {activeTab === 'overview' && (
                <div>
                  <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px', color: '#1a1a1a' }}>ABOUT THIS TOUR</h2>
                  <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.85, marginBottom: '32px' }}>{tour.description}</p>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px', color: '#1a1a1a' }}>TOUR HIGHLIGHTS</h3>
                  <div className="td-highlights-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {tour.highlights.map(h => (
                      <div key={h} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '12px 16px', background: 'white', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,.05)' }}>
                        <span style={{ color: '#4a9c2f', fontWeight: 800, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: '13px', color: '#444', lineHeight: 1.5 }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ITINERARY */}
              {activeTab === 'itinerary' && (
                <div>
                  <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '24px', color: '#1a1a1a' }}>DAY BY DAY ITINERARY</h2>
                  {tour.itinerary.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#4a9c2f', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Oswald', sans-serif", fontSize: '16px', fontWeight: 700 }}>{item.day}</div>
                        {i < tour.itinerary.length - 1 && <div style={{ width: '2px', flex: 1, background: '#e0e0e0', margin: '4px 0' }} />}
                      </div>
                      <div style={{ background: 'white', borderRadius: '8px', padding: '20px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,.05)', minWidth: 0 }}>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>DAY {item.day}</div>
                        <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#1a1a1a' }}>{item.title}</h4>
                        <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* INCLUDES */}
              {activeTab === 'includes' && (
                <div className="td-includes-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px', color: '#1a1a1a' }}>✅ WHAT'S INCLUDED</h3>
                    {tour.includes.map(item => (
                      <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#444' }}>
                        <span style={{ color: '#4a9c2f', fontWeight: 800, flexShrink: 0 }}>✓</span>{item}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px', color: '#1a1a1a' }}>❌ NOT INCLUDED</h3>
                    {tour.excludes.map(item => (
                      <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#444' }}>
                        <span style={{ color: '#e74c3c', fontWeight: 800, flexShrink: 0 }}>✗</span>{item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* REVIEWS */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="td-reviews-summary" style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '32px', background: 'white', padding: '28px', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '64px', fontWeight: 700, color: '#4a9c2f', lineHeight: 1 }}>{tour.rating}</div>
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', margin: '8px 0' }}>
                        {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f5c518', fontSize: '20px' }}>★</span>)}
                      </div>
                      <div style={{ fontSize: '13px', color: '#888' }}>Based on {tour.reviews} reviews</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {[5,4,3,2,1].map(star => (
                        <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '12px', color: '#888', width: '40px', flexShrink: 0 }}>{star} ★</span>
                          <div style={{ flex: 1, height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: '#4a9c2f', borderRadius: '4px', width: star === 5 ? '75%' : star === 4 ? '18%' : star === 3 ? '5%' : '1%' }} />
                          </div>
                          <span style={{ fontSize: '12px', color: '#888', width: '30px', flexShrink: 0 }}>{star === 5 ? '75%' : star === 4 ? '18%' : star === 3 ? '5%' : '1%'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {[
                    { name: 'Sarah Mitchell', country: '🇬🇧 UK', text: 'Absolutely incredible experience. Our guide was knowledgeable and passionate. Highly recommend!', rating: 5 },
                    { name: 'James Oduya', country: '🇳🇬 Nigeria', text: 'Everything was perfectly organized. The wildlife sightings were beyond our expectations.', rating: 5 },
                    { name: 'Elena Rossi', country: '🇮🇹 Italy', text: 'A trip of a lifetime. We saw so much wildlife and the accommodation was superb.', rating: 5 },
                  ].map(r => (
                    <div key={r.name} style={{ background: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.05)', marginBottom: '16px', borderLeft: '4px solid #4a9c2f' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '15px' }}>{r.name}</div>
                          <div style={{ fontSize: '12px', color: '#999' }}>{r.country}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f5c518', fontSize: '16px' }}>★</span>)}
                        </div>
                      </div>
                      <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, fontStyle: 'italic' }}>"{r.text}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT — Booking card */}
            <div className="td-booking-card" style={{ position: 'sticky', top: '90px', alignSelf: 'flex-start' }}>
              <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 8px 32px rgba(0,0,0,.1)', overflow: 'hidden' }}>
                <div style={{ background: '#2d6a1a', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,.7)', letterSpacing: '1px', marginBottom: '4px' }}>FROM</div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '42px', fontWeight: 700, color: 'white', lineHeight: 1 }}>KES {tour.price.toLocaleString()}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.7)', marginTop: '4px' }}>per person</div>
                </div>

                {submitted ? (
                  <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 700, color: '#4a9c2f', marginBottom: '10px' }}>BOOKING REQUEST SENT!</h3>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7 }}>Thank you {name}! Our team will contact you at {email} within 24 hours to confirm your booking.</p>
                    <button onClick={() => setSubmitted(false)} style={{ marginTop: '20px', background: 'transparent', color: '#4a9c2f', border: '2px solid #4a9c2f', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700 }}>MAKE ANOTHER BOOKING</button>
                  </div>
                ) : (
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '20px', color: '#1a1a1a' }}>BOOK THIS TOUR</h3>
                    {[
                      { label: '👤 Full Name', value: name, setter: setName, placeholder: 'Your full name', type: 'text' },
                      { label: '✉️ Email Address', value: email, setter: setEmail, placeholder: 'your@email.com', type: 'email' },
                      { label: '📞 Phone Number', value: phone, setter: setPhone, placeholder: '+254 700 000 000', type: 'tel' },
                    ].map(field => (
                      <div key={field.label} style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{field.label}</label>
                        <input type={field.type} value={field.value} onChange={e => field.setter(e.target.value)} placeholder={field.placeholder} style={{ width: '100%', border: '2px solid #eee', borderRadius: '4px', padding: '10px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', transition: 'border .2s', boxSizing: 'border-box' }}
                          onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#eee'} />
                      </div>
                    ))}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>📅 Travel Date</label>
                      <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', border: '2px solid #eee', borderRadius: '4px', padding: '10px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', transition: 'border .2s', colorScheme: 'light', boxSizing: 'border-box' }}
                        onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#eee'} />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>👥 Number of Guests</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button onClick={() => setGuests(g => Math.max(1, g - 1))} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #4a9c2f', background: 'white', color: '#4a9c2f', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: 'inherit', transition: 'all .2s', flexShrink: 0 }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#4a9c2f'; e.currentTarget.style.color = 'white'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#4a9c2f'; }}>−</button>
                        <span style={{ fontSize: '18px', fontWeight: 800, flex: 1, textAlign: 'center' }}>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                        <button onClick={() => setGuests(g => Math.min(20, g + 1))} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: '#4a9c2f', color: 'white', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: 'inherit', transition: 'all .2s', flexShrink: 0 }}
                          onMouseEnter={e => e.currentTarget.style.background = '#2d6a1a'}
                          onMouseLeave={e => e.currentTarget.style.background = '#4a9c2f'}>+</button>
                      </div>
                    </div>
                    <div style={{ background: '#eaf5e3', borderRadius: '6px', padding: '14px 16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#555' }}>Total ({guests} {guests === 1 ? 'guest' : 'guests'})</span>
                      <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 700, color: '#4a9c2f' }}>KES {(tour.price * guests).toLocaleString()}</span>
                    </div>
                    <button onClick={handleSubmit} style={{ width: '100%', padding: '16px', fontSize: '14px', fontWeight: 800, background: '#4a9c2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '.5px', transition: 'all .25s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#2d6a1a'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#4a9c2f'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >CONFIRM BOOKING REQUEST →</button>
                    <p style={{ fontSize: '11px', color: '#aaa', textAlign: 'center', marginTop: '12px', lineHeight: 1.6 }}>No payment required now. Our team will contact you within 24 hours to confirm.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .td-main-grid { grid-template-columns: 1fr !important; }
          .td-booking-card { position: static !important; top: auto !important; }
        }
        @media (max-width: 768px) {
          .td-thumbs { display: none !important; }
          .td-hero-bottom { bottom: 16px !important; }
          .td-highlights-grid { grid-template-columns: 1fr !important; }
          .td-includes-grid { grid-template-columns: 1fr !important; }
          .td-reviews-summary { flex-direction: column !important; gap: 20px !important; }
        }
        @media (max-width: 480px) {
          .td-tabs button { padding: 12px 14px !important; font-size: 11px !important; }
          .td-hero-meta span { font-size: 11px !important; }
        }
      `}</style>
    </>
  );
}

export default TourDetail;