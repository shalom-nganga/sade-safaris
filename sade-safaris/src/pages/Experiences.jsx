import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const experiences = [
  { id: 1, title: 'Hot Air Balloon Safari', category: 'Aerial', duration: '3 Hours', price: 35000, difficulty: 'Easy', groupSize: '4 - 16', rating: 5.0, reviews: 89, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', badge: 'Bucket List', desc: 'Float silently above the Masai Mara at sunrise, watching the Great Migration from above while sipping champagne. The most unforgettable 3 hours of your life.', highlights: ['Sunrise flight over the Mara', 'Champagne bush breakfast', 'Certificate of flight', 'Professional pilot and crew'] },
  { id: 2, title: 'Maasai Village Cultural Visit', category: 'Cultural', duration: 'Half Day', price: 8500, difficulty: 'Easy', groupSize: '2 - 20', rating: 4.8, reviews: 134, img: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80', badge: 'Cultural Immersion', desc: "Step inside an authentic Maasai boma and experience daily life, traditional dances, beadwork, and the warm hospitality of Kenya's most iconic tribe.", highlights: ['Traditional warrior dances', 'Beadwork and craft demonstration', 'Home visit with a Maasai family', 'Learn about Maasai traditions'] },
  { id: 3, title: 'Bush Walking Safari', category: 'Adventure', duration: '4 Hours', price: 12000, difficulty: 'Moderate', groupSize: '2 - 8', rating: 4.9, reviews: 76, img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', badge: 'Off The Beaten Path', desc: 'Leave the vehicle behind and explore the African bush on foot with an armed ranger. Track animals by their prints, discover medicinal plants, and feel truly wild.', highlights: ['Armed ranger escort', 'Animal tracking on foot', 'Medicinal plant tour', 'Bird identification'] },
  { id: 4, title: 'Sundowner Game Drive', category: 'Wildlife', duration: '3 Hours', price: 9500, difficulty: 'Easy', groupSize: '2 - 12', rating: 4.9, reviews: 211, img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', badge: 'Most Booked', desc: 'The golden hour is magic in the bush. Join our evening game drive as the savanna turns amber, predators emerge to hunt, and drinks are served under the African sky.', highlights: ['Evening wildlife activity', 'Sundowner drinks on the savanna', 'Night drive option', 'Expert guide'] },
  { id: 5, title: 'Ocean Dhow Sunset Cruise', category: 'Coastal', duration: '2 Hours', price: 7500, difficulty: 'Easy', groupSize: '2 - 20', rating: 4.7, reviews: 98, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', badge: 'Romantic', desc: 'Sail the Indian Ocean on a traditional wooden dhow as the sun dips below the horizon. Fresh seafood, cold drinks, and the sound of waves — pure Diani magic.', highlights: ['Traditional dhow sailing', 'Fresh seafood platter', 'Sunset views over the Indian Ocean', 'Snorkeling stop available'] },
  { id: 6, title: 'Night Game Drive', category: 'Wildlife', duration: '3 Hours', price: 11000, difficulty: 'Easy', groupSize: '2 - 8', rating: 4.8, reviews: 63, img: 'https://images.unsplash.com/photo-1559827291-72f56e1e8f8d?w=800&q=80', badge: 'Rare Experience', desc: 'The African night belongs to different creatures. With a spotlight and an expert guide, discover bush babies, leopards, civets, and the nocturnal world most never see.', highlights: ['Spotlight wildlife search', 'Nocturnal animal sightings', 'Star gazing stop', 'Expert night guide'] },
  { id: 7, title: 'Safari Photography Workshop', category: 'Adventure', duration: 'Full Day', price: 18000, difficulty: 'Easy', groupSize: '2 - 6', rating: 4.9, reviews: 41, img: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80', badge: 'Photography', desc: "Travel with a professional wildlife photographer and learn how to capture stunning safari images. From composition to lighting — leave with photos you'll treasure forever.", highlights: ['Professional photographer guide', 'Camera settings workshop', 'Golden hour shoots', 'Small group for maximum access'] },
  { id: 8, title: 'Rhino Conservation Trek', category: 'Conservation', duration: 'Half Day', price: 15000, difficulty: 'Moderate', groupSize: '2 - 10', rating: 4.9, reviews: 55, img: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=800&q=80', badge: 'Conservation', desc: 'Walk alongside conservancy rangers on a guided rhino trek at Ol Pejeta. Get closer to these magnificent endangered animals than any vehicle can, while supporting their protection.', highlights: ['Guided rhino tracking on foot', 'Conservancy ranger briefing', 'Conservation certificate', 'Direct contribution to rhino protection'] },
  { id: 9, title: 'Mount Kenya Scenic Hike', category: 'Adventure', duration: 'Full Day', price: 14000, difficulty: 'Challenging', groupSize: '2 - 10', rating: 4.8, reviews: 37, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', badge: 'Adventure', desc: 'A single-day hike through the spectacular lower slopes of Mount Kenya, passing through rainforest, moorland, and alpine zones with jaw-dropping views of the peaks above.', highlights: ['Rainforest and moorland zones', 'Alpine plant species', 'Stunning peak views', 'Experienced mountain guide'] },
];

const categories = ['All', 'Wildlife', 'Cultural', 'Adventure', 'Coastal', 'Aerial', 'Conservation'];

function Experiences() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [hovered, setHovered] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const filtered = activeCategory === 'All' ? experiences : experiences.filter(e => e.category === activeCategory);

  return (
    <>
      <div>
        <TopBar />
        <Navbar />

        {/* HERO */}
        <section style={{ position: 'relative', padding: '100px 5%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(.32)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(45,106,26,.75), transparent)' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, color: '#f5c518', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>BEYOND THE GAME DRIVE</p>
            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(32px, 6vw, 80px)', fontWeight: 700, color: 'white', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '20px' }}>
              UNFORGETTABLE<br /><span style={{ color: '#f5c518' }}>SAFARI EXPERIENCES</span>
            </h1>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.85)', maxWidth: '560px', lineHeight: 1.75 }}>
              Go deeper than a standard safari. Our curated experiences let you connect with Africa's wildlife, culture, and landscapes in ways most travellers never get to.
            </p>
          </div>
        </section>

        {/* INTRO STRIP */}
        <section style={{ background: '#2d6a1a', padding: '28px 5%' }}>
          <div className="exp-strip" style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            {[['9+', 'Unique Experiences'], ['⭐ 4.9', 'Average Rating'], ['500+', 'Happy Adventurers'], ['🌿', 'Eco-Certified']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '32px', fontWeight: 700, color: '#f5c518', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,.7)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '4px' }}>{l}</div>
              </div>
            ))}
            <button onClick={() => navigate('/contact')} style={{ background: '#f5c518', color: '#1a1a1a', border: 'none', padding: '13px 28px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit', letterSpacing: '.5px', transition: 'all .25px' }}
              onMouseEnter={e => e.currentTarget.style.background = '#e6b800'}
              onMouseLeave={e => e.currentTarget.style.background = '#f5c518'}
            >ENQUIRE NOW →</button>
          </div>
        </section>

        {/* EXPERIENCES GRID */}
        <section style={{ padding: '72px 5%', background: '#f9f9f7' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

            {/* Header + filters */}
            <div className="exp-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '8px' }}>CHOOSE YOUR ADVENTURE</p>
                <h2 className="exp-title" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '38px', fontWeight: 700, color: '#1a1a1a', textTransform: 'uppercase' }}>ALL EXPERIENCES</h2>
              </div>
              <div className="exp-filters" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {categories.map(c => (
                  <button key={c} onClick={() => setActiveCategory(c)} style={{ fontSize: '12px', fontWeight: 700, padding: '9px 18px', borderRadius: '3px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', background: activeCategory === c ? '#4a9c2f' : 'white', color: activeCategory === c ? 'white' : '#555', border: activeCategory === c ? '2px solid #4a9c2f' : '2px solid #ddd' }}
                    onMouseEnter={e => { if (activeCategory !== c) { e.currentTarget.style.borderColor = '#4a9c2f'; e.currentTarget.style.color = '#4a9c2f'; } }}
                    onMouseLeave={e => { if (activeCategory !== c) { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#555'; } }}
                  >{c}</button>
                ))}
              </div>
            </div>

            {/* Cards */}
            <div className="exp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {filtered.map(exp => (
                <div key={exp.id} onMouseEnter={() => setHovered(exp.id)} onMouseLeave={() => setHovered(null)}
                  style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: hovered === exp.id ? '0 20px 48px rgba(0,0,0,.14)' : '0 2px 12px rgba(0,0,0,.07)', transform: hovered === exp.id ? 'translateY(-8px)' : 'translateY(0)', transition: 'all .3s ease' }}
                >
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img src={exp.img} alt={exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered === exp.id ? 'scale(1.06)' : 'scale(1)', transition: 'transform .5s ease' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 55%)' }} />
                    <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                      <span style={{ background: '#f5c518', color: '#1a1a1a', fontSize: '10px', fontWeight: 800, letterSpacing: '.5px', padding: '4px 10px', borderRadius: '3px', textTransform: 'uppercase' }}>{exp.badge}</span>
                    </div>
                    <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(8px)', borderRadius: '4px', padding: '5px 10px', fontSize: '12px', fontWeight: 700, color: 'white' }}>
                      ⭐ {exp.rating} ({exp.reviews})
                    </div>
                    <div style={{ position: 'absolute', bottom: '14px', left: '14px', display: 'flex', gap: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'white' }}>⏱ {exp.duration}</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'white' }}>👥 {exp.groupSize}</span>
                    </div>
                  </div>

                  <div style={{ padding: '22px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{exp.category}</div>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '22px', fontWeight: 600, color: '#1a1a1a', marginBottom: '10px' }}>{exp.title}</h3>
                    <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.7, marginBottom: '14px', maxHeight: expanded === exp.id ? 'none' : '60px', overflow: 'hidden' }}>{exp.desc}</p>
                    <button onClick={() => setExpanded(expanded === exp.id ? null : exp.id)} style={{ background: 'none', border: 'none', color: '#4a9c2f', fontSize: '12px', fontWeight: 800, cursor: 'pointer', padding: 0, fontFamily: 'inherit', marginBottom: '16px', letterSpacing: '.5px' }}>
                      {expanded === exp.id ? '▲ SHOW LESS' : '▼ READ MORE'}
                    </button>
                    {expanded === exp.id && (
                      <div style={{ marginBottom: '16px' }}>
                        {exp.highlights.map(h => (
                          <div key={h} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '12px', color: '#444', marginBottom: '6px' }}>
                            <span style={{ color: '#4a9c2f', fontWeight: 800, flexShrink: 0 }}>✓</span>{h}
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div>
                        <span style={{ fontSize: '10px', color: '#aaa', display: 'block' }}>FROM</span>
                        <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', fontWeight: 700, color: '#4a9c2f' }}>KES {exp.price.toLocaleString()}</span>
                        <span style={{ fontSize: '11px', color: '#aaa' }}> /person</span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#888', background: '#f5f5f5', padding: '4px 10px', borderRadius: '3px' }}>🏃 {exp.difficulty}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => navigate('/contact')} style={{ flex: 1, padding: '12px', fontSize: '12px', fontWeight: 800, background: '#4a9c2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '.5px', transition: 'background .2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#2d6a1a'}
                        onMouseLeave={e => e.currentTarget.style.background = '#4a9c2f'}
                      >BOOK NOW</button>
                      <button onClick={() => navigate('/contact')} style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 700, background: 'transparent', color: '#4a9c2f', border: '2px solid #4a9c2f', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#4a9c2f'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4a9c2f'; }}
                      >ENQUIRE</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ position: 'relative', padding: '100px 5%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(.28)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(45,106,26,.8), transparent)' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, color: '#f5c518', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px' }}>CAN'T DECIDE?</p>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 700, color: 'white', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '20px' }}>
              LET US BUILD YOUR<br /><span style={{ color: '#f5c518' }}>PERFECT ITINERARY</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.8)', lineHeight: 1.7, marginBottom: '40px' }}>
              Mix and match experiences with any of our tours to create a completely bespoke East African adventure tailored just for you.
            </p>
            <div className="exp-cta-btns" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/contact')} style={{ background: '#f5c518', color: '#1a1a1a', border: 'none', padding: '16px 36px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit', letterSpacing: '.5px', transition: 'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e6b800'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f5c518'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >START PLANNING →</button>
              <button onClick={() => navigate('/tours')} style={{ background: 'rgba(255,255,255,.1)', color: 'white', border: '2px solid rgba(255,255,255,.4)', padding: '14px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit', backdropFilter: 'blur(8px)', transition: 'all .2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
              >VIEW ALL TOURS</button>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .exp-header { flex-direction: column !important; align-items: flex-start !important; }
          .exp-title { font-size: 28px !important; }
        }
        @media (max-width: 600px) {
          .exp-filters { overflow-x: auto; flex-wrap: nowrap !important; padding-bottom: 8px; width: 100%; }
          .exp-grid { grid-template-columns: 1fr !important; }
          .exp-strip { justify-content: center !important; gap: 16px !important; }
          .exp-cta-btns button { width: 100% !important; }
        }
      `}</style>
    </>
  );
}

export default Experiences;