import { useState } from 'react';
import CarNavbar from '../components/CarNavbar';
import CarFooter from '../components/CarFooter';

function CarContact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', date: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  const faqs = [
    { q: 'Do I need a driving licence to hire a car?', a: 'Yes. A valid Kenyan driving licence or international driving permit is required for self-drive hire. We accept licences from all countries.' },
    { q: 'What is included in the hire price?', a: 'All our vehicles include comprehensive insurance, unlimited mileage, 24/7 roadside assistance, and a full tank of fuel on collection.' },
    { q: 'Can I hire a vehicle with a driver?', a: 'Yes! Add a professional driver to any vehicle for KES 2,500/day. Our drivers are licensed, vetted, and know every road in Kenya.' },
    { q: 'What is your cancellation policy?', a: 'Free cancellation up to 24 hours before your pickup time. Cancellations within 24 hours may incur a 50% charge.' },
    { q: 'Do you offer airport pickup and drop-off?', a: 'Yes — we cover JKIA, Wilson Airport, and Moi International Airport in Mombasa. We track your flight and wait if you are delayed.' },
    { q: 'Can I take the vehicle outside Kenya?', a: 'Cross-border travel to Tanzania, Uganda, and Rwanda is available on request. Additional permits and fees apply. Contact us to arrange.' },
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
          <p style={{
            fontSize: '12px', fontWeight: 800, color: '#60a5fa',
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px',
          }}>
            GET IN TOUCH
          </p>
          <h1 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 700, color: 'white',
            textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '20px',
          }}>
            BOOK A VEHICLE OR<br />
            <span style={{ color: '#60a5fa' }}>MAKE AN ENQUIRY</span>
          </h1>
          <p style={{
            fontSize: '17px', color: 'rgba(255,255,255,.75)',
            maxWidth: '560px', lineHeight: 1.75,
          }}>
            Our team is available 7 days a week to help you find the perfect
            vehicle, arrange a driver, or plan your journey across Kenya.
          </p>
        </div>
      </section>

      {/* ── INFO STRIP ── */}
      <section style={{ background: '#1a56db', padding: '36px 5%' }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px',
        }}>
          {[
            { icon: '📞', title: 'Call Us', info: '+254 722 864 021', sub: 'Mon–Sat, 7am–8pm' },
            { icon: '✉️', title: 'Email Us', info: 'info@fastlane.co.ke', sub: 'Reply within 2 hours' },
            { icon: '📍', title: 'Visit Us', info: 'Westlands, Nairobi', sub: 'Kenya, East Africa' },
            { icon: '💬', title: 'WhatsApp', info: '+254 722 864 021', sub: 'Chat instantly' },
          ].map(item => (
            <div key={item.title} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#bfdbfe', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{item.title}</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{item.info}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.6)' }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MAIN ── */}
      <section style={{ padding: '72px 5%' }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 440px', gap: '48px',
        }}>

          {/* ── FORM ── */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 800, color: '#1a56db', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
              SEND US A MESSAGE
            </p>
            <h2 style={{
              fontFamily: "'Oswald', sans-serif", fontSize: '38px',
              fontWeight: 700, textTransform: 'uppercase', marginBottom: '32px', color: '#1a1a2e',
            }}>
              HOW CAN WE<br /><span style={{ color: '#1a56db' }}>HELP YOU?</span>
            </h2>

            {submitted ? (
              <div style={{
                background: 'white', borderRadius: '12px', padding: '60px',
                textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,.07)',
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🚗</div>
                <h3 style={{
                  fontFamily: "'Oswald', sans-serif", fontSize: '28px',
                  fontWeight: 700, color: '#1a56db', marginBottom: '12px', textTransform: 'uppercase',
                }}>
                  MESSAGE SENT!
                </h3>
                <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.75, marginBottom: '28px' }}>
                  Thanks <strong>{form.name}</strong>! We'll get back to you at <strong>{form.email}</strong> within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: '#1a56db', color: 'white', border: 'none',
                    padding: '13px 28px', fontSize: '13px', fontWeight: 800,
                    cursor: 'pointer', borderRadius: '6px', fontFamily: 'inherit',
                  }}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <div style={{ background: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,.07)' }}>

                {/* Row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  {[
                    { label: '👤 Full Name', name: 'name', placeholder: 'Your full name', type: 'text' },
                    { label: '✉️ Email', name: 'email', placeholder: 'your@email.com', type: 'email' },
                  ].map(f => (
                    <div key={f.name}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{f.label}</label>
                      <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder}
                        style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '6px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', transition: 'border .2s', background: '#f8fafc' }}
                        onFocus={e => e.target.style.borderColor = '#1a56db'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>
                  ))}
                </div>

                {/* Row 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  {[
                    { label: '📞 Phone', name: 'phone', placeholder: '+254 700 000 000', type: 'tel' },
                  ].map(f => (
                    <div key={f.name}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{f.label}</label>
                      <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder}
                        style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '6px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', transition: 'border .2s', background: '#f8fafc' }}
                        onFocus={e => e.target.style.borderColor = '#1a56db'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>🚗 SERVICE NEEDED</label>
                    <select name="service" value={form.service} onChange={handleChange}
                      style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '6px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', background: '#f8fafc', cursor: 'pointer' }}
                      onFocus={e => e.target.style.borderColor = '#1a56db'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    >
                      <option value="">Select a service...</option>
                      {['Self Drive Hire', 'Hire With Driver', 'Airport Transfer', 'Safari Vehicle', 'Corporate Hire', 'Events & Weddings', 'Other'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Date */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>📅 PREFERRED DATE</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange}
                    style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '6px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', transition: 'border .2s', colorScheme: 'light', background: '#f8fafc' }}
                    onFocus={e => e.target.style.borderColor = '#1a56db'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                {/* Message */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>💬 YOUR MESSAGE</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us what you need — vehicle type, dates, pickup location, number of passengers..."
                    rows={5}
                    style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '6px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', transition: 'border .2s', resize: 'vertical', background: '#f8fafc' }}
                    onFocus={e => e.target.style.borderColor = '#1a56db'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <button onClick={handleSubmit} style={{
                  width: '100%', padding: '16px', fontSize: '14px', fontWeight: 800,
                  background: 'linear-gradient(135deg, #1a56db, #0e3fa5)',
                  color: 'white', border: 'none', borderRadius: '8px',
                  cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '.5px',
                  boxShadow: '0 4px 16px rgba(26,86,219,.4)', transition: 'all .25s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  SEND MESSAGE →
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div>

            {/* Office Hours */}
            <div style={{
              background: 'white', borderRadius: '12px', padding: '28px',
              boxShadow: '0 4px 20px rgba(0,0,0,.07)', marginBottom: '20px',
              borderTop: '4px solid #1a56db',
            }}>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '18px', color: '#1a1a2e' }}>
                OFFICE HOURS
              </h3>
              {[
                ['Monday – Friday', '7:00 AM – 8:00 PM'],
                ['Saturday', '7:00 AM – 6:00 PM'],
                ['Sunday', 'Emergency calls only'],
              ].map(([day, hours]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0', fontSize: '13px' }}>
                  <span style={{ fontWeight: 700, color: '#333' }}>{day}</span>
                  <span style={{ color: '#1a56db', fontWeight: 700 }}>{hours}</span>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,.07)' }}>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '18px', color: '#1a1a2e' }}>
                COMMON QUESTIONS
              </h3>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <div onClick={() => setActiveFaq(activeFaq === i ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', cursor: 'pointer', gap: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', lineHeight: 1.4, flex: 1 }}>{faq.q}</span>
                    <span style={{ color: '#1a56db', fontWeight: 800, fontSize: '18px', flexShrink: 0, transition: 'transform .2s', transform: activeFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                  </div>
                  {activeFaq === i && (
                    <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.75, paddingBottom: '13px' }}>{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CarFooter />
    </div>
  );
}

export default CarContact;