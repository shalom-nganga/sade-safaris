import { useNavigate, useLocation } from 'react-router-dom';

const links = [
  { label: 'HOME', dropdown: false },
  { label: 'TOURS AND SAFARIS', dropdown: true },
  { label: 'EXPERIENCES', dropdown: true },
  { label: 'ABOUT US', dropdown: true },
  { label: 'SPECIAL OFFERS', dropdown: false },
  { label: 'CAR HIRE', dropdown: false },
  { label: 'BLOG', dropdown: false },
  { label: 'CONTACT US', dropdown: false },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActive = (label) => {
      if (label === 'HOME' && location.pathname === '/') return true;
      if (label === 'TOURS AND SAFARIS' && location.pathname === '/tours') return true;
      if (label === 'EXPERIENCES' && location.pathname === '/experiences') return true;
      if (label === 'ABOUT US' && location.pathname === '/about') return true;
      if (label === 'SPECIAL OFFERS' && location.pathname === '/special-offers') return true;
      if (label === 'BLOG' && location.pathname === '/blog') return true;
      if (label === 'CONTACT US' && location.pathname === '/contact') return true;
      if (label === 'CAR HIRE' && location.pathname.startsWith('/car-hire')) return true;
    return false;
  };

  return (
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
      }}>

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '14px 0', marginRight: '32px', flexShrink: 0,
            cursor: 'pointer',
          }}>
          <div style={{
            background: 'linear-gradient(135deg, #4a9c2f, #2d6a1a)',
            borderRadius: '8px',
            padding: '8px 14px',
          }}>
            <div style={{
              fontFamily: "'Oswald', sans-serif", fontSize: '20px',
              fontWeight: 700, color: 'white', letterSpacing: '2px', lineHeight: 1,
            }}>
              SS
            </div>
          </div>
          <div>
            <div style={{
              fontFamily: "'Oswald', sans-serif", fontSize: '18px',
              fontWeight: 700, color: '#2d6a1a', letterSpacing: '1px', lineHeight: 1,
            }}>
              SADE SAFARIS
            </div>
            <div style={{
              fontSize: '9px', fontWeight: 700, color: '#4a9c2f',
              letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px',
            }}>
              TOURS & TRAVEL
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, overflowX: 'auto' }}>
          {links.map((link) => (
            <div
              key={link.label}
              onClick={() => {
                if (link.label === 'HOME') navigate('/');
                   if (link.label === 'HOME') navigate('/');
                    if (link.label === 'TOURS AND SAFARIS') navigate('/tours');
                    if (link.label === 'EXPERIENCES') navigate('/experiences');
                    if (link.label === 'ABOUT US') navigate('/about');
                    if (link.label === 'SPECIAL OFFERS') navigate('/special-offers');
                    if (link.label === 'BLOG') navigate('/blog');
                    if (link.label === 'CONTACT US') navigate('/contact');
                    if (link.label === 'CAR HIRE') navigate('/car-hire');
              }}
              style={{
                fontSize: '12px', fontWeight: 700, letterSpacing: '.8px',
                color: getActive(link.label) ? '#4a9c2f' : '#1a1a1a',
                cursor: 'pointer', padding: '22px 14px',
                position: 'relative', whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: '4px',
                borderBottom: getActive(link.label) ? '3px solid #4a9c2f' : '3px solid transparent',
                transition: 'all .2s',
              }}
              onMouseEnter={e => {
                if (!getActive(link.label)) {
                  e.currentTarget.style.color = '#4a9c2f';
                }
              }}
              onMouseLeave={e => {
                if (!getActive(link.label)) {
                  e.currentTarget.style.color = '#1a1a1a';
                }
              }}
            >
              {link.label}
              {link.dropdown && (
                <span style={{ fontSize: '9px', opacity: .5 }}>▼</span>
              )}
            </div>
          ))}
        </div>

        {/* Search icon */}
        <div style={{
          marginLeft: '16px', cursor: 'pointer', fontSize: '20px',
          color: '#444', padding: '8px',
        }}>
          🔍
        </div>

      </div>
    </nav>
  );
}

export default Navbar;