import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import FeaturedTours from '../components/FeaturedTours';
import Destinations from '../components/Destinations';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';
// import Stats from '../components/Stats';

function Home() {
  return (
    <div>
      <TopBar />
      <Navbar />
      <Hero />
      <SearchBar />
      <FeaturedTours />
      <Destinations />
      <WhyUs />
      <Testimonials />
      <CTABanner />
      <Footer />
      {/* <Stats /> */}
    </div>
  );
}

export default Home;