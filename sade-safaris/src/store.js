import { supabase } from './supabase';

// ── TOURS ──
export async function getTours() {
  const { data, error } = await supabase.from('tours').select('*').order('created_at', { ascending: false });
  if (error) { console.error('getTours error:', error); return []; }
  return data.map(t => ({
    ...t,
    groupSize: t.group_size,
    pricePerDay: t.price_per_day,
  }));
}

export async function saveTour(tour) {
  const payload = {
    id: tour.id || Date.now(),
    title: tour.title,
    days: tour.days,
    price: tour.price,
    location: tour.location,
    category: tour.category,
    rating: tour.rating || 4.8,
    reviews: tour.reviews || 0,
    img: tour.img || '',
    badge: tour.badge || '',
    difficulty: tour.difficulty || 'Moderate',
    group_size: tour.groupSize || tour.group_size || '2-12',
    description: tour.description || '',
    highlights: tour.highlights || [],
    includes: tour.includes || [],
    excludes: tour.excludes || [],
    itinerary: tour.itinerary || [],
    images: tour.images || [],
  };
  const { error } = await supabase.from('tours').upsert(payload);
  if (error) console.error('saveTour error:', error);
}

export async function deleteTour(id) {
  const { error } = await supabase.from('tours').delete().eq('id', id);
  if (error) console.error('deleteTour error:', error);
}

// ── VEHICLES ──
export async function getVehicles() {
  const { data, error } = await supabase.from('vehicles').select('*').order('created_at', { ascending: false });
  if (error) { console.error('getVehicles error:', error); return []; }
  return data.map(v => ({
    ...v,
    pricePerDay: v.price_per_day,
    badgeColor: v.badge_color,
  }));
}

export async function saveVehicle(vehicle) {
  const payload = {
    id: vehicle.id || Date.now(),
    name: vehicle.name,
    type: vehicle.type,
    seats: vehicle.seats,
    transmission: vehicle.transmission,
    fuel: vehicle.fuel,
    price_per_day: vehicle.pricePerDay || vehicle.price_per_day,
    img: vehicle.img || '',
    badge: vehicle.badge || '',
    badge_color: vehicle.badgeColor || vehicle.badge_color || '#1a56db',
    available: vehicle.available !== undefined ? vehicle.available : true,
    features: vehicle.features || [],
    description: vehicle.description || '',
  };
  const { error } = await supabase.from('vehicles').upsert(payload);
  if (error) console.error('saveVehicle error:', error);
}

export async function deleteVehicle(id) {
  const { error } = await supabase.from('vehicles').delete().eq('id', id);
  if (error) console.error('deleteVehicle error:', error);
}

// ── SAFARI BOOKINGS ──
export async function getSafariBookings() {
  const { data, error } = await supabase.from('safari_bookings').select('*').order('created_at', { ascending: false });
  if (error) { console.error('getSafariBookings error:', error); return []; }
  return data;
}

export async function saveSafariBooking(booking) {
  const payload = {
    id: booking.id || Date.now(),
    booking_ref: booking.booking_ref || `SB${Date.now()}`,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    tour_id: String(booking.tour_id || ''),
    tour_name: booking.tour_name,
    travel_date: booking.travel_date,
    guests: booking.guests,
    amount: booking.amount,
    status: booking.status || 'Pending',
    notes: booking.notes || '',
  };
  const { error } = await supabase.from('safari_bookings').upsert(payload);
  if (error) console.error('saveSafariBooking error:', error);
}

export async function updateSafariBookingStatus(id, status) {
  const { error } = await supabase.from('safari_bookings').update({ status }).eq('id', id);
  if (error) console.error('updateSafariBookingStatus error:', error);
}

export async function deleteSafariBooking(id) {
  const { error } = await supabase.from('safari_bookings').delete().eq('id', id);
  if (error) console.error('deleteSafariBooking error:', error);
}

// ── CAR BOOKINGS ──
export async function getCarBookings() {
  const { data, error } = await supabase.from('car_bookings').select('*').order('created_at', { ascending: false });
  if (error) { console.error('getCarBookings error:', error); return []; }
  return data;
}

