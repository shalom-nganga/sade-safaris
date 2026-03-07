import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const team = [
  { name: 'Samuel Kariuki', role: 'Founder & Lead Safari Guide', bio: 'Born and raised in Nairobi, Samuel has spent over 20 years guiding safaris across East Africa. His deep knowledge of wildlife behaviour and Kenyan culture makes every journey extraordinary.', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', exp: '20+ Years' },
  { name: 'Amina Wanjiku', role: 'Head of Operations', bio: 'Amina ensures every Sade Safaris booking runs seamlessly from first enquiry to final departure. Her attention to detail and warm personality keep our guests coming back.', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80', exp: '12 Years' },
  { name: 'David Omondi', role: 'Senior Wildlife Guide', bio: 'David specialises in bird watching and big cat tracking. With a degree in Wildlife Management, he brings scientific depth to every game drive across the Mara and Tsavo.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', exp: '15 Years' },
  { name: 'Grace Muthoni', role: 'Travel & Booking Consultant', bio: "Grace is the first voice you hear when you reach out to us. She crafts personalised itineraries that match every traveller's budget, interests, and dream safari vision.", img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', exp: '8 Years' },
];

const milestones = [
  { year: '2009', title: 'Founded', desc: "Sade Safaris was founded by Samuel Kariuki with a single vehicle and a passion for sharing Kenya's wildlife." },
  { year: '2012', title: 'First 100 Guests', desc: 'We welcomed our 100th traveller — a family from the UK who returned every year for the next decade.' },
  { year: '2015', title: 'Eco Certification', desc: 'Received Kenya Eco-Tourism certification and launched our wildlife conservation giving programme.' },
  { year: '2018', title: 'Regional Expansion', desc: 'Expanded operations to Tanzania, Uganda, and Rwanda, offering full East African safari packages.' },
  { year: '2021', title: '1,000 Guests', desc: 'Celebrated our 1,000th happy traveller — a milestone that reflects our commitment to excellence.' },
  { year: '2024', title: 'Award Winning', desc: "Named Kenya's Top Safari Operator by East Africa Travel Awards for the second consecutive year." },
];

const values = [
  { icon: '🌍', title: 'Authentic Experiences', desc: 'We believe safari should be real, raw, and deeply connected to the land and its people — never manufactured or rushed.' },
  { icon: '🌿', title: 'Conservation First', desc: '5% of every booking is donated to local wildlife conservation and anti-poaching programmes across Kenya.' },
  { icon: '🤝', title: 'Community Impact', desc: 'We employ local guides, source food locally, and partner with Maasai and Samburu communities to ensure tourism benefits everyone.' },
  { icon: '⭐', title: 'Excellence Always', desc: 'From the moment you enquire to the moment you land back home, we hold ourselves to the highest standards of service.' },
];

function About() {
  const navigate = useNavigate();
  const [hoveredMember, setHoveredMember] = useState(null);

  return (
    <>
      <div>
        <TopBar />
        <Navbar />

        {/* HERO */}
        <section style={{ position: 'relative', padding: '100px 5%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(.35)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(45,106,26,.7), transparent)' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, color: '#f5c518', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>OUR STORY</p>
            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(32px, 6vw, 80px)', fontWeight: 700, color: 'white', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '20px' }}>
              BORN FROM A<br /><span style={{ color: '#f5c518' }}>LOVE OF AFRICA</span>
            </h1>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.85)', maxWidth: '560px', lineHeight: 1.75 }}>
              For over 15 years, Sade Safaris has been connecting passionate travelers with the raw, untamed beauty of East Africa. We are not just a tour company — we are storytellers, conservationists, and proud Kenyans.
            </p>
          </div>
        </section>

        {/* STORY SECTION */}
        <section style={{ padding: '80px 5%', background: 'white' }}>
          <div className="about-story-grid" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px' }}>WHO WE ARE</p>
              <h2 className="about-story-h2" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '40px', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '24px', color: '#1a1a1a' }}>
                MORE THAN JUST<br /><span style={{ color: '#4a9c2f' }}>A SAFARI COMPANY</span>
              </h2>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.85, marginBottom: '20px' }}>
                Sade Safaris was founded in 2009 by Samuel Kariuki, a Nairobi-born wildlife enthusiast who believed that every traveller deserved to experience Kenya's magic the way locals do — authentically, responsibly, and unforgettably.
              </p>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.85, marginBottom: '20px' }}>
                What started as one man, one vehicle, and an unshakeable passion has grown into a team of 25 dedicated professionals, operating across Kenya, Tanzania, Uganda, and Rwanda. But our heart has never changed — every safari we run is personal, purposeful, and deeply rooted in a love for this land.
              </p>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.85, marginBottom: '36px' }}>
                We are proud members of the Kenya Tourism Federation, certified by the Kenya Eco-Tourism Board, and winners of the East Africa Travel Award for Best Safari Operator in 2023 and 2024.
              </p>
              <button onClick={() => navigate('/tours')} style={{ background: '#4a9c2f', color: 'white', border: 'none', padding: '15px 32px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit', letterSpacing: '.5px', transition: 'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2d6a1a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#4a9c2f'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >EXPLORE OUR TOURS →</button>
            </div>

            {/* Image collage */}
            <div className="about-collage" style={{ position: 'relative', height: '520px' }}>
              <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80" alt="Safari" style={{ position: 'absolute', top: 0, left: 0, width: '65%', height: '65%', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 8px 32px rgba(0,0,0,.15)' }} />
              <img src="https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=600&q=80" alt="Elephants" style={{ position: 'absolute', bottom: 0, right: 0, width: '60%', height: '60%', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 8px 32px rgba(0,0,0,.15)' }} />
              <div style={{ position: 'absolute', bottom: '18%', left: '-10px', background: '#f5c518', padding: '20px 24px', borderRadius: '6px', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,.15)' }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '42px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>15</div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#1a1a1a', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>YEARS OF<br />EXCELLENCE</div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section style={{ padding: '80px 5%', background: '#eaf5e3' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px' }}>WHAT DRIVES US</p>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 700, textTransform: 'uppercase', color: '#1a1a1a' }}>OUR CORE VALUES</h2>
            </div>
            <div className="about-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {values.map(v => (
                <div key={v.title} style={{ background: 'white', borderRadius: '8px', padding: '32px', borderTop: '4px solid #4a9c2f', boxShadow: '0 2px 16px rgba(0,0,0,.05)', transition: 'all .3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,.1)'; e.currentTarget.style.borderTopColor = '#f5c518'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,.05)'; e.currentTarget.style.borderTopColor = '#4a9c2f'; }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '16px', width: '60px', height: '60px', background: '#eaf5e3', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.icon}</div>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px', color: '#1a1a1a' }}>{v.title}</h3>
                  <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.75 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section style={{ padding: '80px 5%', background: 'white' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px' }}>HOW WE GOT HERE</p>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 700, textTransform: 'uppercase', color: '#1a1a1a' }}>OUR JOURNEY</h2>
            </div>

            {/* Desktop timeline */}
            <div className="about-timeline-desktop" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: '#e0e0e0', transform: 'translateX(-50%)' }} />
              {milestones.map((m, i) => (
                <div key={m.year} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: '40px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '50%', top: '24px', transform: 'translate(-50%, -50%)', width: '16px', height: '16px', borderRadius: '50%', background: '#4a9c2f', border: '3px solid white', boxShadow: '0 0 0 3px #4a9c2f', zIndex: 2 }} />
                  <div style={{ width: '44%', background: '#f9f9f7', borderRadius: '8px', padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,.06)', borderLeft: i % 2 === 0 ? '4px solid #4a9c2f' : 'none', borderRight: i % 2 !== 0 ? '4px solid #4a9c2f' : 'none', textAlign: i % 2 === 0 ? 'left' : 'right' }}>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '28px', fontWeight: 700, color: '#f5c518', marginBottom: '4px' }}>{m.year}</div>
                    <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px', textTransform: 'uppercase' }}>{m.title}</h4>
                    <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.7 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile timeline */}
            <div className="about-timeline-mobile" style={{ display: 'none', flexDirection: 'column', gap: '0' }}>
              {milestones.map((m, i) => (
                <div key={m.year} style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4a9c2f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '3px solid white', boxShadow: '0 0 0 3px #4a9c2f' }}>
                      <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '11px', fontWeight: 700, color: 'white' }}>{m.year.slice(2)}</span>
                    </div>
                    {i < milestones.length - 1 && <div style={{ width: '2px', flex: 1, background: '#e0e0e0', margin: '4px 0', minHeight: '20px' }} />}
                  </div>
                  <div style={{ background: '#f9f9f7', borderRadius: '8px', padding: '20px', marginBottom: '16px', borderLeft: '4px solid #4a9c2f', flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '24px', fontWeight: 700, color: '#f5c518', marginBottom: '4px' }}>{m.year}</div>
                    <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px', textTransform: 'uppercase' }}>{m.title}</h4>
                    <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.7 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section style={{ padding: '80px 5%', background: '#f9f9f7' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px' }}>THE PEOPLE BEHIND THE MAGIC</p>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 700, textTransform: 'uppercase', color: '#1a1a1a' }}>MEET OUR TEAM</h2>
            </div>
            <div className="about-team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {team.map(member => (
                <div key={member.name} onMouseEnter={() => setHoveredMember(member.name)} onMouseLeave={() => setHoveredMember(null)}
                  style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: hoveredMember === member.name ? '0 20px 48px rgba(0,0,0,.14)' : '0 2px 12px rgba(0,0,0,.07)', transform: hoveredMember === member.name ? 'translateY(-8px)' : 'translateY(0)', transition: 'all .3s ease' }}
                >
                  <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                    <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hoveredMember === member.name ? 'scale(1.06)' : 'scale(1)', transition: 'transform .5s ease' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 60%)' }} />
                    <div style={{ position: 'absolute', bottom: '14px', left: '14px', background: '#4a9c2f', color: 'white', fontSize: '11px', fontWeight: 800, letterSpacing: '1px', padding: '4px 10px', borderRadius: '3px', textTransform: 'uppercase' }}>{member.exp}</div>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>{member.name}</h3>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#4a9c2f', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>{member.role}</div>
                    <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.7 }}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ position: 'relative', padding: '100px 5%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(.28)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(45,106,26,.8), transparent)' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, color: '#f5c518', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px' }}>READY TO TRAVEL WITH US?</p>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 700, color: 'white', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '20px' }}>
              LET'S CREATE YOUR<br /><span style={{ color: '#f5c518' }}>PERFECT SAFARI</span>
            </h2>
            <div className="about-cta-btns" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/tours')} style={{ background: '#f5c518', color: '#1a1a1a', border: 'none', padding: '16px 36px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit', letterSpacing: '.5px', transition: 'all .25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e6b800'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f5c518'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >VIEW OUR TOURS →</button>
              <button onClick={() => navigate('/contact')} style={{ background: 'rgba(255,255,255,.1)', color: 'white', border: '2px solid rgba(255,255,255,.4)', padding: '14px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', borderRadius: '4px', fontFamily: 'inherit', backdropFilter: 'blur(8px)', transition: 'all .2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
              >📞 CONTACT US</button>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .about-team-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-values-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .about-story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-collage { height: 360px !important; }
          .about-story-h2 { font-size: 32px !important; }
          .about-timeline-desktop { display: none !important; }
          .about-timeline-mobile { display: flex !important; }
        }
        @media (max-width: 600px) {
          .about-team-grid { grid-template-columns: 1fr !important; }
          .about-values-grid { grid-template-columns: 1fr !important; }
          .about-collage { display: none !important; }
          .about-cta-btns button { width: 100% !important; }
        }
      `}</style>
    </>
  );
}

export default About;