import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import About from './pages/About';
import Experiences from './pages/Experiences';
import SpecialOffers from './pages/SpecialOffers';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import CarHire from './pages/CarHire';
import CarDetail from './pages/CarDetail';
import CarHireHome from './pages/CarHireHome';
import CarContact from './pages/CarContact';
import CarServices from './pages/CarServices';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './pages/admin/AdminLayout';
import SafariBookings from './pages/admin/SafariBookings';
import CarBookings from './pages/admin/CarBookings';
import ManageTours from './pages/admin/ManageTours';
import ManageVehicles from './pages/admin/ManageVehicles';
import AdminBlog from './pages/admin/AdminBlog';
import AdminOffers from './pages/admin/AdminOffers';
import AdminMessages from './pages/admin/AdminMessages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/special-offers" element={<SpecialOffers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/car-hire" element={<CarHireHome />} />
        <Route path="/car-hire/fleet" element={<CarHire />} />
        <Route path="/car-hire/vehicle/:id" element={<CarDetail />} />
        <Route path="/car-hire/contact" element={<CarContact />} />
        <Route path="/car-hire/services" element={<CarServices />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminLayout page="dashboard" />} />
        <Route path="/admin/safari-bookings" element={<AdminLayout page="safari-bookings" />} />
        <Route path="/admin/car-bookings" element={<AdminLayout page="car-bookings" />} />
        <Route path="/admin/tours" element={<AdminLayout page="tours" />} />
        <Route path="/admin/vehicles" element={<AdminLayout page="vehicles" />} />
        <Route path="/admin/blog" element={<AdminLayout page="blog" />} />
        <Route path="/admin/offers" element={<AdminLayout page="offers" />} />
        <Route path="/admin/messages" element={<AdminLayout page="messages" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// BA4skARix./Sn7f
// https://tavzrippckuzibpsbgiy.supabase.co-project url
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhdnpyaXBwY2t1emlicHNiZ2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NTUzODUsImV4cCI6MjA4ODEzMTM4NX0.HLQK8kIO3-CBmyfQxw3DkTfU29BEqVidVERo-XTh2SQ