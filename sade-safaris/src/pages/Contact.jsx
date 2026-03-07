import { useState } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', guests: 1, date: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => { if (!form.name || !form.email || !form.message) return; setSubmitted(true); };

  const faqs = [
    { q: 'How far in advance should I book my safari?', a: "We recommend booking at least 3-6 months in advance, especially for peak season (July-October for the Great Migration). However, we can often accommodate last-minute bookings — just reach out and we'll do our best." },
    { q: 'Do I need a visa to visit Kenya?', a: 'Most nationalities require a visa to enter Kenya. Kenya now operates an eVisa system which you can apply for online at evisa.go.ke. We recommend applying at least 2 weeks before your travel date.' },
    { q: 'What is the best time of year to visit Kenya?', a: 'Kenya is a year-round destination. The dry seasons (January-March and July-October) offer the best game viewing. July-October is peak season for the Great Migration river crossings in the Masai Mara.' },
    { q: 'Are your safaris suitable for children?', a: 'Absolutely! Many of our safaris are family-friendly. We recommend Amboseli and Lake Nakuru for families with younger children. We provide child-friendly activities, meals, and accommodate all ages.' },
    { q: 'What payment methods do you accept?', a: 'We accept M-Pesa, bank transfers, Visa, Mastercard, and PayPal. A 30% deposit is required to confirm your booking with the balance due 30 days before departure.' },
    { q: 'Is travel insurance required?', a: 'We strongly recommend comprehensive travel insurance covering medical evacuation, trip cancellation, and personal belongings. We can recommend trusted providers if needed.' },
  ];

  const inputStyle = { width: '100%', border: '2px solid #eee', borderRadius: '4px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', transition: 'border .2s', boxSizing: 'border-box' };

  return (
    <>
      <div>
        <TopBar />
        <Navbar />

        {/* HERO */}
        <section style={{ position: 'relative', padding: '100px 5%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(.3)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(45,106,26,.75), transparent)' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, color: '#f5c518', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>WE'D LOVE TO HEAR FROM YOU</p>
            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(32px, 6vw, 80px)', fontWeight: 700, color: 'white', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '20px' }}>
              GET IN TOUCH<br /><span style={{ color: '#f5c518' }}>WITH OUR TEAM</span>
            </h1>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.85)', maxWidth: '560px', lineHeight: 1.75 }}>
              Whether you have a question, want to book a safari, or just need some inspiration — our friendly team is here and ready to help.
            </p>
          </div>
        </section>

        {/* INFO STRIP */}
        <section style={{ background: '#2d6a1a', padding: '40px 5%' }}>
          <div className="contact-info-strip" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { icon: '📞', title: 'Call Us', info: '+254 722 864 021', sub: 'Mon – Sat, 8am – 6pm' },
              { icon: '✉️', title: 'Email Us', info: 'info@sadesafaris.co.ke', sub: 'We reply within 24 hours' },
              { icon: '📍', title: 'Visit Us', info: 'Westlands, Nairobi', sub: 'Kenya, East Africa' },
              { icon: '💬', title: 'WhatsApp', info: '+254 722 864 021', sub: 'Chat with us instantly' },
            ].map(item => (
              <div key={item.title} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#f5c518', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{item.title}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{item.info}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.6)' }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* MAIN */}
        <section style={{ padding: '72px 5%', background: '#f9f9f7' }}>
          <div className="contact-main" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 480px', gap: '48px' }}>

            {/* FORM */}
            <div>
              <p style={{ fontSize: '12px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px' }}>SEND US A MESSAGE</p>
              <h2 className="contact-form-title" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '38px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '32px', color: '#1a1a1a' }}>
                PLAN YOUR SAFARI<br /><span style={{ color: '#4a9c2f' }}>WITH US TODAY</span>
              </h2>

              {submitted ? (
                <div style={{ background: 'white', borderRadius: '8px', padding: '60px 40px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,.07)' }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '28px', fontWeight: 700, color: '#4a9c2f', marginBottom: '12px', textTransform: 'uppercase' }}>MESSAGE SENT!</h3>
                  <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.75, marginBottom: '28px' }}>
                    Thank you <strong>{form.name}</strong>! We've received your message and will get back to you at <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} style={{ background: '#4a9c2f', color: 'white', border: 'none', padding: '13px 28px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit' }}>
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: '8px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,.07)' }}>
                  <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    {[{ label: '👤 Full Name', name: 'name', placeholder: 'Your full name', type: 'text' }, { label: '✉️ Email Address', name: 'email', placeholder: 'your@email.com', type: 'email' }].map(f => (
                      <div key={f.name}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{f.label}</label>
                        <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} style={inputStyle}
                          onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#eee'} />
                      </div>
                    ))}
                  </div>
                  <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    {[{ label: '📞 Phone Number', name: 'phone', placeholder: '+254 700 000 000', type: 'tel' }, { label: '📋 Subject', name: 'subject', placeholder: 'What is this about?', type: 'text' }].map(f => (
                      <div key={f.name}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{f.label}</label>
                        <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} style={inputStyle}
                          onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#eee'} />
                      </div>
                    ))}
                  </div>
                  <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>📅 Preferred Travel Date</label>
                      <input type="date" name="date" value={form.date} onChange={handleChange} style={{ ...inputStyle, colorScheme: 'light' }}
                        onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#eee'} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>👥 Number of Guests</label>
                      <select name="guests" value={form.guests} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}
                        onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#eee'}>
                        {[1,2,3,4,5,6,7,8,'9+','10+'].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>💬 Your Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your dream safari — destinations, dates, budget, special requests..." rows={5}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#eee'} />
                  </div>
                  <button onClick={handleSubmit} style={{ width: '100%', padding: '16px', fontSize: '14px', fontWeight: 800, background: '#4a9c2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '.5px', transition: 'all .25s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#2d6a1a'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#4a9c2f'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >SEND MESSAGE →</button>
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div>
              <div style={{ background: 'white', borderRadius: '8px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,.07)', marginBottom: '24px', borderTop: '4px solid #4a9c2f' }}>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '20px', color: '#1a1a1a' }}>OFFICE HOURS</h3>
                {[['Monday – Friday', '8:00 AM – 6:00 PM'], ['Saturday', '9:00 AM – 4:00 PM'], ['Sunday', 'Emergency calls only']].map(([day, hours]) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f5f5f5', fontSize: '13px' }}>
                    <span style={{ fontWeight: 700, color: '#333' }}>{day}</span>
                    <span style={{ color: '#4a9c2f', fontWeight: 700 }}>{hours}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: '#2d6a1a', borderRadius: '8px', padding: '32px', marginBottom: '24px' }}>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '20px', color: 'white' }}>FOLLOW US</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[{ icon: '📸', platform: 'Instagram', handle: '@sadesafaris' }, { icon: 'f', platform: 'Facebook', handle: 'Sade Safaris Kenya' }, { icon: '▶', platform: 'YouTube', handle: 'Sade Safaris TV' }, { icon: 'tw', platform: 'Twitter / X', handle: '@sadesafaris' }].map(s => (
                    <div key={s.platform} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 14px', background: 'rgba(255,255,255,.08)', borderRadius: '6px', cursor: 'pointer', transition: 'background .2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.16)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
                    >
                      <div style={{ width: '36px', height: '36px', background: '#f5c518', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{s.icon}</div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: 'white' }}>{s.platform}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.6)' }}>{s.handle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '8px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,.07)' }}>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '20px', color: '#1a1a1a' }}>COMMON QUESTIONS</h3>
                {faqs.map((faq, i) => (
                  <div key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <div onClick={() => setActiveFaq(activeFaq === i ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', cursor: 'pointer', gap: '12px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.4, flex: 1 }}>{faq.q}</span>
                      <span style={{ color: '#4a9c2f', fontWeight: 800, fontSize: '18px', flexShrink: 0, transition: 'transform .2s', transform: activeFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                    </div>
                    {activeFaq === i && <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.75, paddingBottom: '14px' }}>{faq.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-info-strip { grid-template-columns: repeat(2, 1fr) !important; }
          .contact-main { grid-template-columns: 1fr !important; }
          .contact-form-title { font-size: 28px !important; }
        }
        @media (max-width: 600px) {
          .contact-info-strip { grid-template-columns: 1fr 1fr !important; gap: 16px !important; }
          .form-row-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

export default Contact;