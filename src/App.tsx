import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/home/Home";
import Restaurante from "./pages/restaurante/Restaurante";
import Room from "./pages/rooms/Room";
import History from "./pages/historia/History";
import Area from "./pages/area/Area";
import Reservas from "./components/reservas/Reserva";

/* === CONTACTO === */
import Contacto from "./pages/contacto/Contacto";

/* === LEGAL PAGES === */
import Privacy from "./pages/legal/Privacy";
import LegalNotice from "./pages/legal/LegalNotice";
import Cookies from "./pages/legal/Cookies";

/* === 404 === */
import NotFound from "./pages/notfound/NotFound";

/* === SCROLL === */
import ScrollToTop from "./components/scrolltotop/ScrollToTop";

/* === COOKIE BANNER === */
import CookieBanner from "./components/CookieBanner/CookieBanner";

import "./styles/App.css";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* ✅ AQUÍ VA */}

      <Navbar />

      <Routes>
        {/* === MAIN ROUTES === */}
        <Route path="/" element={<Home />} />
        <Route path="/restaurante" element={<Restaurante />} />
        <Route path="/habitaciones" element={<Room />} />
        <Route path="/historia" element={<History />} />
        <Route path="/entorno" element={<Area />} />
        <Route path="/reservar" element={<Reservas />} />
        <Route path="/contacto" element={<Contacto />} />

        {/* === LEGAL ROUTES === */}
        <Route path="/privacidad" element={<Privacy />} />
        <Route path="/aviso-legal" element={<LegalNotice />} />
        <Route path="/cookies" element={<Cookies />} />

        {/* === Redirects (legacy URLs) === */}
        <Route path="/rooms" element={<Navigate to="/habitaciones" replace />} />
        <Route path="/area" element={<Navigate to="/entorno" replace />} />

        {/* === 404 fallback === */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <CookieBanner />
    </BrowserRouter>
  );
}