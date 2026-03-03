import { useState, useEffect } from 'react';
import { getCarBookings, updateCarBookingStatus, deleteCarBooking } from '../../store';

const statusColor = status => {
  if (status === 'Active') return { bg: '#eff6ff', color: '#1a56db' };
  if (status === 'Confirmed') return { bg: '#eaf5e3', color: '#4a9c2f' };
  if (status === 'Pending') return { bg: '#fffbeb', color: '#d97706' };
  if (status === 'Completed') return { bg: '#f5f3ff', color: '#8b5cf6' };
  if (status === 'Cancelled') return { bg: '#fef2f2', color: '#ef4444' };
  return { bg: '#f1f5f9', color: '#64748b' };
};

function CarBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => { setBookings(getCarBookings()); }, []);

  const refresh = () => setBookings(getCarBookings());

  const handleStatus = (id, status) => {
    updateCarBookingStatus(id, status);
    refresh();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this booking?')) {
      deleteCarBooking(id);
      refresh();
    }
  };

  const filtered = bookings
    .filter(b => filterStatus === 'All' || b.status === filterStatus)
    .filter(b =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.vehicle_name.toLowerCase().includes(search.toLowerCase()) ||
      b.booking_ref.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Total Bookings', value: bookings.length, color: '#1a56db' },
          { label: 'Active', value: bookings.filter(b => b.status === 'Active').length, color: '#1a56db' },
          { label: 'Confirmed', value: bookings.filter(b => b.status === 'Confirmed').length, color: '#4a9c2f' },
          { label: 'Pending', value: bookings.filter(b => b.status === 'Pending').length, color: '#d97706' },
          { label: 'Cancelled', value: bookings.filter(b => b.status === 'Cancelled').length, color: '#ef4444' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', borderRadius: '10px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>{s.label}</div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '28px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search by name, vehicle or ref..."
          style={{ border: '2px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', width: '280px' }}
          onFocus={e => e.target.style.borderColor = '#1a56db'}
          onBlur={e => e.target.style.borderColor = '#e2e8f0'}
        />
        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'Pending', 'Confirmed', 'Active', 'Completed', 'Cancelled'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} style={{
              padding: '8px 16px', fontSize: '12px', fontWeight: 700,
              borderRadius: '20px', cursor: 'pointer', fontFamily: 'inherit', border: '1.5px solid',
              background: filterStatus === s ? '#1a56db' : 'white',
              color: filterStatus === s ? 'white' : '#555',
              borderColor: filterStatus === s ? '#1a56db' : '#e2e8f0',
            }}>{s}</button>
          ))}
        </div>
        <span style={{ marginLeft: 'auto', fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>
          <span style={{ color: '#1a56db' }}>{filtered.length}</span> bookings
        </span>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                {['Ref', 'Client', 'Vehicle', 'Pickup', 'Return', 'Days', 'Driver', 'Amount', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={10} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No bookings found</td></tr>
              ) : filtered.map((b, i) => (
                <tr key={b.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 16px', fontWeight: 800, color: '#1a56db' }}>{b.booking_ref}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, color: '#1a1a2e' }}>{b.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{b.email}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569', whiteSpace: 'nowrap' }}>{b.vehicle_name}</td>
                  <td style={{ padding: '14px 16px', color: '#475569', whiteSpace: 'nowrap' }}>{b.pickup_date}</td>
                  <td style={{ padding: '14px 16px', color: '#475569', whiteSpace: 'nowrap' }}>{b.return_date}</td>
                  <td style={{ padding: '14px 16px', color: '#475569', textAlign: 'center' }}>{b.days}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', background: b.with_driver ? '#eff6ff' : '#f1f5f9', color: b.with_driver ? '#1a56db' : '#64748b' }}>
                      {b.with_driver ? '👨‍✈️ Yes' : '🚗 No'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1a1a2e', whiteSpace: 'nowrap' }}>
                    KES {Number(b.amount).toLocaleString()}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <select
                      value={b.status}
                      onChange={e => handleStatus(b.id, e.target.value)}
                      style={{
                        fontSize: '11px', fontWeight: 700, padding: '4px 8px',
                        borderRadius: '20px', border: '1.5px solid',
                        background: statusColor(b.status).bg,
                        color: statusColor(b.status).color,
                        borderColor: statusColor(b.status).color,
                        cursor: 'pointer', fontFamily: 'inherit', outline: 'none',
                      }}
                    >
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Active</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button
                      onClick={() => handleDelete(b.id)}
                      style={{ padding: '5px 10px', fontSize: '11px', fontWeight: 700, background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CarBookings;