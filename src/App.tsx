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

/* === 401 / 403 / 500 === */
import Unauthorized from "./pages/errors/Unauthorized";
import Forbidden from "./pages/errors/Forbidden";
import ServerError from "./pages/errors/ServerError";

/* === 404 === */
import NotFound from "./pages/notfound/NotFound";

/* === SCROLL === */
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
import LanguageSync from "./components/language/LanguageSync";

/* === COOKIE BANNER === */
import CookieBanner from "./components/CookieBanner/CookieBanner";

import "./styles/App.css";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageSync />

      <Navbar />

      <Routes>
        {/* ========= ROUTES WITH LANGUAGE ========= */}
        <Route path="/:lang/*" element={<Home />} />
        <Route path="/:lang/restaurante" element={<Restaurante />} />
        <Route path="/:lang/habitaciones" element={<Room />} />
        <Route path="/:lang/historia" element={<History />} />
        <Route path="/:lang/entorno" element={<Area />} />
        <Route path="/:lang/reservar" element={<Reservas />} />
        <Route path="/:lang/contacto" element={<Contacto />} />

        {/* ========= LEGAL WITH LANGUAGE ========= */}
        <Route path="/:lang/privacidad" element={<Privacy />} />
        <Route path="/:lang/aviso-legal" element={<LegalNotice />} />
        <Route path="/:lang/cookies" element={<Cookies />} />

        {/* ========= ERROR ROUTES ========= */}
        <Route path="/401" element={<Unauthorized />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/500" element={<ServerError />} />

        {/* ========= LEGACY ROUTES (fallback) ========= */}
        <Route path="/" element={<Navigate to="/es" replace />} />
        <Route path="/restaurante" element={<Navigate to="/es/restaurante" replace />} />
        <Route path="/habitaciones" element={<Navigate to="/es/habitaciones" replace />} />
        <Route path="/historia" element={<Navigate to="/es/historia" replace />} />
        <Route path="/entorno" element={<Navigate to="/es/entorno" replace />} />
        <Route path="/reservar" element={<Navigate to="/es/reservar" replace />} />
        <Route path="/contacto" element={<Navigate to="/es/contacto" replace />} />

        {/* Legacy legal (sin idioma) */}
        <Route path="/privacidad" element={<Navigate to="/es/privacidad" replace />} />
        <Route path="/aviso-legal" element={<Navigate to="/es/aviso-legal" replace />} />
        <Route path="/cookies" element={<Navigate to="/es/cookies" replace />} />

        {/* ========= REDIRECTS ========= */}
        <Route path="/rooms" element={<Navigate to="/es/habitaciones" replace />} />
        <Route path="/area" element={<Navigate to="/es/entorno" replace />} />

        {/* ========= 404 ========= */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <CookieBanner />
      <Footer />
    </BrowserRouter>
  );
}