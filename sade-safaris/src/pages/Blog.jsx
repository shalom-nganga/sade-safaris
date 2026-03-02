import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const posts = [
  {
    id: 1,
    title: 'The Great Migration: Everything You Need to Know',
    category: 'Wildlife',
    date: 'February 12, 2026',
    author: 'Samuel Kariuki',
    authorRole: 'Founder & Lead Guide',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    excerpt: 'The Great Migration is arguably the greatest wildlife spectacle on earth. Every year, over 2 million wildebeest, zebras, and gazelles thunder across the Serengeti and Masai Mara in search of fresh grass. Here is everything you need to know to witness it.',
    featured: true,
    tags: ['Migration', 'Masai Mara', 'Wildlife'],
  },
  {
    id: 2,
    title: 'Top 10 Safari Packing Tips from Our Guides',
    category: 'Travel Tips',
    date: 'January 28, 2026',
    author: 'Amina Wanjiku',
    authorRole: 'Head of Operations',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    excerpt: 'Packing for a safari can be tricky — too much and your bag is a burden, too little and you\'re uncomfortable in the bush. After 15 years of guiding, our team has refined the perfect safari packing list.',
    featured: false,
    tags: ['Packing', 'Tips', 'Safari'],
  },
  {
    id: 3,
    title: 'Why Amboseli is Perfect for First-Time Safari Visitors',
    category: 'Destinations',
    date: 'January 15, 2026',
    author: 'David Omondi',
    authorRole: 'Senior Wildlife Guide',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=800&q=80',
    excerpt: 'If you\'ve never been on safari before, Amboseli National Park is the perfect place to start. With its breathtaking views of Mount Kilimanjaro and the largest elephant herds in Kenya, it delivers the full African magic without overwhelming first-timers.',
    featured: false,
    tags: ['Amboseli', 'Beginners', 'Elephants'],
  },
  {
    id: 4,
    title: 'The Samburu Special Five: Africa\'s Rarest Wildlife',
    category: 'Wildlife',
    date: 'December 20, 2025',
    author: 'David Omondi',
    authorRole: 'Senior Wildlife Guide',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80',
    excerpt: 'Most people know about the Big Five. But far fewer have heard of the Samburu Special Five — five rare and beautiful animals found only in northern Kenya that make Samburu National Reserve one of Africa\'s most unique safari destinations.',
    featured: false,
    tags: ['Samburu', 'Rare Animals', 'Wildlife'],
  },
  {
    id: 5,
    title: 'Diani Beach: Kenya\'s Coastal Gem',
    category: 'Destinations',
    date: 'December 5, 2025',
    author: 'Grace Muthoni',
    authorRole: 'Travel Consultant',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    excerpt: 'Diani Beach on Kenya\'s south coast has been voted Africa\'s leading beach destination multiple times — and for good reason. Here\'s why you should combine your safari with a few days on this stunning stretch of Indian Ocean coastline.',
    featured: false,
    tags: ['Diani', 'Beach', 'Coastal'],
  },
  {
    id: 6,
    title: 'How We Give Back: Sade Safaris Conservation Fund',
    category: 'Conservation',
    date: 'November 18, 2025',
    author: 'Samuel Kariuki',
    authorRole: 'Founder & Lead Guide',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80',
    excerpt: 'When you book with Sade Safaris, 5% of your payment goes directly to our conservation fund. Here\'s exactly where that money goes, which projects it supports, and the real difference it\'s making for Kenya\'s wildlife and local communities.',
    featured: false,
    tags: ['Conservation', 'Community', 'Giving Back'],
  },
  {
    id: 7,
    title: 'Best Time to Visit Kenya: A Month by Month Guide',
    category: 'Travel Tips',
    date: 'November 2, 2025',
    author: 'Grace Muthoni',
    authorRole: 'Travel Consultant',
    readTime: '8 min read',
    img: 'https://images.unsplash.com/photo-1559827291-72f56e1e8f8d?w=800&q=80',
    excerpt: 'Kenya is a year-round destination but certain months offer dramatically better wildlife viewing, fewer crowds, and lower prices. Our comprehensive month-by-month guide tells you exactly when to visit based on your priorities.',
    featured: false,
    tags: ['Planning', 'Seasons', 'Tips'],
  },
];

const categories = ['All', 'Wildlife', 'Destinations', 'Travel Tips', 'Conservation'];

