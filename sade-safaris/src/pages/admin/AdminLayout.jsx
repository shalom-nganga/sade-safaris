import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initStore } from '../../store';
import AdminDashboard from './AdminDashboard';
import SafariBookings from './SafariBookings';
import CarBookings from './CarBookings';
import ManageTours from './ManageTours';
import ManageVehicles from './ManageVehicles';
import AdminBlog from './AdminBlog';
import AdminOffers from './AdminOffers';
import AdminMessages from './AdminMessages';

const navSections = [
  { label: 'OVERVIEW', items: [
    { icon: '📊', label: 'Dashboard', path: '/admin/dashboard' },
    { icon: '✉️', label: 'Messages', path: '/admin/messages', badge: 5 },
  ]},
  { label: '🦁 SADE SAFARIS', items: [
    { icon: '📋', label: 'Safari Bookings', path: '/admin/safari-bookings', badge: 3 },
    { icon: '🗺️', label: 'Manage Tours', path: '/admin/tours' },
    { icon: '🎯', label: 'Special Offers', path: '/admin/offers' },
    { icon: '📝', label: 'Blog Posts', path: '/admin/blog' },
  ]},
  { label: '🚗 FAST LANE', items: [
    { icon: '🔑', label: 'Car Bookings', path: '/admin/car-bookings', badge: 2 },
    { icon: '🚙', label: 'Manage Vehicles', path: '/admin/vehicles' },
  ]},
];

const pageTitles = {
  dashboard: '📊 Dashboard', 'safari-bookings': '📋 Safari Bookings',
  'car-bookings': '🔑 Car Hire Bookings', tours: '🗺️ Manage Tours',
  vehicles: '🚙 Manage Vehicles', blog: '📝 Blog Posts',
  offers: '🎯 Special Offers', messages: '✉️ Messages & Enquiries',
};

function AdminLayout({ page }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  initStore();

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) navigate('/admin');
  }, [navigate]);

  // Close sidebar on route change
  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <AdminDashboard />;
      case 'safari-bookings': return <SafariBookings />;
      case 'car-bookings': return <CarBookings />;
      case 'tours': return <ManageTours />;
      case 'vehicles': return <ManageVehicles />;
      case 'blog': return <AdminBlog />;
      case 'offers': return <AdminOffers />;
      case 'messages': return <AdminMessages />;
      default: return <AdminDashboard />;
    }
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #4a9c2f, #2d6a1a)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>🦁</div>
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '14px', fontWeight: 700, color: '#1a1a2e', letterSpacing: '1px' }}>ADMIN PORTAL</div>
            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>Sade Safaris & Fast Lane</div>
          </div>
        </div>
        {/* Close button on mobile */}
        <button onClick={() => setSidebarOpen(false)} className="sidebar-close-btn" style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#94a3b8', display: 'none' }}>✕</button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        {navSections.map(section => (
          <div key={section.label} style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', letterSpacing: '1.5px', padding: '0 8px', marginBottom: '6px' }}>
              {section.label}
            </div>
            {section.items.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <div key={item.path} onClick={() => navigate(item.path)} style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                  borderRadius: '8px', cursor: 'pointer', marginBottom: '2px', transition: 'all .2s',
                  background: isActive ? '#f0f4ff' : 'transparent',
                  color: isActive ? '#1a56db' : '#475569',
                  fontWeight: isActive ? 800 : 600, fontSize: '13px',
                  borderLeft: isActive ? '3px solid #1a56db' : '3px solid transparent',
                }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#f8fafc'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{ background: '#ef4444', color: 'white', fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '20px' }}>{item.badge}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '16px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '8px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #1a56db, #0e3fa5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: 800, flexShrink: 0 }}>A</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e' }}>Admin</div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>admin@sadesafaris.co.ke</div>
          </div>
        </div>
        <button onClick={handleLogout} style={{ width: '100%', padding: '10px', fontSize: '12px', fontWeight: 700, background: 'transparent', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
          🚪 Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Nunito Sans', sans-serif", background: '#f8fafc' }}>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} className="sidebar-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 150 }} />
        )}

        {/* Sidebar */}
        <div className={`admin-sidebar${sidebarOpen ? ' sidebar-open' : ''}`} style={{
          width: '260px', background: 'white', flexShrink: 0,
          borderRight: '1px solid #e2e8f0', display: 'flex',
          flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0,
          zIndex: 200, transition: 'transform .3s ease',
        }}>
          <SidebarContent />
        </div>

        {/* Main content */}
        <div className="admin-main" style={{ marginLeft: '260px', flex: 1, minWidth: 0 }}>

          {/* Top bar */}
          <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50, gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              {/* Hamburger — mobile only */}
              <button onClick={() => setSidebarOpen(true)} className="admin-burger" style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', display: 'none', padding: '4px', flexShrink: 0 }}>☰</button>
              <div style={{ minWidth: 0 }}>
                <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(14px, 3vw, 20px)', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {pageTitles[page]}
                </h2>
                <p className="topbar-date" style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                  {new Date().toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="topbar-btns" style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button onClick={() => navigate('/')} style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, background: '#eaf5e3', color: '#4a9c2f', border: '1px solid #c6e8b3', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                🦁 <span className="btn-label">View Safari Site</span>
              </button>
              <button onClick={() => navigate('/car-hire')} style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, background: '#eff6ff', color: '#1a56db', border: '1px solid #bfdbfe', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                🚗 <span className="btn-label">View Car Hire Site</span>
              </button>
            </div>
          </div>

          {/* Page content */}
          <div className="admin-content" style={{ padding: '28px' }}>
            {renderPage()}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar { transform: translateX(-100%); }
          .admin-sidebar.sidebar-open { transform: translateX(0); }
          .admin-main { margin-left: 0 !important; }
          .admin-burger { display: block !important; }
          .sidebar-close-btn { display: block !important; }
          .admin-content { padding: 20px !important; }
          .topbar-date { display: none; }
        }
        @media (max-width: 600px) {
          .admin-content { padding: 14px !important; }
          .btn-label { display: none; }
          .topbar-btns button { padding: 8px 10px !important; }
        }
      `}</style>
    </>
  );
}

export default AdminLayout;