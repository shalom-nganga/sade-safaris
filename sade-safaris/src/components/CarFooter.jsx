function CarFooter() {
  return (
    <>
      <footer style={{ background: '#0f172a', padding: '64px 5% 28px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="carfooter-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>

            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: 'linear-gradient(135deg, #1a56db, #0e3fa5)', borderRadius: '8px', padding: '8px 14px' }}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, color: 'white', letterSpacing: '2px' }}>FL</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px', fontWeight: 700, color: 'white', letterSpacing: '1px' }}>FAST LANE</div>
                  <div style={{ fontSize: '9px', fontWeight: 700, color: '#1a56db', letterSpacing: '2px' }}>CAR HIRE & RENTALS</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.45)', lineHeight: 1.85, maxWidth: '280px', marginBottom: '20px' }}>
                Nairobi's trusted car hire service. Quality vehicles, professional drivers, and unbeatable prices across Kenya.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['f', 'in', 'tw', '📸'].map((s, i) => (
                  <div key={i} style={{ width: '34px', height: '34px', borderRadius: '4px', background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', cursor: 'pointer', color: 'white', transition: 'background .2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1a56db'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
                  >{s}</div>
                ))}
              </div>
            </div>

            {/* Columns */}
            {[
              ['QUICK LINKS', ['Home', 'Our Fleet', 'Safari 4x4s', 'Luxury Vans', 'Airport Transfers', 'Contact Us']],
              ['SERVICES', ['Self Drive Hire', 'Hire With Driver', 'Airport Pickup', 'Corporate Hire', 'Safari Vehicles', 'Long Term Hire']],
              ['CONTACT', ['📍 Westlands, Nairobi', '📞 +254 722 864 021', '✉️ drive@sadesafaris.co.ke', '🕒 Mon–Sat: 7am–8pm', '🚗 24hr Emergency Line']],
            ].map(([title, items]) => (
              <div key={title}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: 'white', marginBottom: '18px', paddingBottom: '10px', borderBottom: '2px solid #1a56db', display: 'inline-block' }}>{title}</h4>
                {items.map(item => (
                  <div key={item} style={{ fontSize: '13px', color: 'rgba(255,255,255,.45)', marginBottom: '9px', cursor: 'pointer', transition: 'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.paddingLeft = '4px'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.45)'; e.currentTarget.style.paddingLeft = '0'; }}
                  >{item}</div>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.25)' }}>© 2026 Fast Lane — A Sade Safaris Company. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                <span key={l} style={{ fontSize: '12px', color: 'rgba(255,255,255,.25)', cursor: 'pointer', transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.25)'}
                >{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .carfooter-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 600px) {
          .carfooter-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </>
  );
}

export default CarFooter;