function Blog() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [hovered, setHovered] = useState(null);
  const [search, setSearch] = useState('');

  const featured = posts.find(p => p.featured);
  const rest = posts.filter(p => !p.featured);

  const filtered = (activeCategory === 'All' ? rest : rest.filter(p => p.category === activeCategory))
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TopBar />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', padding: '100px 5%', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1800&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(.3)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(45,106,26,.75), transparent)',
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{
            fontSize: '12px', fontWeight: 800, color: '#f5c518',
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px',
          }}>
            STORIES FROM THE WILD
          </p>
          <h1 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 700, color: 'white',
            textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '20px',
          }}>
            SAFARI BLOG &<br />
            <span style={{ color: '#f5c518' }}>TRAVEL GUIDES</span>
          </h1>
          <p style={{
            fontSize: '17px', color: 'rgba(255,255,255,.85)',
            maxWidth: '560px', lineHeight: 1.75,
          }}>
            Tips, guides, wildlife stories, and destination inspiration from our
            team of expert Kenyan guides and travel consultants.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ padding: '72px 5%', background: '#f9f9f7' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

          {/* ── FEATURED POST ── */}
          {featured && (
            <div
              onClick={() => {}}
              onMouseEnter={() => setHovered('featured')}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                background: 'white', borderRadius: '8px', overflow: 'hidden',
                boxShadow: hovered === 'featured' ? '0 20px 48px rgba(0,0,0,.14)' : '0 4px 20px rgba(0,0,0,.08)',
                marginBottom: '56px', cursor: 'pointer',
                transform: hovered === 'featured' ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all .3s ease',
              }}
            >
              <div style={{ height: '420px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={featured.img}
                  alt={featured.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transform: hovered === 'featured' ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform .5s ease',
                  }}
                />
                <div style={{
                  position: 'absolute', top: '20px', left: '20px',
                  background: '#f5c518', color: '#1a1a1a',
                  fontSize: '11px', fontWeight: 800, letterSpacing: '1px',
                  padding: '5px 14px', borderRadius: '3px', textTransform: 'uppercase',
                }}>
                  ⭐ FEATURED POST
                </div>
              </div>
              <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{
                  fontSize: '11px', fontWeight: 800, color: '#4a9c2f',
                  letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px',
                }}>
                  {featured.category}
                </div>
                <h2 style={{
                  fontFamily: "'Oswald', sans-serif", fontSize: '32px',
                  fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, marginBottom: '16px',
                }}>
                  {featured.title}
                </h2>
                <p style={{
                  fontSize: '15px', color: '#666', lineHeight: 1.75, marginBottom: '24px',
                }}>
                  {featured.excerpt}
                </p>
                <div style={{
                  display: 'flex', gap: '16px', alignItems: 'center',
                  marginBottom: '28px', flexWrap: 'wrap',
                }}>
                  <span style={{ fontSize: '13px', color: '#888', fontWeight: 600 }}>
                    ✍️ {featured.author}
                  </span>
                  <span style={{ fontSize: '13px', color: '#888', fontWeight: 600 }}>
                    📅 {featured.date}
                  </span>
                  <span style={{ fontSize: '13px', color: '#888', fontWeight: 600 }}>
                    ⏱ {featured.readTime}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
                  {featured.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '11px', fontWeight: 700, color: '#4a9c2f',
                      background: '#eaf5e3', padding: '4px 10px', borderRadius: '3px',
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  style={{
                    background: '#4a9c2f', color: 'white', border: 'none',
                    padding: '13px 28px', fontSize: '13px', fontWeight: 800,
                    cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit',
                    letterSpacing: '.5px', transition: 'all .25s', alignSelf: 'flex-start',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#2d6a1a'}
                  onMouseLeave={e => e.currentTarget.style.background = '#4a9c2f'}
                >
                  READ FULL ARTICLE →
                </button>
              </div>
            </div>
          )}

          {/* ── FILTERS + SEARCH ── */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '36px',
            flexWrap: 'wrap', gap: '16px',
          }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  style={{
                    fontSize: '12px', fontWeight: 700, padding: '9px 18px',
                    borderRadius: '3px', cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all .2s',
                    background: activeCategory === c ? '#4a9c2f' : 'white',
                    color: activeCategory === c ? 'white' : '#555',
                    border: activeCategory === c ? '2px solid #4a9c2f' : '2px solid #ddd',
                  }}
                  onMouseEnter={e => {
                    if (activeCategory !== c) {
                      e.currentTarget.style.borderColor = '#4a9c2f';
                      e.currentTarget.style.color = '#4a9c2f';
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeCategory !== c) {
                      e.currentTarget.style.borderColor = '#ddd';
                      e.currentTarget.style.color = '#555';
                    }
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              style={{
                border: '2px solid #eee', borderRadius: '4px',
                padding: '10px 16px', fontSize: '13px', fontFamily: 'inherit',
                outline: 'none', width: '240px', transition: 'border .2s',
              }}
              onFocus={e => e.target.style.borderColor = '#4a9c2f'}
              onBlur={e => e.target.style.borderColor = '#eee'}
            />
          </div>

          {/* ── BLOG GRID ── */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{
                fontFamily: "'Oswald', sans-serif", fontSize: '24px',
                marginBottom: '8px', color: '#555',
              }}>
                NO ARTICLES FOUND
              </h3>
              <p>Try a different category or search term</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '28px',
            }}>
              {filtered.map(post => (
                <div
                  key={post.id}
                  onMouseEnter={() => setHovered(post.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: 'white', borderRadius: '8px', overflow: 'hidden',
                    boxShadow: hovered === post.id ? '0 20px 48px rgba(0,0,0,.14)' : '0 2px 12px rgba(0,0,0,.07)',
                    transform: hovered === post.id ? 'translateY(-6px)' : 'translateY(0)',
                    transition: 'all .3s ease', cursor: 'pointer',
                  }}
                >
                  {/* Image */}
                  <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={post.img}
                      alt={post.title}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transform: hovered === post.id ? 'scale(1.06)' : 'scale(1)',
                        transition: 'transform .5s ease',
                      }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 60%)',
                    }} />
                    <div style={{
                      position: 'absolute', top: '14px', left: '14px',
                      background: '#4a9c2f', color: 'white',
                      fontSize: '10px', fontWeight: 800, letterSpacing: '1px',
                      padding: '4px 10px', borderRadius: '3px', textTransform: 'uppercase',
                    }}>
                      {post.category}
                    </div>
                    <div style={{
                      position: 'absolute', bottom: '14px', left: '14px',
                      fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,.9)',
                    }}>
                      ⏱ {post.readTime}
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '24px' }}>
                    <h3 style={{
                      fontFamily: "'Oswald', sans-serif", fontSize: '20px',
                      fontWeight: 700, color: '#1a1a1a', marginBottom: '10px',
                      lineHeight: 1.3,
                    }}>
                      {post.title}
                    </h3>
                    <p style={{
                      fontSize: '13px', color: '#666', lineHeight: 1.7,
                      marginBottom: '16px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      {post.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '10px', fontWeight: 700, color: '#4a9c2f',
                          background: '#eaf5e3', padding: '3px 8px', borderRadius: '3px',
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Author + date */}
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', paddingTop: '14px',
                      borderTop: '1px solid #f0f0f0',
                    }}>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#333' }}>
                          {post.author}
                        </div>
                        <div style={{ fontSize: '11px', color: '#aaa' }}>
                          {post.authorRole}
                        </div>
                      </div>
                      <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 600 }}>
                        {post.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ padding: '72px 5%', background: '#2d6a1a' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontSize: '12px', fontWeight: 800, color: '#f5c518',
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px',
          }}>
            STAY IN THE LOOP
          </p>
          <h2 style={{
            fontFamily: "'Oswald', sans-serif", fontSize: '38px',
            fontWeight: 700, color: 'white', textTransform: 'uppercase', marginBottom: '16px',
          }}>
            GET NEW ARTICLES<br />STRAIGHT TO YOUR INBOX
          </h2>
          <p style={{
            fontSize: '15px', color: 'rgba(255,255,255,.75)',
            lineHeight: 1.75, marginBottom: '36px',
          }}>
            Join 2,000+ safari lovers who receive our weekly wildlife stories,
            travel tips, and destination guides every Friday morning.
          </p>
          <div style={{
            display: 'flex', gap: '0', maxWidth: '500px', margin: '0 auto',
            boxShadow: '0 8px 32px rgba(0,0,0,.2)',
          }}>
            <input
              type="email"
              placeholder="Enter your email address..."
              style={{
                flex: 1, padding: '16px 20px', fontSize: '14px',
                border: 'none', outline: 'none',
                borderRadius: '4px 0 0 4px', fontFamily: 'inherit',
              }}
            />
            <button style={{
              background: '#f5c518', color: '#1a1a1a', border: 'none',
              padding: '16px 24px', fontSize: '13px', fontWeight: 800,
              cursor: 'pointer', borderRadius: '0 4px 4px 0',
              fontFamily: 'inherit', letterSpacing: '.5px',
              transition: 'background .2s', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#e6b800'}
              onMouseLeave={e => e.currentTarget.style.background = '#f5c518'}
            >
              SUBSCRIBE →
            </button>
          </div>
          <p style={{
            fontSize: '11px', color: 'rgba(255,255,255,.4)', marginTop: '12px',
          }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Blog;