function Stats() {
  const stats = [
    { number: '1,200+', label: 'Happy Travelers' },
    { number: '50+', label: 'Safari Destinations' },
    { number: '15 Yrs', label: 'Of Experience' },
    { number: '4.9 / 5', label: 'Average Rating' },
  ];

  return (
    <section style={{
      background: 'white',
      padding: '48px 5%',
      borderBottom: '1px solid #eee',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
      }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            textAlign: 'center',
            padding: '28px 32px',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,.07)',
            borderBottom: '3px solid #4a9c2f',
            transition: 'all .3s',
            cursor: 'default',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,.1)';
              e.currentTarget.style.borderBottomColor = '#f5c518';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.07)';
              e.currentTarget.style.borderBottomColor = '#4a9c2f';
            }}
          >
            <div style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: '52px',
              fontWeight: 700,
              color: '#4a9c2f',
              lineHeight: 1,
            }}>
              {stat.number}
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#888',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginTop: '8px',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;