export async function saveCarBooking(booking) {
  const payload = {
    id: booking.id || Date.now(),
    booking_ref: booking.booking_ref || `CB${Date.now()}`,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    vehicle_id: String(booking.vehicle_id || ''),
    vehicle_name: booking.vehicle_name,
    pickup_date: booking.pickup_date,
    return_date: booking.return_date,
    days: booking.days,
    with_driver: booking.with_driver || false,
    pickup_location: booking.pickup_location || '',
    amount: booking.amount,
    status: booking.status || 'Pending',
    notes: booking.notes || '',
  };
  const { error } = await supabase.from('car_bookings').upsert(payload);
  if (error) console.error('saveCarBooking error:', error);
}

export async function updateCarBookingStatus(id, status) {
  const { error } = await supabase.from('car_bookings').update({ status }).eq('id', id);
  if (error) console.error('updateCarBookingStatus error:', error);
}

export async function deleteCarBooking(id) {
  const { error } = await supabase.from('car_bookings').delete().eq('id', id);
  if (error) console.error('deleteCarBooking error:', error);
}

// ── BLOG POSTS ──
export async function getBlogPosts() {
  const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
  if (error) { console.error('getBlogPosts error:', error); return []; }
  return data;
}

export async function saveBlogPost(post) {
  const payload = {
    id: post.id || Date.now(),
    title: post.title,
    category: post.category,
    excerpt: post.excerpt || '',
    content: post.content || '',
    img: post.img || '',
    author: post.author,
    read_time: post.read_time || 5,
    tags: post.tags || [],
    status: post.status || 'Draft',
    views: post.views || 0,
  };
  const { error } = await supabase.from('blog_posts').upsert(payload);
  if (error) console.error('saveBlogPost error:', error);
}

export async function deleteBlogPost(id) {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) console.error('deleteBlogPost error:', error);
}

// ── SPECIAL OFFERS ──
export async function getOffers() {
  const { data, error } = await supabase.from('special_offers').select('*').order('created_at', { ascending: false });
  if (error) { console.error('getOffers error:', error); return []; }
  return data;
}

export async function saveOffer(offer) {
  const payload = {
    id: offer.id || Date.now(),
    title: offer.title,
    discount: offer.discount,
    tag: offer.tag || '',
    original_price: offer.original_price || null,
    offer_price: offer.offer_price || null,
    valid_until: offer.valid_until || '',
    description: offer.description || '',
    includes: offer.includes || [],
    status: offer.status || 'Active',
    img: offer.img || '',
  };
  const { error } = await supabase.from('special_offers').upsert(payload);
  if (error) console.error('saveOffer error:', error);
}

export async function deleteOffer(id) {
  const { error } = await supabase.from('special_offers').delete().eq('id', id);
  if (error) console.error('deleteOffer error:', error);
}

// ── MESSAGES ──
export async function getMessages() {
  const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
  if (error) { console.error('getMessages error:', error); return []; }
  return data;
}

export async function saveMessage(message) {
  const payload = {
    id: message.id || Date.now(),
    name: message.name,
    email: message.email,
    phone: message.phone || '',
    subject: message.subject,
    message: message.message,
    service: message.service || '',
    type: message.type || 'General',
    status: message.status || 'Unread',
    reply: message.reply || '',
  };
  const { error } = await supabase.from('messages').upsert(payload);
  if (error) console.error('saveMessage error:', error);
}

export async function markMessageRead(id) {
  const { error } = await supabase.from('messages').update({ status: 'Read' }).eq('id', id);
  if (error) console.error('markMessageRead error:', error);
}

export async function replyToMessage(id, reply) {
  const { error } = await supabase.from('messages').update({ reply, status: 'Replied', replied_at: new Date().toISOString() }).eq('id', id);
  if (error) console.error('replyToMessage error:', error);
}

export async function deleteMessage(id) {
  const { error } = await supabase.from('messages').delete().eq('id', id);
  if (error) console.error('deleteMessage error:', error);
}

// ── INIT (no longer needed but kept for compatibility) ──
export function initStore() {}