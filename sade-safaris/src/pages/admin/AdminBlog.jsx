import { useState, useEffect } from 'react';
import { getBlogPosts, saveBlogPost, deleteBlogPost } from '../../store';
import ImageUpload from '../../pages/admin/ImageUpload';

const emptyPost = {
  title: '', category: 'Wildlife', excerpt: '', content: '',
  img: '', author: '', read_time: 5, tags: [], status: 'Draft',
};

const categories = ['Wildlife', 'Travel Tips', 'Destinations', 'Conservation', 'Culture', 'Food & Drink'];

function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyPost);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => { setPosts(getBlogPosts()); }, []);
  const refresh = () => setPosts(getBlogPosts());

  const openAdd = () => { setForm(emptyPost); setEditing(null); setShowModal(true); };
  const openEdit = (post) => { setForm(post); setEditing(post.id); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditing(null); setForm(emptyPost); };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const addTag = () => {
    if (!tagInput.trim()) return;
    setForm({ ...form, tags: [...(form.tags || []), tagInput.trim()] });
    setTagInput('');
  };

  const removeTag = (i) => setForm({ ...form, tags: form.tags.filter((_, idx) => idx !== i) });

  const handleSave = () => {
    if (!form.title || !form.author) return alert('Title and author are required!');
    saveBlogPost({ ...form, id: editing || undefined });
    refresh();
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this post?')) { deleteBlogPost(id); refresh(); }
  };

  const handleToggleStatus = (post) => {
    const updated = { ...post, status: post.status === 'Published' ? 'Draft' : 'Published' };
    saveBlogPost(updated);
    refresh();
  };

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.author || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
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
          style={{ border: '2px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', width: '280px' }}
          onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
        />
        <button onClick={openAdd} style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          + New Blog Post
        </button>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              {['Title', 'Category', 'Author', 'Read Time', 'Views', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</th>
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
                <td style={{ padding: '14px 16px', maxWidth: '260px' }}>
                  <div style={{ fontWeight: 700, color: '#1a1a2e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
                  {p.excerpt && <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.excerpt}</div>}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: '#f5f3ff', color: '#8b5cf6' }}>{p.category}</span>
                </td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{p.author}</td>
                <td style={{ padding: '14px 16px', color: '#94a3b8' }}>{p.read_time} min</td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#475569' }}>{(p.views || 0).toLocaleString()}</td>
                <td style={{ padding: '14px 16px' }}>
                  <button onClick={() => handleToggleStatus(p)} style={{
                    fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    background: p.status === 'Published' ? '#eaf5e3' : '#fffbeb',
                    color: p.status === 'Published' ? '#4a9c2f' : '#d97706',
                  }}>
                    {p.status === 'Published' ? '✅ Published' : '📝 Draft'}
                  </button>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => openEdit(p)} style={{ padding: '5px 10px', fontSize: '11px', fontWeight: 700, background: '#f5f3ff', color: '#8b5cf6', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
                    <button onClick={() => handleDelete(p.id)} style={{ padding: '5px 10px', fontSize: '11px', fontWeight: 700, background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '36px', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase' }}>
                {editing ? 'EDIT POST' : 'NEW BLOG POST'}
              </h2>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>TITLE *</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Post title..."
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>CATEGORY</label>
                <select name="category" value={form.category} onChange={handleChange}
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', background: 'white' }}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>AUTHOR *</label>
                <input name="author" value={form.author} onChange={handleChange} placeholder="Author name"
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>READ TIME (mins)</label>
                <input name="read_time" type="number" value={form.read_time} onChange={handleChange}
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>STATUS</label>
                <select name="status" value={form.status} onChange={handleChange}
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', background: 'white' }}>
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>

              {/* Image Upload */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>IMAGE</label>
                <ImageUpload value={form.img} onChange={val => setForm({ ...form, img: val })} />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>EXCERPT</label>
                <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} placeholder="Short summary shown in blog listing..."
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>CONTENT</label>
                <textarea name="content" value={form.content} onChange={handleChange} rows={6} placeholder="Full blog post content..."
                  style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>TAGS</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTag()}
                    placeholder="Type tag and press Enter..."
                    style={{ flex: 1, border: '2px solid #e2e8f0', borderRadius: '8px', padding: '9px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button onClick={addTag} style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '9px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>Add</button>
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

            <div style={{ display: 'flex', gap: '12px', marginTop: '28px', justifyContent: 'flex-end' }}>
              <button onClick={closeModal} style={{ padding: '12px 24px', fontSize: '13px', fontWeight: 700, background: 'white', color: '#64748b', border: '2px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>
                Cancel
              </button>
              <button onClick={handleSave} style={{ padding: '12px 32px', fontSize: '13px', fontWeight: 800, background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>
                {editing ? 'SAVE CHANGES' : 'PUBLISH POST'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBlog;