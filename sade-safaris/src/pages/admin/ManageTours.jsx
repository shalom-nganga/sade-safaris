import { useState, useEffect } from 'react';
import { getTours, saveTour, deleteTour } from '../../store';
import ImageUpload from '../../pages/admin/ImageUpload';

const emptyTour = {
  title: '', days: '', price: '', location: '', category: 'Wildlife Safaris',
  rating: 4.8, img: '', badge: '', difficulty: 'Moderate', groupSize: '2-12',
  description: '', highlights: [], includes: [], excludes: [], itinerary: [], images: [],
};

const categories = ['Wildlife Safaris', 'Adventures', 'Beach & Coastal', 'Cultural Tours'];
const difficulties = ['Easy', 'Moderate', 'Challenging'];

function ItineraryInput({ form, setForm }) {
  const [day, setDay] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const add = () => {
    if (!day || !title) return;
    setForm({ ...form, itinerary: [...(form.itinerary || []), { day: parseInt(day), title, desc }] });
    setDay(''); setTitle(''); setDesc('');
  };

  return (
    <div style={{ background: '#f0f4ff', borderRadius: '8px', padding: '14px', border: '1px dashed #bfdbfe' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px', marginBottom: '8px' }}>
        <input value={day} onChange={e => setDay(e.target.value)} type="number" placeholder="Day #"
          style={{ border: '2px solid #e2e8f0', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
          onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
        />
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Day title e.g. Arrival in Nairobi"
          style={{ border: '2px solid #e2e8f0', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
          onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
        />
      </div>
      <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="Day description..."
        style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', resize: 'vertical', marginBottom: '8px' }}
        onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
      />
      <button onClick={add} style={{ background: '#4a9c2f', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '12px' }}>
        + Add Day
      </button>
    </div>
  );
}

function ManageTours() {
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTour);
  const [highlightInput, setHighlightInput] = useState('');
  const [includeInput, setIncludeInput] = useState('');
  const [excludeInput, setExcludeInput] = useState('');

  useEffect(() => { setTours(getTours()); }, []);
  const refresh = () => setTours(getTours());

  const openAdd = () => { setForm(emptyTour); setEditing(null); setShowModal(true); };
  const openEdit = (tour) => { setForm(tour); setEditing(tour.id); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditing(null); setForm(emptyTour); };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const addTag = (field, value, setter) => {
    if (!value.trim()) return;
    setForm({ ...form, [field]: [...(form[field] || []), value.trim()] });
    setter('');
  };

  const removeTag = (field, index) => {
    setForm({ ...form, [field]: form[field].filter((_, i) => i !== index) });
  };

  const handleSave = () => {
    if (!form.title || !form.price || !form.days) return alert('Title, price and days are required!');
    saveTour({ ...form, id: editing || undefined });
    refresh();
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this tour?')) { deleteTour(id); refresh(); }
  };

  const filtered = tours.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    (t.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search tours..."
          style={{ border: '2px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', width: '280px' }}
          onFocus={e => e.target.style.borderColor = '#4a9c2f'}
          onBlur={e => e.target.style.borderColor = '#e2e8f0'}
        />
        <button onClick={openAdd} style={{ background: '#4a9c2f', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          + Add New Tour
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {filtered.map(tour => (
          <div key={tour.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.04)', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ height: '140px', overflow: 'hidden', position: 'relative', background: '#f0f4ff' }}>
              {tour.img ? (
                <img src={tour.img} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>🦁</div>
              )}
              <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#4a9c2f', color: 'white', fontSize: '10px', fontWeight: 800, padding: '3px 10px', borderRadius: '20px' }}>{tour.category}</div>
              {tour.badge && <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#f5c518', color: '#1a1a2e', fontSize: '10px', fontWeight: 800, padding: '3px 10px', borderRadius: '20px' }}>{tour.badge}</div>}
            </div>
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1a1a2e', marginBottom: '8px' }}>{tour.title}</h3>
              <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>
                <span>📍 {tour.location}</span>
                <span>📅 {tour.days} days</span>
                <span>⭐ {tour.rating}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, color: '#4a9c2f' }}>
                  KES {Number(tour.price).toLocaleString()}
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEdit(tour)} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 700, background: '#eaf5e3', color: '#4a9c2f', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
                  <button onClick={() => handleDelete(tour.id)} style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 700, background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '36px', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase' }}>
                {editing ? 'EDIT TOUR' : 'ADD NEW TOUR'}
              </h2>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

              {/* Title */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>TOUR TITLE *</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Masai Mara Safari"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Days & Price */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>DAYS *</label>
                <input name="days" type="number" value={form.days} onChange={handleChange} placeholder="e.g. 5"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>PRICE (KES) *</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="e.g. 45000"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Location & Category */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>LOCATION</label>
                <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Masai Mara"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>CATEGORY</label>
                <select name="category" value={form.category} onChange={handleChange}
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', background: 'white' }}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Difficulty & Group Size */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>DIFFICULTY</label>
                <select name="difficulty" value={form.difficulty} onChange={handleChange}
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', background: 'white' }}>
                  {difficulties.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>GROUP SIZE</label>
                <input name="groupSize" value={form.groupSize} onChange={handleChange} placeholder="e.g. 2-12"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Badge */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>BADGE (optional)</label>
                <input name="badge" value={form.badge} onChange={handleChange} placeholder="e.g. BESTSELLER"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
              <div />

              {/* Image Upload */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>IMAGE</label>
                <ImageUpload value={form.img} onChange={val => setForm({ ...form, img: val })} />
              </div>

              {/* Description */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>DESCRIPTION</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Tour description..."
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Highlights */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>HIGHLIGHTS</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input value={highlightInput} onChange={e => setHighlightInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTag('highlights', highlightInput, setHighlightInput)}
                    placeholder="Type and press Enter..."
                    style={{ flex: 1, border: '2px solid #e2e8f0', borderRadius: '8px', padding: '9px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button onClick={() => addTag('highlights', highlightInput, setHighlightInput)}
                    style={{ background: '#4a9c2f', color: 'white', border: 'none', padding: '9px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>Add</button>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {(form.highlights || []).map((h, i) => (
                    <span key={i} style={{ background: '#eaf5e3', color: '#4a9c2f', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {h} <span onClick={() => removeTag('highlights', i)} style={{ cursor: 'pointer', fontWeight: 800 }}>✕</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Includes */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>INCLUDES</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input value={includeInput} onChange={e => setIncludeInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTag('includes', includeInput, setIncludeInput)}
                    placeholder="Type and press Enter..."
                    style={{ flex: 1, border: '2px solid #e2e8f0', borderRadius: '8px', padding: '9px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#4a9c2f'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button onClick={() => addTag('includes', includeInput, setIncludeInput)}
                    style={{ background: '#4a9c2f', color: 'white', border: 'none', padding: '9px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>Add</button>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {(form.includes || []).map((h, i) => (
                    <span key={i} style={{ background: '#eaf5e3', color: '#4a9c2f', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {h} <span onClick={() => removeTag('includes', i)} style={{ cursor: 'pointer' }}>✕</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Excludes */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#ef4444', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>EXCLUDES</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input value={excludeInput} onChange={e => setExcludeInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTag('excludes', excludeInput, setExcludeInput)}
                    placeholder="Type and press Enter..."
                    style={{ flex: 1, border: '2px solid #e2e8f0', borderRadius: '8px', padding: '9px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#ef4444'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button onClick={() => addTag('excludes', excludeInput, setExcludeInput)}
                    style={{ background: '#ef4444', color: 'white', border: 'none', padding: '9px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>Add</button>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {(form.excludes || []).map((h, i) => (
                    <span key={i} style={{ background: '#fef2f2', color: '#ef4444', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {h} <span onClick={() => removeTag('excludes', i)} style={{ cursor: 'pointer' }}>✕</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#1a56db', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>ITINERARY</label>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>Add each day of the itinerary one by one.</p>
                {(form.itinerary || []).map((item, i) => (
                  <div key={i} style={{ background: '#f8fafc', borderRadius: '8px', padding: '12px 14px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#4a9c2f', marginBottom: '2px' }}>DAY {item.day}</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e' }}>{item.title}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{item.desc}</div>
                    </div>
                    <span onClick={() => setForm({ ...form, itinerary: form.itinerary.filter((_, idx) => idx !== i) })}
                      style={{ cursor: 'pointer', color: '#ef4444', fontWeight: 800, flexShrink: 0 }}>✕</span>
                  </div>
                ))}
                <ItineraryInput form={form} setForm={setForm} />
              </div>

            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '28px', justifyContent: 'flex-end' }}>
              <button onClick={closeModal} style={{ padding: '12px 24px', fontSize: '13px', fontWeight: 700, background: 'white', color: '#64748b', border: '2px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>
                Cancel
              </button>
              <button onClick={handleSave} style={{ padding: '12px 32px', fontSize: '13px', fontWeight: 800, background: '#4a9c2f', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(74,156,47,.3)' }}>
                {editing ? 'SAVE CHANGES' : 'ADD TOUR'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageTours;