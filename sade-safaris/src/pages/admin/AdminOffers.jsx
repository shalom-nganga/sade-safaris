import { useState, useEffect } from 'react';
import { getOffers, saveOffer, deleteOffer } from '../../store';
import ImageUpload from '../../pages/admin/ImageUpload';

const emptyOffer = {
  title: '', discount: '', tag: '', original_price: '', offer_price: '',
  valid_until: '', description: '', includes: [], status: 'Active', img: '',
};

function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyOffer);
  const [includeInput, setIncludeInput] = useState('');

  useEffect(() => {
  async function load() {
    setOffers(await getOffers());
  }
  load();
}, []);

const refresh = async () => setOffers(await getOffers());

const handleSave = async () => {
  if (!form.title || !form.discount) return alert('Title and discount are required!');
  await saveOffer({ ...form, id: editing || undefined });
  await refresh();
  closeModal();
};

const handleDelete = async (id) => {
  if (window.confirm('Delete this offer?')) {
    await deleteOffer(id);
    refresh();
  }
};

const handleToggleStatus = async (offer) => {
  const next = offer.status === 'Active' ? 'Expired' : 'Active';
  await saveOffer({ ...offer, status: next });
  refresh();
};

const openAdd = () => { setForm(emptyOffer); setEditing(null); setShowModal(true); };
const openEdit = (o) => { setForm(o); setEditing(o.id); setShowModal(true); };
const closeModal = () => { setShowModal(false); setEditing(null); setForm(emptyOffer); };
const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
const addInclude = () => {
  if (!includeInput.trim()) return;
  setForm({ ...form, includes: [...(form.includes || []), includeInput.trim()] });
  setIncludeInput('');
};
const removeInclude = (i) => setForm({ ...form, includes: form.includes.filter((_, idx) => idx !== i) });

  const statusColor = (status) => {
    if (status === 'Active') return { bg: '#eaf5e3', color: '#4a9c2f' };
    if (status === 'Expiring Soon') return { bg: '#fffbeb', color: '#d97706' };
    return { bg: '#fef2f2', color: '#ef4444' };
  };

  return (
    <div>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Offers', value: offers.length, color: '#f59e0b' },
          { label: 'Active', value: offers.filter(o => o.status === 'Active').length, color: '#4a9c2f' },
          { label: 'Expired', value: offers.filter(o => o.status === 'Expired').length, color: '#ef4444' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', borderRadius: '10px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>{s.label}</div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '28px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button onClick={openAdd} style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          + Add New Offer
        </button>
      </div>

      {/* Offers Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {offers.map(offer => (
          <div key={offer.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.04)', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {/* Image / Banner */}
            <div style={{ height: '130px', overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              {offer.img ? (
                <img src={offer.img} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: .7 }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>🎁</div>
              )}
              <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'white', color: '#d97706', fontSize: '22px', fontFamily: "'Oswald', sans-serif", fontWeight: 800, padding: '4px 14px', borderRadius: '6px' }}>
                {offer.discount}
              </div>
              <div style={{ position: 'absolute', top: '12px', right: '12px', ...statusColor(offer.status), fontSize: '10px', fontWeight: 800, padding: '3px 10px', borderRadius: '20px', border: `1px solid ${statusColor(offer.status).color}` }}>
                {offer.status}
              </div>
            </div>

            <div style={{ padding: '18px' }}>
              {offer.tag && (
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#f59e0b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{offer.tag}</div>
              )}
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '17px', fontWeight: 700, color: '#1a1a2e', marginBottom: '8px' }}>{offer.title}</h3>

              {(offer.original_price || offer.offer_price) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  {offer.original_price && (
                    <span style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' }}>
                      KES {Number(offer.original_price).toLocaleString()}
                    </span>
                  )}
                  {offer.offer_price && (
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', fontWeight: 700, color: '#4a9c2f' }}>
                      KES {Number(offer.offer_price).toLocaleString()}
                    </span>
                  )}
                </div>
              )}

              {offer.valid_until && (
                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
                  📅 Valid until: <strong style={{ color: '#475569' }}>{offer.valid_until}</strong>
                </div>
              )}

              {offer.description && (
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6, marginBottom: '12px' }}>{offer.description}</p>
              )}

              {(offer.includes || []).length > 0 && (
                <div style={{ marginBottom: '14px' }}>
                  {offer.includes.map((item, i) => (
                    <div key={i} style={{ fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <span style={{ color: '#4a9c2f', fontWeight: 800 }}>✓</span> {item}
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <button
                  onClick={() => handleToggleStatus(offer)}
                  style={{ fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', ...statusColor(offer.status) }}
                >
                  {offer.status === 'Active' ? '⏸ Deactivate' : '▶ Activate'}
                </button>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEdit(offer)} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 700, background: '#fffbeb', color: '#d97706', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
                  <button onClick={() => handleDelete(offer.id)} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 700, background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {offers.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎁</div>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>No offers yet. Click "Add New Offer" to create one!</div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '36px', width: '100%', maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase' }}>
                {editing ? 'EDIT OFFER' : 'ADD NEW OFFER'}
              </h2>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#f59e0b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>OFFER TITLE *</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Early Bird Safari Special"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#f59e0b'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#f59e0b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>DISCOUNT *</label>
                <input name="discount" value={form.discount} onChange={handleChange} placeholder="e.g. 20% OFF"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#f59e0b'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#f59e0b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>TAG</label>
                <input name="tag" value={form.tag} onChange={handleChange} placeholder="e.g. LIMITED TIME"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#f59e0b'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#f59e0b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>ORIGINAL PRICE (KES)</label>
                <input name="original_price" type="number" value={form.original_price} onChange={handleChange} placeholder="e.g. 75000"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#f59e0b'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#f59e0b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>OFFER PRICE (KES)</label>
                <input name="offer_price" type="number" value={form.offer_price} onChange={handleChange} placeholder="e.g. 60000"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#f59e0b'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#f59e0b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>VALID UNTIL</label>
                <input name="valid_until" type="date" value={form.valid_until} onChange={handleChange}
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', colorScheme: 'light' }}
                  onFocus={e => e.target.style.borderColor = '#f59e0b'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#f59e0b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>STATUS</label>
                <select name="status" value={form.status} onChange={handleChange}
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', background: 'white' }}>
                  <option>Active</option>
                  <option>Expiring Soon</option>
                  <option>Expired</option>
                </select>
              </div>

              {/* Image */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#f59e0b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>IMAGE</label>
                <ImageUpload value={form.img} onChange={val => setForm({ ...form, img: val })} />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#f59e0b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>DESCRIPTION</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Offer description..."
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = '#f59e0b'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#f59e0b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>WHAT'S INCLUDED</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input value={includeInput} onChange={e => setIncludeInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addInclude()}
                    placeholder="Type and press Enter..."
                    style={{ flex: 1, border: '2px solid #e2e8f0', borderRadius: '8px', padding: '9px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#f59e0b'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button onClick={addInclude} style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '9px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>Add</button>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {(form.includes || []).map((item, i) => (
                    <span key={i} style={{ background: '#fffbeb', color: '#d97706', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {item} <span onClick={() => removeInclude(i)} style={{ cursor: 'pointer' }}>✕</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '28px', justifyContent: 'flex-end' }}>
              <button onClick={closeModal} style={{ padding: '12px 24px', fontSize: '13px', fontWeight: 700, background: 'white', color: '#64748b', border: '2px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>
                Cancel
              </button>
              <button onClick={handleSave} style={{ padding: '12px 32px', fontSize: '13px', fontWeight: 800, background: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(245,158,11,.3)' }}>
                {editing ? 'SAVE CHANGES' : 'ADD OFFER'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOffers;