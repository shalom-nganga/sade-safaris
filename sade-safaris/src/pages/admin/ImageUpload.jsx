import { useState } from 'react';

function ImageUpload({ value, onChange }) {
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) return alert('Please upload an image file.');
    if (file.size > 5 * 1024 * 1024) return alert('Image must be under 5MB.');

    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleInput = (e) => handleFile(e.target.files[0]);

  return (
    <div>
      {/* Preview */}
      {value && (
        <div style={{ position: 'relative', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden', height: '160px' }}>
          <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button
            onClick={() => onChange('')}
            style={{
              position: 'absolute', top: '8px', right: '8px',
              background: 'rgba(0,0,0,.6)', color: 'white', border: 'none',
              borderRadius: '50%', width: '28px', height: '28px',
              cursor: 'pointer', fontSize: '14px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragOver ? '#4a9c2f' : '#e2e8f0'}`,
          borderRadius: '8px', padding: '20px', textAlign: 'center',
          background: dragOver ? '#eaf5e3' : '#f8fafc',
          transition: 'all .2s', cursor: 'pointer',
        }}
        onClick={() => document.getElementById('img-upload').click()}
      >
        <div style={{ fontSize: '28px', marginBottom: '8px' }}>📸</div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
          Drop image here or <span style={{ color: '#4a9c2f' }}>click to browse</span>
        </div>
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>PNG, JPG, WEBP up to 5MB</div>
        <input id="img-upload" type="file" accept="image/*" onChange={handleInput} style={{ display: 'none' }} />
      </div>

      {/* OR URL input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
        <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8' }}>OR</span>
        <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
      </div>

      <input
        type="text"
        value={value && value.startsWith('data:') ? '' : value}
        onChange={e => onChange(e.target.value)}
        placeholder="Paste image URL: https://..."
        style={{
          width: '100%', border: '2px solid #e2e8f0', borderRadius: '8px',
          padding: '10px 14px', fontSize: '13px', fontFamily: 'inherit', outline: 'none',
        }}
        onFocus={e => e.target.style.borderColor = '#4a9c2f'}
        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
      />
    </div>
  );
}

export default ImageUpload;