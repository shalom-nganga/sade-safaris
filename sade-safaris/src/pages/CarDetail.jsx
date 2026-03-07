import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarNavbar from '../components/CarNavbar';
import CarFooter from '../components/CarFooter';
import vehicles from '../data/vehicles';

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = vehicles.find(v => v.id === parseInt(id));
  const [activeImg, setActiveImg] = useState(0);
  const [withDriver, setWithDriver] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!vehicle) {
    return (
      <>
        <div style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
          <CarNavbar />
          <div style={{ textAlign: 'center', padding: '120px 5%' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🚗</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '32px', marginBottom: '12px' }}>VEHICLE NOT FOUND</h2>
            <button onClick={() => navigate('/car-hire/fleet')} style={{ background: '#1a56db', color: 'white', border: 'none', padding: '14px 32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', borderRadius: '8px', fontFamily: 'inherit' }}>
              BACK TO FLEET
            </button>
          </div>
          <CarFooter />
        </div>
      </>
    );
  }

  const days = pickupDate && returnDate ? Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))) : null;
  const dailyRate = withDriver ? vehicle.pricePerDay + 2500 : vehicle.pricePerDay;
  const total = days ? dailyRate * days : null;
  const handleSubmit = () => { if (!name || !email || !phone || !pickupDate || !returnDate || !pickupLocation) return; setSubmitted(true); };
  const tabs = ['overview', 'specs', 'features', 'reviews'];
  const pickupLocations = ['JKIA — Jomo Kenyatta International Airport', 'Wilson Airport, Nairobi', 'Westlands, Nairobi', 'CBD — Nairobi City Centre', 'Karen, Nairobi', 'Gigiri / UN Area', 'Mombasa Road', 'Custom Location'];
  const inputStyle = { width: '100%', border: '2px solid #e2e8f0', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', transition: 'border .2s', background: '#f8fafc', boxSizing: 'border-box' };

  return (
    <>
      <div style={{ fontFamily: "'Nunito Sans', sans-serif", background: '#f0f4ff' }}>
        <CarNavbar />

        {/* HERO */}
        <section style={{ position: 'relative', height: '55vh', minHeight: '320px', overflow: 'hidden' }}>
          <img src={vehicle.images[activeImg]} alt={vehicle.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity .4s' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,.85) 0%, rgba(15,23,42,.2) 60%)' }} />
          <button onClick={() => navigate('/car-hire/fleet')} style={{ position: 'absolute', top: '24px', left: '5%', zIndex: 3, background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.25)', color: 'white', padding: '9px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, fontFamily: 'inherit' }}>
            ← BACK TO FLEET
          </button>
          <div style={{ position: 'absolute', bottom: '80px', left: '5%', right: '5%', zIndex: 2 }}>
            <div style={{ display: 'inline-block', background: vehicle.badgeColor, color: 'white', fontSize: '10px', fontWeight: 800, letterSpacing: '1px', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', marginBottom: '10px' }}>{vehicle.badge}</div>
            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 700, color: 'white', textTransform: 'uppercase', marginBottom: '12px' }}>{vehicle.name}</h1>
            <div className="cardetail-tags" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[`🚙 ${vehicle.type}`, `💺 ${vehicle.seats} Seats`, `⚙️ ${vehicle.transmission}`, `⛽ ${vehicle.fuel}`, vehicle.available ? '✅ Available' : '❌ Unavailable'].map(item => (
                <span key={item} style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,.85)', background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '20px' }}>{item}</span>
              ))}
            </div>
          </div>
          {/* Thumbnails */}
          <div className="cardetail-thumbs" style={{ position: 'absolute', bottom: '16px', left: '5%', zIndex: 3, display: 'flex', gap: '8px' }}>
            {vehicle.images.map((img, i) => (
              <div key={i} onClick={() => setActiveImg(i)} style={{ width: '56px', height: '56px', borderRadius: '6px', overflow: 'hidden', cursor: 'pointer', border: activeImg === i ? '3px solid #60a5fa' : '3px solid transparent', transition: 'border .2s', flexShrink: 0 }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section style={{ padding: '48px 5%' }}>
          <div className="cardetail-main" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px' }}>

            {/* LEFT */}
            <div>
              {/* Tabs */}
              <div className="cardetail-tabs" style={{ display: 'flex', marginBottom: '32px', borderBottom: '2px solid #e2e8f0', background: 'white', borderRadius: '8px 8px 0 0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.05)' }}>
                {tabs.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '14px 16px', fontSize: '11px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', background: activeTab === tab ? '#1a56db' : 'transparent', color: activeTab === tab ? 'white' : '#64748b', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', flex: 1 }}>
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'overview' && (
                <div style={{ background: 'white', borderRadius: '0 0 8px 8px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
                  <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px', color: '#1a1a2e' }}>ABOUT THIS VEHICLE</h2>
                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.85, marginBottom: '32px' }}>{vehicle.desc}</p>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px', color: '#1a1a2e' }}>QUICK SPECS</h3>
                  <div className="specs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                    {Object.entries(vehicle.specs).map(([key, val]) => (
                      <div key={key} style={{ background: '#f0f4ff', borderRadius: '8px', padding: '16px', textAlign: 'center', border: '1px solid #e0e7ff' }}>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1a1a2e' }}>{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div style={{ background: 'white', borderRadius: '0 0 8px 8px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
                  <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '24px', color: '#1a1a2e' }}>FULL SPECIFICATIONS</h2>
                  {[['Vehicle Type', vehicle.type], ['Seats', `${vehicle.seats} passengers`], ['Transmission', vehicle.transmission], ['Fuel Type', vehicle.fuel], ['Engine', vehicle.specs.engine], ['Power Output', vehicle.specs.power], ['Ground Clearance', vehicle.specs.groundClearance], ['Fuel Range', vehicle.specs.range], ['Drive System', vehicle.features.includes('4WD') ? '4WD / All Wheel Drive' : '2WD'], ['Air Conditioning', 'Yes — Climate Control'], ['Insurance', 'Comprehensive cover included'], ['GPS Navigation', vehicle.features.includes('GPS') ? 'Included' : 'Optional']].map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
                      <span style={{ fontWeight: 700, color: '#64748b' }}>{key}</span>
                      <span style={{ fontWeight: 800, color: '#1a1a2e' }}>{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'features' && (
                <div style={{ background: 'white', borderRadius: '0 0 8px 8px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
                  <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '24px', color: '#1a1a2e' }}>FEATURES & EQUIPMENT</h2>
                  <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                    {vehicle.features.map(f => (
                      <div key={f} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '14px 16px', background: '#f0f4ff', borderRadius: '8px', border: '1px solid #e0e7ff' }}>
                        <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#1a56db', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px', color: '#1a1a2e' }}>ALWAYS INCLUDED</h3>
                  <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {['✅ Comprehensive insurance', '✅ 24/7 roadside assistance', '✅ Unlimited mileage', '✅ Clean & sanitized vehicle', '✅ Emergency contact card', '✅ Kenya road map'].map(item => (
                      <div key={item} style={{ fontSize: '13px', fontWeight: 600, color: '#475569', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>{item}</div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div style={{ background: 'white', borderRadius: '0 0 8px 8px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
                  <div className="reviews-summary" style={{ display: 'flex', gap: '32px', alignItems: 'center', marginBottom: '32px', background: '#f0f4ff', padding: '24px', borderRadius: '8px', border: '1px solid #e0e7ff' }}>
                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '64px', fontWeight: 700, color: '#1a56db', lineHeight: 1 }}>4.9</div>
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', margin: '8px 0' }}>{[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f5c518', fontSize: '20px' }}>★</span>)}</div>
                      <div style={{ fontSize: '13px', color: '#94a3b8' }}>48 reviews</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      {[5,4,3,2,1].map(star => (
                        <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '12px', color: '#94a3b8', width: '40px' }}>{star} ★</span>
                          <div style={{ flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: '#1a56db', borderRadius: '4px', width: star === 5 ? '80%' : star === 4 ? '15%' : '5%' }} />
                          </div>
                          <span style={{ fontSize: '12px', color: '#94a3b8', width: '30px' }}>{star === 5 ? '80%' : star === 4 ? '15%' : '5%'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {[{ name: 'Michael Otieno', role: '🇰🇪 Nairobi', text: 'Excellent vehicle, very clean and well maintained. The GPS was super helpful navigating through traffic. Will definitely hire again!' }, { name: 'Emma Richardson', role: '🇬🇧 United Kingdom', text: "Used this for our safari drive to Masai Mara. Powerful, comfortable, and handled rough roads like a beast. Couldn't have asked for more." }, { name: 'Carlos Mendez', role: '🇪🇸 Spain', text: 'Great value for money. The team at Fast Lane were very professional and the handover process was quick and easy.' }].map(r => (
                    <div key={r.name} style={{ background: '#f8fafc', borderRadius: '8px', padding: '20px', marginBottom: '14px', borderLeft: '4px solid #1a56db' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '15px', color: '#1a1a2e' }}>{r.name}</div>
                          <div style={{ fontSize: '12px', color: '#94a3b8' }}>{r.role}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '2px' }}>{[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f5c518', fontSize: '14px' }}>★</span>)}</div>
                      </div>
                      <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.7, fontStyle: 'italic' }}>"{r.text}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* BOOKING CARD */}
            <div className="cardetail-booking">
              <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 8px 32px rgba(26,86,219,.12)', overflow: 'hidden', border: '1px solid #e0e7ff' }}>
                <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,.6)', letterSpacing: '1px', marginBottom: '4px' }}>DAILY RATE FROM</div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '44px', fontWeight: 700, color: 'white', lineHeight: 1 }}>KES {vehicle.pricePerDay.toLocaleString()}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)', marginTop: '4px' }}>per day · self drive</div>
                  {!vehicle.available && <div style={{ marginTop: '12px', background: '#e74c3c', color: 'white', fontSize: '12px', fontWeight: 800, padding: '6px 16px', borderRadius: '4px', display: 'inline-block' }}>CURRENTLY UNAVAILABLE</div>}
                </div>

                {submitted ? (
                  <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1a56db', marginBottom: '10px', textTransform: 'uppercase' }}>BOOKING REQUEST SENT!</h3>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7, marginBottom: '20px' }}>
                      Thank you <strong>{name}</strong>! We'll confirm your <strong>{vehicle.name}</strong> booking at <strong>{email}</strong> within 2 hours.
                    </p>
                    <button onClick={() => setSubmitted(false)} style={{ background: 'transparent', color: '#1a56db', border: '2px solid #1a56db', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700 }}>MAKE ANOTHER BOOKING</button>
                  </div>
                ) : (
                  <div style={{ padding: '24px' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>RENTAL TYPE</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {[{ val: false, label: '🚗 Self Drive' }, { val: true, label: '👨‍✈️ With Driver' }].map(opt => (
                          <button key={String(opt.val)} onClick={() => setWithDriver(opt.val)} style={{ flex: 1, padding: '10px', fontSize: '12px', fontWeight: 700, borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', border: '2px solid', background: withDriver === opt.val ? '#1a56db' : '#f8fafc', color: withDriver === opt.val ? 'white' : '#64748b', borderColor: withDriver === opt.val ? '#1a56db' : '#e2e8f0' }}>{opt.label}</button>
                        ))}
                      </div>
                      {withDriver && <p style={{ fontSize: '11px', color: '#64748b', marginTop: '8px', background: '#eff6ff', padding: '6px 10px', borderRadius: '4px' }}>Driver fee: <strong style={{ color: '#1a56db' }}>KES 2,500/day</strong></p>}
                    </div>
                    {[{ label: '👤 Full Name', value: name, setter: setName, placeholder: 'Your full name', type: 'text' }, { label: '✉️ Email', value: email, setter: setEmail, placeholder: 'your@email.com', type: 'email' }, { label: '📞 Phone', value: phone, setter: setPhone, placeholder: '+254 700 000 000', type: 'tel' }].map(f => (
                      <div key={f.label} style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '5px' }}>{f.label}</label>
                        <input type={f.type} value={f.value} onChange={e => f.setter(e.target.value)} placeholder={f.placeholder} style={inputStyle}
                          onFocus={e => e.target.style.borderColor = '#1a56db'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                      </div>
                    ))}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                      {[{ label: '📅 Pickup Date', value: pickupDate, setter: setPickupDate }, { label: '📅 Return Date', value: returnDate, setter: setReturnDate }].map(f => (
                        <div key={f.label}>
                          <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '5px' }}>{f.label}</label>
                          <input type="date" value={f.value} onChange={e => f.setter(e.target.value)} style={{ ...inputStyle, fontSize: '12px', colorScheme: 'light' }}
                            onFocus={e => e.target.style.borderColor = '#1a56db'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '5px' }}>📍 PICKUP LOCATION</label>
                      <select value={pickupLocation} onChange={e => setPickupLocation(e.target.value)} style={{ ...inputStyle, cursor: 'pointer', color: '#333' }}
                        onFocus={e => e.target.style.borderColor = '#1a56db'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}>
                        <option value="">Select pickup location...</option>
                        {pickupLocations.map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '5px' }}>💬 SPECIAL REQUESTS (OPTIONAL)</label>
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any special requests or notes..." rows={3}
                        style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={e => e.target.style.borderColor = '#1a56db'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                    </div>
                    {days && (
                      <div style={{ background: '#f0f4ff', borderRadius: '8px', padding: '14px 16px', marginBottom: '16px', border: '1px solid #e0e7ff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                          <span style={{ color: '#64748b' }}>KES {vehicle.pricePerDay.toLocaleString()} × {days} days</span>
                          <span style={{ fontWeight: 700, color: '#1a1a2e' }}>KES {(vehicle.pricePerDay * days).toLocaleString()}</span>
                        </div>
                        {withDriver && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}><span style={{ color: '#64748b' }}>Driver fee × {days} days</span><span style={{ fontWeight: 700, color: '#1a1a2e' }}>KES {(2500 * days).toLocaleString()}</span></div>}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800, paddingTop: '8px', borderTop: '1px solid #e0e7ff', marginTop: '6px' }}>
                          <span style={{ color: '#1a1a2e' }}>TOTAL ({days} days)</span>
                          <span style={{ color: '#1a56db' }}>KES {total.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                    <button onClick={handleSubmit} disabled={!vehicle.available} style={{ width: '100%', padding: '15px', fontSize: '14px', fontWeight: 800, background: vehicle.available ? 'linear-gradient(135deg, #1a56db, #0e3fa5)' : '#e2e8f0', color: vehicle.available ? 'white' : '#aaa', border: 'none', borderRadius: '8px', cursor: vehicle.available ? 'pointer' : 'not-allowed', fontFamily: 'inherit', letterSpacing: '.5px', transition: 'all .25s', boxShadow: vehicle.available ? '0 4px 16px rgba(26,86,219,.4)' : 'none' }}>
                      {vehicle.available ? 'CONFIRM BOOKING REQUEST →' : 'VEHICLE UNAVAILABLE'}
                    </button>
                    <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '10px', lineHeight: 1.6 }}>🔒 No payment now. We confirm within 2 hours. Free cancellation 24hrs before pickup.</p>
                  </div>
                )}
              </div>
              <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', borderRadius: '12px', padding: '20px', marginTop: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,.7)', marginBottom: '6px' }}>PREFER TO BOOK BY PHONE?</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 700, color: '#60a5fa' }}>+254 722 864 021</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.4)', marginTop: '4px' }}>Available Mon–Sat, 7am–8pm</div>
              </div>
            </div>
          </div>
        </section>

        <CarFooter />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .cardetail-main { grid-template-columns: 1fr !important; }
          .cardetail-booking { position: static !important; }
        }
        @media (max-width: 768px) {
          .specs-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .reviews-summary { flex-direction: column !important; gap: 16px !important; }
          .cardetail-thumbs { display: none !important; }
          .cardetail-tags { gap: 6px !important; }
        }
        @media (max-width: 480px) {
          .cardetail-tabs button { padding: 12px 8px !important; font-size: 10px !important; letter-spacing: 0 !important; }
          .specs-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}

export default CarDetail;