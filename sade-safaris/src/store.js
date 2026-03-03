import toursData from './data/tours';
import vehiclesData from './data/vehicles';

// ── INITIALIZE DATA ──
// Seeds localStorage with existing data if empty

export const initStore = () => {
  if (!localStorage.getItem('ss_tours')) {
    localStorage.setItem('ss_tours', JSON.stringify(toursData));
  }
  if (!localStorage.getItem('ss_vehicles')) {
    localStorage.setItem('ss_vehicles', JSON.stringify(vehiclesData));
  }
  if (!localStorage.getItem('ss_safari_bookings')) {
    localStorage.setItem('ss_safari_bookings', JSON.stringify([
      { id: 1, booking_ref: 'SB001', name: 'James Mwangi', email: 'james@email.com', phone: '+254 722 111 222', tour_name: 'Masai Mara Safari', travel_date: '2026-03-10', guests: 2, amount: 56000, status: 'Confirmed', notes: '', created_at: '2026-02-28' },
      { id: 2, booking_ref: 'SB002', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 555 234 5678', tour_name: 'Amboseli Elephant Safari', travel_date: '2026-03-14', guests: 4, amount: 112000, status: 'Pending', notes: '', created_at: '2026-03-01' },
      { id: 3, booking_ref: 'SB003', name: 'Ahmed Al-Rashid', email: 'ahmed@email.com', phone: '+971 50 123 4567', tour_name: 'Samburu & Buffalo Springs', travel_date: '2026-03-18', guests: 2, amount: 90000, status: 'Confirmed', notes: '', created_at: '2026-03-01' },
      { id: 4, booking_ref: 'SB004', name: 'Emily Chen', email: 'emily@email.com', phone: '+86 138 0000 1234', tour_name: 'Diani Beach Escape', travel_date: '2026-03-22', guests: 3, amount: 84000, status: 'Pending', notes: '', created_at: '2026-03-02' },
      { id: 5, booking_ref: 'SB005', name: 'David Omondi', email: 'david@email.com', phone: '+254 733 444 555', tour_name: 'Tsavo East & West', travel_date: '2026-03-25', guests: 6, amount: 180000, status: 'Confirmed', notes: '', created_at: '2026-03-02' },
    ]));
  }
  if (!localStorage.getItem('ss_car_bookings')) {
    localStorage.setItem('ss_car_bookings', JSON.stringify([
      { id: 1, booking_ref: 'CB001', name: 'Peter Kamau', email: 'peter@email.com', phone: '+254 722 333 444', vehicle_name: 'Toyota Land Cruiser V8', pickup_date: '2026-03-08', return_date: '2026-03-13', days: 5, with_driver: true, pickup_location: 'JKIA', amount: 72500, status: 'Active', notes: '', created_at: '2026-03-01' },
      { id: 2, booking_ref: 'CB002', name: 'Linda Achieng', email: 'linda@email.com', phone: '+254 711 222 333', vehicle_name: 'Toyota RAV4', pickup_date: '2026-03-11', return_date: '2026-03-14', days: 3, with_driver: false, pickup_location: 'Westlands', amount: 19500, status: 'Confirmed', notes: '', created_at: '2026-03-01' },
      { id: 3, booking_ref: 'CB003', name: 'Marcus Williams', email: 'marcus@email.com', phone: '+1 555 987 6543', vehicle_name: 'Mercedes Sprinter', pickup_date: '2026-03-15', return_date: '2026-03-17', days: 2, with_driver: true, pickup_location: 'CBD', amount: 35000, status: 'Pending', notes: '', created_at: '2026-03-02' },
      { id: 4, booking_ref: 'CB004', name: 'Fatima Noor', email: 'fatima@email.com', phone: '+254 700 555 666', vehicle_name: 'Toyota Prado TX', pickup_date: '2026-03-20', return_date: '2026-03-25', days: 5, with_driver: false, pickup_location: 'Karen', amount: 47500, status: 'Confirmed', notes: '', created_at: '2026-03-02' },
    ]));
  }
  if (!localStorage.getItem('ss_blog_posts')) {
    localStorage.setItem('ss_blog_posts', JSON.stringify([
      { id: 1, title: 'The Great Migration: Everything You Need to Know', category: 'Wildlife', author: 'Samuel Kariuki', status: 'Published', views: 1240, created_at: 'Feb 12, 2026', excerpt: 'The Great Migration is one of nature\'s most spectacular events...', content: '', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800', tags: ['wildlife', 'migration'], read_time: 8 },
      { id: 2, title: 'Top 10 Safari Packing Tips from Our Guides', category: 'Travel Tips', author: 'Amina Wanjiku', status: 'Published', views: 876, created_at: 'Jan 28, 2026', excerpt: 'Packing for a safari can be tricky...', content: '', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', tags: ['tips', 'packing'], read_time: 5 },
      { id: 3, title: 'Why Amboseli is Perfect for First-Time Safari Visitors', category: 'Destinations', author: 'David Omondi', status: 'Published', views: 654, created_at: 'Jan 15, 2026', excerpt: 'Amboseli National Park sits at the foot of Mount Kilimanjaro...', content: '', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800', tags: ['amboseli', 'beginners'], read_time: 6 },
      { id: 4, title: 'The Samburu Special Five', category: 'Wildlife', author: 'David Omondi', status: 'Draft', views: 0, created_at: 'Dec 20, 2025', excerpt: 'Samburu is home to five rare species...', content: '', img: 'https://images.unsplash.com/photo-1534476478164-b15ebe7b7aef?w=800', tags: ['samburu', 'wildlife'], read_time: 7 },
    ]));
  }
  if (!localStorage.getItem('ss_offers')) {
    localStorage.setItem('ss_offers', JSON.stringify([
      { id: 1, title: 'Early Bird Masai Mara', discount: '20% OFF', tag: 'Early Bird', original_price: 70000, offer_price: 56000, valid_until: '2026-04-30', description: 'Book 60 days in advance and save 20% on our Masai Mara Safari.', includes: ['All meals', 'Game drives', 'Park fees'], status: 'Active', bookings: 8 },
      { id: 2, title: 'Couples Safari Package', discount: '15% OFF', tag: 'Couples', original_price: 140000, offer_price: 119000, valid_until: '2026-05-31', description: 'A romantic safari experience for two.', includes: ['Private vehicle', 'Champagne breakfast', 'Sunset drive'], status: 'Active', bookings: 5 },
      { id: 3, title: 'Family Adventure Deal', discount: 'Free Child', tag: 'Family', original_price: 210000, offer_price: 168000, valid_until: '2026-06-30', description: 'Bring the whole family — kids under 12 go free!', includes: ['Family tent', 'Kids activities', 'All meals'], status: 'Active', bookings: 3 },
    ]));
  }
  if (!localStorage.getItem('ss_messages')) {
    localStorage.setItem('ss_messages', JSON.stringify([
      { id: 1, name: 'James Mwangi', email: 'james@email.com', phone: '+254 722 111 222', subject: 'Booking enquiry — Masai Mara', message: 'Hi, I would like to book the Masai Mara Safari for 2 people in March. Could you send me more details on pricing and availability?', type: 'Safari', status: 'Unread', reply: '', created_at: '2026-03-02' },
      { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 555 234 5678', subject: 'Airport transfer request', message: 'I need a vehicle with driver for airport pickup at JKIA on March 14th. Flight arrives at 10:30am. Can you help?', type: 'Car Hire', status: 'Unread', reply: '', created_at: '2026-03-02' },
      { id: 3, name: 'Ahmed Al-Rashid', email: 'ahmed@email.com', phone: '+971 50 123 4567', subject: 'Group safari — 12 people', message: 'We are a group of 12 looking to do a 5-day safari in July. What packages do you recommend?', type: 'Safari', status: 'Unread', reply: '', created_at: '2026-03-01' },
      { id: 4, name: 'Emily Chen', email: 'emily@email.com', phone: '+86 138 0000 1234', subject: 'Honeymoon package inquiry', message: 'My partner and I are planning our honeymoon in Kenya. Do you have honeymoon packages?', type: 'Safari', status: 'Read', reply: '', created_at: '2026-03-01' },
      { id: 5, name: 'Marcus Williams', email: 'marcus@email.com', phone: '+1 555 987 6543', subject: 'Long term vehicle hire', message: 'I will be in Nairobi for 3 months on a work assignment and need a reliable vehicle. What are your long term rates?', type: 'Car Hire', status: 'Read', reply: '', created_at: '2026-02-28' },
    ]));
  }
};

// ── GETTERS ──
export const getTours = () => JSON.parse(localStorage.getItem('ss_tours') || '[]');
export const getVehicles = () => JSON.parse(localStorage.getItem('ss_vehicles') || '[]');
export const getSafariBookings = () => JSON.parse(localStorage.getItem('ss_safari_bookings') || '[]');
export const getCarBookings = () => JSON.parse(localStorage.getItem('ss_car_bookings') || '[]');
export const getBlogPosts = () => JSON.parse(localStorage.getItem('ss_blog_posts') || '[]');
export const getOffers = () => JSON.parse(localStorage.getItem('ss_offers') || '[]');
export const getMessages = () => JSON.parse(localStorage.getItem('ss_messages') || '[]');

// ── TOURS ──
export const saveTour = (tour) => {
  const tours = getTours();
  if (tour.id) {
    const updated = tours.map(t => t.id === tour.id ? tour : t);
    localStorage.setItem('ss_tours', JSON.stringify(updated));
  } else {
    const newTour = { ...tour, id: Date.now() };
    localStorage.setItem('ss_tours', JSON.stringify([...tours, newTour]));
  }
};
export const deleteTour = (id) => {
  const tours = getTours().filter(t => t.id !== id);
  localStorage.setItem('ss_tours', JSON.stringify(tours));
};

// ── VEHICLES ──
export const saveVehicle = (vehicle) => {
  const vehicles = getVehicles();
  if (vehicle.id) {
    const updated = vehicles.map(v => v.id === vehicle.id ? vehicle : v);
    localStorage.setItem('ss_vehicles', JSON.stringify(updated));
  } else {
    const newVehicle = { ...vehicle, id: Date.now() };
    localStorage.setItem('ss_vehicles', JSON.stringify([...vehicles, newVehicle]));
  }
};
export const deleteVehicle = (id) => {
  const vehicles = getVehicles().filter(v => v.id !== id);
  localStorage.setItem('ss_vehicles', JSON.stringify(vehicles));
};

// ── SAFARI BOOKINGS ──
export const updateSafariBookingStatus = (id, status) => {
  const bookings = getSafariBookings().map(b => b.id === id ? { ...b, status } : b);
  localStorage.setItem('ss_safari_bookings', JSON.stringify(bookings));
};
export const deleteSafariBooking = (id) => {
  const bookings = getSafariBookings().filter(b => b.id !== id);
  localStorage.setItem('ss_safari_bookings', JSON.stringify(bookings));
};

// ── CAR BOOKINGS ──
export const updateCarBookingStatus = (id, status) => {
  const bookings = getCarBookings().map(b => b.id === id ? { ...b, status } : b);
  localStorage.setItem('ss_car_bookings', JSON.stringify(bookings));
};
export const deleteCarBooking = (id) => {
  const bookings = getCarBookings().filter(b => b.id !== id);
  localStorage.setItem('ss_car_bookings', JSON.stringify(bookings));
};

// ── BLOG ──
export const saveBlogPost = (post) => {
  const posts = getBlogPosts();
  if (post.id) {
    const updated = posts.map(p => p.id === post.id ? post : p);
    localStorage.setItem('ss_blog_posts', JSON.stringify(updated));
  } else {
    const newPost = { ...post, id: Date.now(), views: 0, created_at: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
    localStorage.setItem('ss_blog_posts', JSON.stringify([...posts, newPost]));
  }
};
export const deleteBlogPost = (id) => {
  const posts = getBlogPosts().filter(p => p.id !== id);
  localStorage.setItem('ss_blog_posts', JSON.stringify(posts));
};

// ── OFFERS ──
export const saveOffer = (offer) => {
  const offers = getOffers();
  if (offer.id) {
    const updated = offers.map(o => o.id === offer.id ? offer : o);
    localStorage.setItem('ss_offers', JSON.stringify(updated));
  } else {
    const newOffer = { ...offer, id: Date.now(), bookings: 0 };
    localStorage.setItem('ss_offers', JSON.stringify([...offers, newOffer]));
  }
};
export const deleteOffer = (id) => {
  const offers = getOffers().filter(o => o.id !== id);
  localStorage.setItem('ss_offers', JSON.stringify(offers));
};

// ── MESSAGES ──
export const markMessageRead = (id) => {
  const messages = getMessages().map(m => m.id === id ? { ...m, status: 'Read' } : m);
  localStorage.setItem('ss_messages', JSON.stringify(messages));
};
export const replyToMessage = (id, reply) => {
  const messages = getMessages().map(m => m.id === id ? { ...m, reply, status: 'Replied' } : m);
  localStorage.setItem('ss_messages', JSON.stringify(messages));
};
export const deleteMessage = (id) => {
  const messages = getMessages().filter(m => m.id !== id);
  localStorage.setItem('ss_messages', JSON.stringify(messages));
};