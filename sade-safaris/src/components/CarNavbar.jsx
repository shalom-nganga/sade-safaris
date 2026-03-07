import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const links = [
  { label: 'HOME', path: '/car-hire' },
  { label: 'OUR FLEET', path: '/car-hire/fleet' },
  { label: 'SERVICES', path: '/car-hire/services' },
  { label: 'CONTACT', path: '/car-hire/contact' },
];

function CarNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={{ background: 'white', padding: '0 5%', boxShadow: '0 2px 20px rgba(0,0,0,.08)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center' }}>

          {/* Logo */}
          <div onClick={() => navigate('/car-hire')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 0', marginRight: '40px', flexShrink: 0, cursor: 'pointer' }}>
            <div style={{ background: 'linear-gradient(135deg, #1a56db, #0e3fa5)', borderRadius: '8px', padding: '8px 14px' }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', fontWeight: 700, color: 'white', letterSpacing: '2px', lineHeight: 1 }}>FL</div>
            </div>
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1a1a2e', letterSpacing: '1px', lineHeight: 1 }}>FAST LANE</div>
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#1a56db', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' }}>CAR HIRE & RENTALS</div>
            </div>
          </div>

          {/* Desktop links */}
          <div className="carnav-links" style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            {links.map(link => {
              const isActive = location.pathname === link.path || (link.path === '/car-hire' && location.pathname.startsWith('/car-hire'));
              return (
                <div key={link.label} onClick={() => navigate(link.path)} style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '.8px', color: isActive ? '#1a56db' : '#444', cursor: 'pointer', padding: '22px 16px', whiteSpace: 'nowrap', borderBottom: isActive ? '3px solid #1a56db' : '3px solid transparent', transition: 'all .2s' }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#1a56db'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#444'; }}
                >{link.label}</div>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="carnav-ctas" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#444' }}>
              📞 <span style={{ color: '#1a56db' }}>+254 722 864 021</span>
            </div>
            <button onClick={() => navigate('/')} style={{ background: 'transparent', color: '#4a9c2f', border: '2px solid #4a9c2f', padding: '8px 16px', fontSize: '11px', fontWeight: 800, cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit', letterSpacing: '.5px', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#4a9c2f'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4a9c2f'; }}
            >🦁 SAFARIS</button>
          </div>

          {/* Hamburger */}
          <button className="carnav-burger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', marginLeft: 'auto' }}>
            <span style={{ display: 'block', width: '24px', height: '2px', background: menuOpen ? 'transparent' : '#1a1a2e', transition: 'all .3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ display: 'block', width: '24px', height: '2px', background: '#1a1a2e', transition: 'all .3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '24px', height: '2px', background: menuOpen ? 'transparent' : '#1a1a2e', transition: 'all .3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>

        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="carnav-drawer" style={{ position: 'fixed', inset: 0, zIndex: 99 }}>
          <div onClick={() => setMenuOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.5)' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: '280px', height: '100%', background: 'white', padding: '24px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
            <div onClick={() => navigate('/car-hire')} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', cursor: 'pointer' }}>
              <div style={{ background: 'linear-gradient(135deg, #1a56db, #0e3fa5)', borderRadius: '6px', padding: '6px 10px' }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px', fontWeight: 700, color: 'white', letterSpacing: '2px' }}>FL</div>
              </div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1a1a2e' }}>FAST LANE</div>
            </div>
            {links.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <div key={link.label} onClick={() => { navigate(link.path); setMenuOpen(false); }} style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 700, color: isActive ? '#1a56db' : '#333', background: isActive ? '#eff6ff' : 'transparent', borderRadius: '6px', cursor: 'pointer', letterSpacing: '.5px', borderLeft: isActive ? '3px solid #1a56db' : '3px solid transparent' }}>
                  {link.label}
                </div>
              );
            })}
            <div style={{ marginTop: '20px', padding: '16px', background: '#f0f4ff', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#444', marginBottom: '8px' }}>📞 +254 722 864 021</div>
              <button onClick={() => { navigate('/'); setMenuOpen(false); }} style={{ width: '100%', background: '#4a9c2f', color: 'white', border: 'none', padding: '10px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit' }}>
                🦁 VISIT SAFARIS
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .carnav-links { display: none !important; }
          .carnav-ctas { display: none !important; }
          .carnav-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default CarNavbar;