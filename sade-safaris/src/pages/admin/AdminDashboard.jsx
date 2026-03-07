import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTours, getVehicles, getSafariBookings, getCarBookings, getBlogPosts, getMessages, getOffers } from '../../store';

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ tours: 0, vehicles: 0, safariBookings: 0, carBookings: 0, blog: 0, messages: 0, unreadMessages: 0, offers: 0, pendingSafari: 0, pendingCar: 0, totalRevenue: 0 });
  const [recentSafari, setRecentSafari] = useState([]);
  const [recentCar, setRecentCar] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    async function load() {
      const tours = await getTours();
      const vehicles = await getVehicles();
      const safariBookings = await getSafariBookings();
      const carBookings = await getCarBookings();
      const blog = await getBlogPosts();
      const messages = await getMessages();
      const offers = await getOffers();
      const safariRevenue = safariBookings.filter(b => b.status === 'Confirmed').reduce((acc, b) => acc + Number(b.amount || 0), 0);
      const carRevenue = carBookings.filter(b => b.status === 'Completed' || b.status === 'Confirmed').reduce((acc, b) => acc + Number(b.amount || 0), 0);
      setStats({ tours: tours.length, vehicles: vehicles.length, safariBookings: safariBookings.length, carBookings: carBookings.length, blog: blog.filter(p => p.status === 'Published').length, messages: messages.length, unreadMessages: messages.filter(m => m.status === 'Unread').length, offers: offers.filter(o => o.status === 'Active').length, pendingSafari: safariBookings.filter(b => b.status === 'Pending').length, pendingCar: carBookings.filter(b => b.status === 'Pending').length, totalRevenue: safariRevenue + carRevenue });
      setRecentSafari(safariBookings.slice(0, 5));
      setRecentCar(carBookings.slice(0, 5));
      setRecentMessages(messages.filter(m => m.status === 'Unread').slice(0, 5));
    }
    load();
  }, []);

  const statCards = [
    { label: 'Total Tours', value: stats.tours, icon: '🦁', color: '#4a9c2f', bg: '#eaf5e3', path: '/admin/tours' },
    { label: 'Vehicles', value: stats.vehicles, icon: '🚗', color: '#1a56db', bg: '#eff6ff', path: '/admin/vehicles' },
    { label: 'Safari Bookings', value: stats.safariBookings, icon: '🏕️', color: '#4a9c2f', bg: '#eaf5e3', path: '/admin/safari-bookings' },
    { label: 'Car Bookings', value: stats.carBookings, icon: '🔑', color: '#1a56db', bg: '#eff6ff', path: '/admin/car-bookings' },
    { label: 'Published Posts', value: stats.blog, icon: '✍️', color: '#8b5cf6', bg: '#f5f3ff', path: '/admin/blog' },
    { label: 'Active Offers', value: stats.offers, icon: '🎁', color: '#f59e0b', bg: '#fffbeb', path: '/admin/offers' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: '✉️', color: '#ef4444', bg: '#fef2f2', path: '/admin/messages' },
    { label: 'Total Revenue', value: `KES ${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: '#4a9c2f', bg: '#eaf5e3', path: null },
  ];

  const statusColor = (status) => {
    if (status === 'Confirmed' || status === 'Active') return { bg: '#eaf5e3', color: '#4a9c2f' };
    if (status === 'Pending') return { bg: '#fffbeb', color: '#d97706' };
    if (status === 'Cancelled') return { bg: '#fef2f2', color: '#ef4444' };
    if (status === 'Completed') return { bg: '#f5f3ff', color: '#8b5cf6' };
    return { bg: '#f1f5f9', color: '#64748b' };
  };

  return (
    <>
      <div>
        {/* Welcome */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', marginBottom: '4px' }}>Welcome Back 👋</h2>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Here's what's happening with your business today.</p>
        </div>

        {/* Alerts */}
        {(stats.pendingSafari > 0 || stats.pendingCar > 0 || stats.unreadMessages > 0) && (
          <div className="dash-alerts" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {stats.pendingSafari > 0 && (
              <div onClick={() => navigate('/admin/safari-bookings')} style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '8px', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flex: 1, minWidth: '180px' }}>
                <span style={{ fontSize: '20px' }}>🏕️</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#d97706' }}>{stats.pendingSafari} Pending Safari {stats.pendingSafari === 1 ? 'Booking' : 'Bookings'}</div>
                  <div style={{ fontSize: '11px', color: '#92400e' }}>Click to review</div>
                </div>
              </div>
            )}
            {stats.pendingCar > 0 && (
              <div onClick={() => navigate('/admin/car-bookings')} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flex: 1, minWidth: '180px' }}>
                <span style={{ fontSize: '20px' }}>🚗</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#1a56db' }}>{stats.pendingCar} Pending Car {stats.pendingCar === 1 ? 'Booking' : 'Bookings'}</div>
                  <div style={{ fontSize: '11px', color: '#1e40af' }}>Click to review</div>
                </div>
              </div>
            )}
            {stats.unreadMessages > 0 && (
              <div onClick={() => navigate('/admin/messages')} style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flex: 1, minWidth: '180px' }}>
                <span style={{ fontSize: '20px' }}>✉️</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#ef4444' }}>{stats.unreadMessages} Unread {stats.unreadMessages === 1 ? 'Message' : 'Messages'}</div>
                  <div style={{ fontSize: '11px', color: '#991b1b' }}>Click to read</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stat Cards */}
        <div className="dash-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {statCards.map(card => (
            <div key={card.label} onClick={() => card.path && navigate(card.path)}
              style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.04)', cursor: card.path ? 'pointer' : 'default', transition: 'all .2s' }}
              onMouseEnter={e => { if (card.path) { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ width: '44px', height: '44px', background: card.bg, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{card.icon}</div>
                {card.path && <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>VIEW →</span>}
              </div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '26px', fontWeight: 700, color: card.color, marginBottom: '4px' }}>{card.value}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="dash-recent" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Safari */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.04)', overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>RECENT SAFARI BOOKINGS</h3>
              <button onClick={() => navigate('/admin/safari-bookings')} style={{ fontSize: '11px', fontWeight: 700, color: '#4a9c2f', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>View All →</button>
            </div>
            <div>
              {recentSafari.length === 0 ? (
                <div style={{ padding: '28px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No bookings yet</div>
              ) : recentSafari.map((b, i) => (
                <div key={b.id} style={{ padding: '14px 20px', borderBottom: i < recentSafari.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.tour_name}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '20px', ...statusColor(b.status) }}>{b.status}</span>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#4a9c2f', marginTop: '3px' }}>KES {Number(b.amount).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Car */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.04)', overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>RECENT CAR BOOKINGS</h3>
              <button onClick={() => navigate('/admin/car-bookings')} style={{ fontSize: '11px', fontWeight: 700, color: '#1a56db', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>View All →</button>
            </div>
            <div>
              {recentCar.length === 0 ? (
                <div style={{ padding: '28px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No bookings yet</div>
              ) : recentCar.map((b, i) => (
                <div key={b.id} style={{ padding: '14px 20px', borderBottom: i < recentCar.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.vehicle_name}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '20px', ...statusColor(b.status) }}>{b.status}</span>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a56db', marginTop: '3px' }}>KES {Number(b.amount).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unread Messages */}
        {recentMessages.length > 0 && (
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.04)', overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>UNREAD MESSAGES</h3>
              <button onClick={() => navigate('/admin/messages')} style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>View All →</button>
            </div>
            <div className="dash-messages" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
              {recentMessages.map((m) => (
                <div key={m.id} onClick={() => navigate('/admin/messages')} style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background .15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', gap: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#1a1a2e', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.name}</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', flexShrink: 0 }}>{m.created_at}</div>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '2px' }}>{m.subject}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dash-recent { grid-template-columns: 1fr !important; }
          .dash-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .dash-alerts { flex-direction: column !important; }
          .dash-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
        }
      `}</style>
    </>
  );
}

export default AdminDashboard;