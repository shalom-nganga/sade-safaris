import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const links = [
  { label: 'HOME', path: '/' },
  { label: 'TOURS & SAFARIS', path: '/tours' },
  { label: 'EXPERIENCES', path: '/experiences' },
  { label: 'ABOUT US', path: '/about' },
  { label: 'SPECIAL OFFERS', path: '/special-offers' },
  { label: 'CAR HIRE', path: '/car-hire' },
  { label: 'BLOG', path: '/blog' },
  { label: 'CONTACT US', path: '/contact' },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const getActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        background: 'white',
        padding: '0 5%',
        boxShadow: '0 2px 16px rgba(0,0,0,.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <div onClick={() => handleNav('/')} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '14px 0', flexShrink: 0, cursor: 'pointer',
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #4a9c2f, #2d6a1a)',
              borderRadius: '8px', padding: '8px 14px',
            }}>
              <div style={{
                fontFamily: "'Oswald', sans-serif", fontSize: '20px',
                fontWeight: 700, color: 'white', letterSpacing: '2px', lineHeight: 1,
              }}>SS</div>
            </div>
            <div>
              <div style={{
                fontFamily: "'Oswald', sans-serif", fontSize: '18px',
                fontWeight: 700, color: '#2d6a1a', letterSpacing: '1px', lineHeight: 1,
              }}>SADE SAFARIS</div>
              <div style={{
                fontSize: '9px', fontWeight: 700, color: '#4a9c2f',
                letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px',
              }}>TOURS & TRAVEL</div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div style={{
            display: 'flex', alignItems: 'center', flex: 1,
            '@media (max-width: 768px)': { display: 'none' },
          }} className="desktop-nav">
            {links.map(link => (
              <div key={link.label} onClick={() => handleNav(link.path)}
                style={{
                  fontSize: '11px', fontWeight: 700, letterSpacing: '.8px',
                  color: getActive(link.path) ? '#4a9c2f' : '#1a1a1a',
                  cursor: 'pointer', padding: '22px 12px',
                  whiteSpace: 'nowrap',
                  borderBottom: getActive(link.path) ? '3px solid #4a9c2f' : '3px solid transparent',
                  transition: 'all .2s',
                }}
                onMouseEnter={e => { if (!getActive(link.path)) e.currentTarget.style.color = '#4a9c2f'; }}
                onMouseLeave={e => { if (!getActive(link.path)) e.currentTarget.style.color = '#1a1a1a'; }}
              >
                {link.label}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ cursor: 'pointer', fontSize: '20px', color: '#444', padding: '8px' }}>🔍</div>

            {/* Hamburger button - mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hamburger-btn"
              style={{
                display: 'none',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px', flexDirection: 'column', gap: '5px',
              }}
            >
              <span style={{ display: 'block', width: '24px', height: '2px', background: menuOpen ? '#4a9c2f' : '#1a1a1a', transition: 'all .3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ display: 'block', width: '24px', height: '2px', background: menuOpen ? '#4a9c2f' : '#1a1a1a', transition: 'all .3s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: '24px', height: '2px', background: menuOpen ? '#4a9c2f' : '#1a1a1a', transition: 'all .3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,.5)', zIndex: 98,
        }} onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '280px',
        background: 'white', zIndex: 99,
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .3s ease',
        boxShadow: '-4px 0 24px rgba(0,0,0,.15)',
        overflowY: 'auto',
        display: 'none',
      }} className="mobile-drawer">
        {/* Drawer Header */}
        <div style={{
          background: 'linear-gradient(135deg, #2d6a1a, #4a9c2f)',
          padding: '24px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, color: 'white', letterSpacing: '1px' }}>SADE SAFARIS</div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,.7)', letterSpacing: '2px', marginTop: '2px' }}>TOURS & TRAVEL</div>
          </div>
          <button onClick={() => setMenuOpen(false)} style={{ background: 'rgba(255,255,255,.2)', border: 'none', color: 'white', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px' }}>✕</button>
        </div>

        {/* Drawer Links */}
        <div style={{ padding: '12px 0' }}>
          {links.map(link => (
            <div key={link.label} onClick={() => handleNav(link.path)}
              style={{
                padding: '15px 24px', fontSize: '13px', fontWeight: 700,
                letterSpacing: '.8px', cursor: 'pointer',
                color: getActive(link.path) ? '#4a9c2f' : '#1a1a2e',
                background: getActive(link.path) ? '#eaf5e3' : 'transparent',
                borderLeft: getActive(link.path) ? '3px solid #4a9c2f' : '3px solid transparent',
                transition: 'all .2s',
              }}
              onMouseEnter={e => { if (!getActive(link.path)) e.currentTarget.style.background = '#f8fafc'; }}
              onMouseLeave={e => { if (!getActive(link.path)) e.currentTarget.style.background = 'transparent'; }}
            >
              {link.label}
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid #f1f5f9', marginTop: 'auto' }}>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>📞 <strong>+254 722 864 021</strong></div>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>✉️ <strong>info@sadesafaris.co.ke</strong></div>
          <button onClick={() => handleNav('/contact')} style={{
            width: '100%', background: '#4a9c2f', color: 'white', border: 'none',
            padding: '12px', borderRadius: '8px', fontSize: '13px', fontWeight: 800,
            cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '.5px',
          }}>
            START PLANNING →
          </button>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .mobile-drawer { display: block !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;