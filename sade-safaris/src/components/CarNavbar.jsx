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

  return (
    <nav style={{
      background: 'white',
      padding: '0 5%',
      boxShadow: '0 2px 20px rgba(0,0,0,.08)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        display: 'flex', alignItems: 'center',
      }}>

        {/* Logo */}
       <div
            onClick={() => navigate('/car-hire')}
            style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '16px 0', marginRight: '40px', flexShrink: 0, cursor: 'pointer',
            }}
            >
            <div style={{
                background: 'linear-gradient(135deg, #1a56db, #0e3fa5)',
                borderRadius: '8px', padding: '8px 14px',
            }}>
                <div style={{
                fontFamily: "'Oswald', sans-serif", fontSize: '20px',
                fontWeight: 700, color: 'white', letterSpacing: '2px', lineHeight: 1,
                }}>
                FL
                </div>
            </div>
            <div>
                <div style={{
                fontFamily: "'Oswald', sans-serif", fontSize: '18px',
                fontWeight: 700, color: '#1a1a2e', letterSpacing: '1px', lineHeight: 1,
                }}>
                FAST LANE
                </div>
                <div style={{
                fontSize: '9px', fontWeight: 700, color: '#1a56db',
                letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px',
                }}>
                CAR HIRE & RENTALS
                </div>
            </div>
            </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          {links.map(link => {
            const isActive = location.pathname === link.path ||
              (link.path === '/car-hire' && location.pathname.startsWith('/car-hire'));
            return (
              <div
                key={link.label}
                onClick={() => navigate(link.path)}
                style={{
                  fontSize: '12px', fontWeight: 700, letterSpacing: '.8px',
                  color: isActive ? '#1a56db' : '#444',
                  cursor: 'pointer', padding: '22px 16px', whiteSpace: 'nowrap',
                  borderBottom: isActive ? '3px solid #1a56db' : '3px solid transparent',
                  transition: 'all .2s',
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.color = '#1a56db';
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = '#444';
                }}
              >
                {link.label}
              </div>
            );
          })}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#444' }}>
            📞 <span style={{ color: '#1a56db' }}>+254 722 864 021</span>
          </div>
          {/* <button
            onClick={() => navigate('/car-hire/contact')}
            style={{
              background: '#1a56db', color: 'white', border: 'none',
              padding: '10px 22px', fontSize: '12px', fontWeight: 800,
              cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit',
              letterSpacing: '.5px', transition: 'all .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#0e3fa5'}
            onMouseLeave={e => e.currentTarget.style.background = '#1a56db'}
          >
            BOOK NOW
          </button> */}
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'transparent', color: '#4a9c2f', border: '2px solid #4a9c2f',
              padding: '8px 16px', fontSize: '11px', fontWeight: 800,
              cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit',
              letterSpacing: '.5px', transition: 'all .2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#4a9c2f';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#4a9c2f';
            }}
          >
            🦁 SAFARIS
          </button>
        </div>

      </div>
    </nav>
  );
}

export default CarNavbar;