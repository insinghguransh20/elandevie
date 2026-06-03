import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import VisionPage from './pages/VisionPage.jsx';
import ProgrammePage from './pages/ProgrammePage.jsx';
import HowPage from './pages/HowPage.jsx';
import FoundersPage from './pages/FoundersPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import JoinUsPage from './pages/JoinUsPage.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/programme" element={<ProgrammePage />} />
          <Route path="/how" element={<HowPage />} />
          <Route path="/founders" element={<FoundersPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/join" element={<JoinUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
