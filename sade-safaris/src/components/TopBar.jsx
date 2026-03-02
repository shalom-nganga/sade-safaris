function TopBar() {
  return (
    <div style={{
      background: '#2d6a1a',
      padding: '9px 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      {/* Left — contact info */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,.85)' }}>
          📞 CALL <strong style={{ color: '#f5c518' }}>+254 722 864 021</strong>
        </span>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,.85)' }}>
          ✉️ <strong style={{ color: '#f5c518' }}>info@sadesafaris.co.ke</strong>
        </span>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,.85)' }}>
          🕒 Mon – Sat: 8:00 AM – 6:00 PM
        </span>
      </div>

      {/* Right — social icons + CTA */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
          >
            {s}
          </div>
        ))}
        {/* <button style={{
          background: '#f5c518', color: '#1a1a1a', border: 'none',
          padding: '7px 18px', fontSize: '11px', fontWeight: '800',
          letterSpacing: '.5px', cursor: 'pointer', borderRadius: '4px',
          marginLeft: '8px', fontFamily: 'inherit', transition: 'all .2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#e6b800'}
          onMouseLeave={e => e.currentTarget.style.background = '#f5c518'}
        >
          START PLANNING
        </button> */}
      </div>
    </div>
  );
}

export default TopBar;