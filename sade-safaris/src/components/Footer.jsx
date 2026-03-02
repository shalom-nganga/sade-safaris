const footerLinks = [
  {
    title: 'QUICK LINKS',
    links: ['Home', 'Tours & Safaris', 'Destinations', 'Special Offers', 'About Us', 'Blog', 'Contact Us'],
  },
  {
    title: 'TOP TOURS',
    links: ['Masai Mara Safari', 'Amboseli Trek', 'Mt. Kenya Climb', 'Diani Beach Escape', 'Tsavo Explorer', 'Lake Nakuru'],
  },
  {
    title: 'CONTACT US',
    links: ['📍 Westlands, Nairobi, Kenya', '📞 +254 722 864 021', '✉️ info@sadesafaris.co.ke', '🌐 www.sadesafaris.co.ke', '🕒 Mon – Sat: 8am – 6pm'],
  },
];

function Footer() {
  return (
    <footer style={{ background: '#0f2209', padding: '64px 5% 28px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '48px',
        }}>

          {/* Brand column */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                fontFamily: "'Oswald', sans-serif", fontSize: '22px',
                fontWeight: 700, color: 'white', letterSpacing: '1px', lineHeight: 1,
              }}>
                SADE SAFARIS
              </div>
              <div style={{
                fontSize: '9px', fontWeight: 700, color: '#4a9c2f',
                letterSpacing: '2px', marginTop: '4px',
              }}>
                TOURS & TRAVEL
              </div>
            </div>
            <p style={{
              fontSize: '13px', color: 'rgba(255,255,255,.5)',
              lineHeight: 1.85, maxWidth: '280px', marginBottom: '24px',
            }}>
              East Africa's most trusted safari company, creating extraordinary
              wildlife experiences across Kenya and beyond since 2009.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {['f', 'in', 'tw', '▶', '📸'].map((s, i) => (
                <div
                  key={i}
                  style={{
                    width: '34px', height: '34px', borderRadius: '4px',
                    background: 'rgba(255,255,255,.08)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', cursor: 'pointer', color: 'white',
                    transition: 'background .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f5c518'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(col => (
            <div key={col.title}>
              <h4 style={{
                fontSize: '13px', fontWeight: 800, letterSpacing: '1px',
                textTransform: 'uppercase', color: 'white',
                marginBottom: '18px', paddingBottom: '10px',
                borderBottom: '2px solid #f5c518', display: 'inline-block',
              }}>
                {col.title}
              </h4>
              {col.links.map(link => (
                <div
                  key={link}
                  style={{
                    fontSize: '13px', color: 'rgba(255,255,255,.55)',
                    marginBottom: '10px', cursor: 'pointer',
                    transition: 'all .2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#f5c518';
                    e.currentTarget.style.paddingLeft = '4px';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,.55)';
                    e.currentTarget.style.paddingLeft = '0';
                  }}
                >
                  {link}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,.08)',
          paddingTop: '24px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '12px',
        }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.3)' }}>
            © 2026 Sade Safaris. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
              <span
                key={l}
                style={{
                  fontSize: '12px', color: 'rgba(255,255,255,.3)',
                  cursor: 'pointer', transition: 'color .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#f5c518'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.3)'}
              >
                {l}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;