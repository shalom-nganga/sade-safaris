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
      </Routes>
    </BrowserRouter>
  );
}

export default App;