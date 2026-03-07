function TopBar() {
  return (
    <>
      <div style={{
        background: '#2d6a1a',
        padding: '9px 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }} className="topbar">
        {/* Left — contact info */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="topbar-left">
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,.85)' }}>
            📞 <strong style={{ color: '#f5c518' }}>+254 722 864 021</strong>
          </span>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,.85)' }} className="topbar-email">
            ✉️ <strong style={{ color: '#f5c518' }}>info@sadesafaris.co.ke</strong>
          </span>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,.85)' }} className="topbar-hours">
            🕒 Mon – Sat: 8:00 AM – 6:00 PM
          </span>
        </div>

        {/* Right — social icons */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="topbar-right">
          {['f', 'in', 'tw', '▶'].map((s) => (
            <div key={s} style={{
              width: '28px', height: '28px', borderRadius: '4px',
              background: 'rgba(255,255,255,.12)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', cursor: 'pointer', color: 'white',
              transition: 'background .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#f5c518'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.12)'}
            >{s}</div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .topbar { display: none !important; }
        }
        @media (max-width: 1100px) {
          .topbar-hours { display: none !important; }
        }
        @media (max-width: 768px) {
          .topbar-email { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default TopBar;