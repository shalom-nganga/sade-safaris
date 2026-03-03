import { useState, useEffect } from 'react';
import { getVehicles, saveVehicle, deleteVehicle } from '../../store';
import ImageUpload from '../../pages/admin/ImageUpload';

const emptyVehicle = {
  name: '', type: 'SUV', seats: '', transmission: 'Automatic', fuel: 'Petrol',
  pricePerDay: '', img: '', badge: '', badgeColor: '#1a56db',
  available: true, description: '', features: [],
};

const types = ['Sedan', 'SUV', 'Safari 4x4', 'Van / Minibus', 'Luxury'];
const transmissions = ['Automatic', 'Manual'];
const fuels = ['Petrol', 'Diesel', 'Hybrid'];

function ManageVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyVehicle);
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
  async function load() {
    setVehicles(await getVehicles());
  }
  load();
}, []);

const refresh = async () => setVehicles(await getVehicles());

const handleSave = async () => {
  if (!form.name || !form.pricePerDay) return alert('Name and price are required!');
  await saveVehicle({ ...form, id: editing || undefined });
  await refresh();
  closeModal();
};

const handleDelete = async (id) => {
  if (window.confirm('Delete this vehicle?')) {
    await deleteVehicle(id);
    refresh();
  }
};

const openAdd = () => { setForm(emptyVehicle); setEditing(null); setShowModal(true); };
const openEdit = (v) => { setForm(v); setEditing(v.id); setShowModal(true); };
const closeModal = () => { setShowModal(false); setEditing(null); setForm(emptyVehicle); };
const handleChange = e => {
  const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
  setForm({ ...form, [e.target.name]: val });
};
const addFeature = () => {
  if (!featureInput.trim()) return;
  setForm({ ...form, features: [...(form.features || []), featureInput.trim()] });
  setFeatureInput('');
};
const removeFeature = (i) => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) });

  const filtered = vehicles.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    (v.type || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search vehicles..."
          style={{ border: '2px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', width: '280px' }}
          onFocus={e => e.target.style.borderColor = '#1a56db'}
          onBlur={e => e.target.style.borderColor = '#e2e8f0'}
        />
        <button onClick={openAdd} style={{ background: '#1a56db', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          + Add New Vehicle
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {filtered.map(vehicle => (
          <div key={vehicle.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.04)', transition: 'all .2s', opacity: vehicle.available ? 1 : .7 }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ height: '140px', overflow: 'hidden', position: 'relative', background: '#f0f4ff' }}>
              {vehicle.img ? (
                <img src={vehicle.img} alt={vehicle.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>🚗</div>
              )}
              {vehicle.badge && (
                <div style={{ position: 'absolute', top: '10px', left: '10px', background: vehicle.badgeColor || '#1a56db', color: 'white', fontSize: '10px', fontWeight: 800, padding: '3px 10px', borderRadius: '20px' }}>
                  {vehicle.badge}
                </div>
              )}
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: vehicle.available ? '#eaf5e3' : '#fef2f2', color: vehicle.available ? '#4a9c2f' : '#ef4444', fontSize: '10px', fontWeight: 800, padding: '3px 10px', borderRadius: '20px' }}>
                {vehicle.available ? '✅ Available' : '❌ Unavailable'}
              </div>
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#1a56db', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{vehicle.type}</div>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1a1a2e', marginBottom: '8px' }}>{vehicle.name}</h3>
              <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>
                <span>💺 {vehicle.seats} seats</span>
                <span>⚙️ {vehicle.transmission}</span>
                <span>⛽ {vehicle.fuel}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1a56db' }}>
                  KES {Number(vehicle.pricePerDay).toLocaleString()}/day
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEdit(vehicle)} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 700, background: '#eff6ff', color: '#1a56db', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
                  <button onClick={() => handleDelete(vehicle.id)} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 700, background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '36px', width: '100%', maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase' }}>
                {editing ? 'EDIT VEHICLE' : 'ADD NEW VEHICLE'}
              </h2>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

              {/* Name */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>VEHICLE NAME *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Toyota Land Cruiser V8"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#1a56db'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Type & Seats */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>TYPE</label>
                <select name="type" value={form.type} onChange={handleChange}
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', background: 'white' }}>
                  {types.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>SEATS</label>
                <input name="seats" type="number" value={form.seats} onChange={handleChange} placeholder="e.g. 7"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#1a56db'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Transmission & Fuel */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>TRANSMISSION</label>
                <select name="transmission" value={form.transmission} onChange={handleChange}
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', background: 'white' }}>
                  {transmissions.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>FUEL</label>
                <select name="fuel" value={form.fuel} onChange={handleChange}
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', background: 'white' }}>
                  {fuels.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>

              {/* Price & Badge */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>PRICE PER DAY (KES) *</label>
                <input name="pricePerDay" type="number" value={form.pricePerDay} onChange={handleChange} placeholder="e.g. 8500"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#1a56db'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>BADGE (optional)</label>
                <input name="badge" value={form.badge} onChange={handleChange} placeholder="e.g. POPULAR"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#1a56db'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Image Upload */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>IMAGE</label>
                <ImageUpload value={form.img} onChange={val => setForm({ ...form, img: val })} />
              </div>

              {/* Description */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>DESCRIPTION</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Vehicle description..."
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = '#1a56db'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Features */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>FEATURES</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input value={featureInput} onChange={e => setFeatureInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addFeature()}
                    placeholder="Type and press Enter..."
                    style={{ flex: 1, border: '2px solid #e2e8f0', borderRadius: '8px', padding: '9px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#1a56db'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button onClick={addFeature} style={{ background: '#1a56db', color: 'white', border: 'none', padding: '9px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>Add</button>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {(form.features || []).map((f, i) => (
                    <span key={i} style={{ background: '#eff6ff', color: '#1a56db', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {f} <span onClick={() => removeFeature(i)} style={{ cursor: 'pointer', fontWeight: 800 }}>✕</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Available toggle */}
              <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input type="checkbox" name="available" checked={form.available} onChange={handleChange} id="available"
                  style={{ width: '18px', height: '18px', accentColor: '#1a56db', cursor: 'pointer' }}
                />
                <label htmlFor="available" style={{ fontSize: '13px', fontWeight: 700, color: '#475569', cursor: 'pointer' }}>
                  Vehicle is currently available for hire
                </label>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '28px', justifyContent: 'flex-end' }}>
              <button onClick={closeModal} style={{ padding: '12px 24px', fontSize: '13px', fontWeight: 700, background: 'white', color: '#64748b', border: '2px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>
                Cancel
              </button>
              <button onClick={handleSave} style={{ padding: '12px 32px', fontSize: '13px', fontWeight: 800, background: '#1a56db', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(26,86,219,.3)' }}>
                {editing ? 'SAVE CHANGES' : 'ADD VEHICLE'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageVehicles;