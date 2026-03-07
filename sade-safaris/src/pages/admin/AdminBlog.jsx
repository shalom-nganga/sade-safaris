import { useState, useEffect } from 'react';
import { getBlogPosts, saveBlogPost, deleteBlogPost } from '../../store';
import ImageUpload from '../../pages/admin/ImageUpload';

const emptyPost = { title: '', category: 'Wildlife', excerpt: '', content: '', img: '', author: '', read_time: 5, tags: [], status: 'Draft' };
const categories = ['Wildlife', 'Travel Tips', 'Destinations', 'Conservation', 'Culture', 'Food & Drink'];

function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyPost);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => { async function load() { setPosts(await getBlogPosts()); } load(); }, []);

  const refresh = async () => setPosts(await getBlogPosts());
  const openAdd = () => { setForm(emptyPost); setEditing(null); setShowModal(true); };
  const openEdit = (post) => { setForm(post); setEditing(post.id); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditing(null); setForm(emptyPost); };
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const addTag = () => { if (!tagInput.trim()) return; setForm({ ...form, tags: [...(form.tags || []), tagInput.trim()] }); setTagInput(''); };
  const removeTag = (i) => setForm({ ...form, tags: form.tags.filter((_, idx) => idx !== i) });
  const handleSave = async () => { if (!form.title || !form.author) return alert('Title and author are required!'); await saveBlogPost({ ...form, id: editing || undefined }); await refresh(); closeModal(); };
  const handleDelete = async (id) => { if (window.confirm('Delete this post?')) { await deleteBlogPost(id); refresh(); } };
  const handleToggleStatus = async (post) => { await saveBlogPost({ ...post, status: post.status === 'Published' ? 'Draft' : 'Published' }); refresh(); };

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.author || '').toLowerCase().includes(search.toLowerCase())
  );

  const inputStyle = { width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' };

  return (
    <>
      <div>
        {/* Summary */}
        <div className="blog-summary" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total Posts', value: posts.length, color: '#8b5cf6' },
            { label: 'Published', value: posts.filter(p => p.status === 'Published').length, color: '#4a9c2f' },
            { label: 'Drafts', value: posts.filter(p => p.status === 'Draft').length, color: '#d97706' },
            { label: 'Total Views', value: posts.reduce((acc, p) => acc + (p.views || 0), 0).toLocaleString(), color: '#1a56db' },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: '10px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>{s.label}</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '28px', fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search posts..."
            style={{ border: '2px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', flex: 1, minWidth: '200px', maxWidth: '320px', boxSizing: 'border-box' }}
            onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
          />
          <button onClick={openAdd} style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
            + New Blog Post
          </button>
        </div>

        {/* Table — scrollable on mobile */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,.05)', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '600px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                {['Title', 'Category', 'Author', 'Time', 'Views', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No posts found</td></tr>
              ) : filtered.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 16px', maxWidth: '200px' }}>
                    <div style={{ fontWeight: 700, color: '#1a1a2e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
                    {p.excerpt && <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.excerpt}</div>}
                  </td>
                  <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: '#f5f3ff', color: '#8b5cf6' }}>{p.category}</span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569', whiteSpace: 'nowrap' }}>{p.author}</td>
                  <td style={{ padding: '14px 16px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{p.read_time}m</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#475569', whiteSpace: 'nowrap' }}>{(p.views || 0).toLocaleString()}</td>
                  <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                    <button onClick={() => handleToggleStatus(p)} style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: p.status === 'Published' ? '#eaf5e3' : '#fffbeb', color: p.status === 'Published' ? '#4a9c2f' : '#d97706' }}>
                      {p.status === 'Published' ? '✅ Published' : '📝 Draft'}
                    </button>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => openEdit(p)} style={{ padding: '5px 10px', fontSize: '11px', fontWeight: 700, background: '#f5f3ff', color: '#8b5cf6', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
                      <button onClick={() => handleDelete(p.id)} style={{ padding: '5px 10px', fontSize: '11px', fontWeight: 700, background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '680px', maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,.25)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase' }}>{editing ? 'EDIT POST' : 'NEW BLOG POST'}</h2>
                <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
              </div>

              <div className="blog-modal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>TITLE *</label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="Post title..." style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>CATEGORY</label>
                  <select name="category" value={form.category} onChange={handleChange} style={{ ...inputStyle, background: 'white' }}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>AUTHOR *</label>
                  <input name="author" value={form.author} onChange={handleChange} placeholder="Author name" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>READ TIME (mins)</label>
                  <input name="read_time" type="number" value={form.read_time} onChange={handleChange} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>STATUS</label>
                  <select name="status" value={form.status} onChange={handleChange} style={{ ...inputStyle, background: 'white' }}>
                    <option>Draft</option><option>Published</option>
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>IMAGE</label>
                  <ImageUpload value={form.img} onChange={val => setForm({ ...form, img: val })} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>EXCERPT</label>
                  <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} placeholder="Short summary..." style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>CONTENT</label>
                  <textarea name="content" value={form.content} onChange={handleChange} rows={6} placeholder="Full blog post content..." style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>TAGS</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTag()} placeholder="Type tag and press Enter..."
                      style={{ ...inputStyle, flex: 1 }} onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                    <button onClick={addTag} style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '9px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, whiteSpace: 'nowrap' }}>Add</button>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {(form.tags || []).map((t, i) => (
                      <span key={i} style={{ background: '#f5f3ff', color: '#8b5cf6', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {t} <span onClick={() => removeTag(i)} style={{ cursor: 'pointer' }}>✕</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-btns" style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
                <button onClick={closeModal} style={{ padding: '12px 24px', fontSize: '13px', fontWeight: 700, background: 'white', color: '#64748b', border: '2px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
                <button onClick={handleSave} style={{ padding: '12px 32px', fontSize: '13px', fontWeight: 800, background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>{editing ? 'SAVE CHANGES' : 'PUBLISH POST'}</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .blog-summary { grid-template-columns: repeat(2, 1fr) !important; }
          .blog-modal-grid { grid-template-columns: 1fr !important; }
          .blog-modal-grid > div[style*="1 / -1"] { grid-column: 1 !important; }
        }
        @media (max-width: 480px) {
          .blog-summary { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .modal-btns { flex-direction: column-reverse !important; }
          .modal-btns button { width: 100% !important; }
        }
      `}</style>
    </>
  );
}

export default AdminBlog;