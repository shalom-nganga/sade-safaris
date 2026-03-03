// const BASE_URL = 'http://localhost:5000/api';

// // ── TOURS ──
// export const getTours = () => fetch(`${BASE_URL}/tours`).then(r => r.json());
// export const createTour = (data) => fetch(`${BASE_URL}/tours`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
// export const updateTour = (id, data) => fetch(`${BASE_URL}/tours/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
// export const deleteTour = (id) => fetch(`${BASE_URL}/tours/${id}`, { method: 'DELETE' }).then(r => r.json());

// // ── VEHICLES ──
// export const getVehicles = () => fetch(`${BASE_URL}/vehicles`).then(r => r.json());
// export const createVehicle = (data) => fetch(`${BASE_URL}/vehicles`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
// export const updateVehicle = (id, data) => fetch(`${BASE_URL}/vehicles/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
// export const deleteVehicle = (id) => fetch(`${BASE_URL}/vehicles/${id}`, { method: 'DELETE' }).then(r => r.json());

// // ── SAFARI BOOKINGS ──
// export const getSafariBookings = () => fetch(`${BASE_URL}/safari-bookings`).then(r => r.json());
// export const createSafariBooking = (data) => fetch(`${BASE_URL}/safari-bookings`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
// export const updateSafariBookingStatus = (id, status) => fetch(`${BASE_URL}/safari-bookings/${id}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) }).then(r => r.json());
// export const deleteSafariBooking = (id) => fetch(`${BASE_URL}/safari-bookings/${id}`, { method: 'DELETE' }).then(r => r.json());

// // ── CAR BOOKINGS ──
// export const getCarBookings = () => fetch(`${BASE_URL}/car-bookings`).then(r => r.json());
// export const createCarBooking = (data) => fetch(`${BASE_URL}/car-bookings`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
// export const updateCarBookingStatus = (id, status) => fetch(`${BASE_URL}/car-bookings/${id}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) }).then(r => r.json());
// export const deleteCarBooking = (id) => fetch(`${BASE_URL}/car-bookings/${id}`, { method: 'DELETE' }).then(r => r.json());

// // ── BLOG ──
// export const getBlogPosts = () => fetch(`${BASE_URL}/blog`).then(r => r.json());
// export const createBlogPost = (data) => fetch(`${BASE_URL}/blog`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
// export const updateBlogPost = (id, data) => fetch(`${BASE_URL}/blog/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
// export const deleteBlogPost = (id) => fetch(`${BASE_URL}/blog/${id}`, { method: 'DELETE' }).then(r => r.json());

// // ── OFFERS ──
// export const getOffers = () => fetch(`${BASE_URL}/offers`).then(r => r.json());
// export const createOffer = (data) => fetch(`${BASE_URL}/offers`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
// export const updateOffer = (id, data) => fetch(`${BASE_URL}/offers/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
// export const deleteOffer = (id) => fetch(`${BASE_URL}/offers/${id}`, { method: 'DELETE' }).then(r => r.json());

// // ── MESSAGES ──
// export const getMessages = () => fetch(`${BASE_URL}/messages`).then(r => r.json());
// export const markMessageRead = (id) => fetch(`${BASE_URL}/messages/${id}/read`, { method: 'PUT' }).then(r => r.json());
// export const replyToMessage = (id, reply) => fetch(`${BASE_URL}/messages/${id}/reply`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reply }) }).then(r => r.json());
// export const deleteMessage = (id) => fetch(`${BASE_URL}/messages/${id}`, { method: 'DELETE' }).then(r => r.json());

// // ── AUTH ──
// export const adminLogin = (username, password) => fetch(`${BASE_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) }).then(r => r.json());