import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/home/Home";
import Servicios from "./pages/servicios/Servicios";
import Restaurante from "./pages/restaurante/Restaurante";
import Room from "./pages/rooms/Room";
import History from "./pages/historia/History";
import Area from "./pages/area/Area";

/* === ADMIN === */
import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/Login";

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

/* === SCROLL + LANGUAGE === */
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
import LanguageSync from "./components/language/LanguageSync";

/* === COOKIE BANNER === */
import CookieBanner from "./components/CookieBanner/CookieBanner";

import "./styles/App.css";

/* 🔥 URL limpia SIN fechas */
const BOOKING_URL =
  "https://direct-book.com/properties/tavernadelasaldirect?locale=es&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=EUR&trackPage=yes";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageSync />

      <Navbar />

      <Routes>

        {/* ================== RUTAS CON IDIOMA ================== */}

        <Route path="/:lang/admin/login" element={<AdminLogin />} />
        <Route path="/:lang/admin" element={<Admin />} />

        <Route path="/:lang" element={<Home />} />
        <Route path="/:lang/servicios" element={<Servicios />} />
        <Route path="/:lang/restaurante" element={<Restaurante />} />
        <Route path="/:lang/habitaciones" element={<Room />} />
        <Route path="/:lang/historia" element={<History />} />
        <Route path="/:lang/entorno" element={<Area />} />

        {/* RESERVAS → MOTOR EXTERNO */}
        <Route
          path="/:lang/reservar"
          element={<Navigate to={BOOKING_URL} replace />}
        />

        <Route path="/:lang/contacto" element={<Contacto />} />

        {/* LEGAL */}
        <Route path="/:lang/privacidad" element={<Privacy />} />
        <Route path="/:lang/aviso-legal" element={<LegalNotice />} />
        <Route path="/:lang/cookies" element={<Cookies />} />

        <Route path="/:lang/*" element={<Home />} />

        {/* ================== ERRORES ================== */}

        <Route path="/401" element={<Unauthorized />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/500" element={<ServerError />} />

        {/* ================== LEGACY SIN IDIOMA ================== */}

        <Route path="/" element={<Navigate to="/es" replace />} />
        <Route path="/servicios" element={<Navigate to="/es/servicios" replace />} />
        <Route path="/restaurante" element={<Navigate to="/es/restaurante" replace />} />
        <Route path="/habitaciones" element={<Navigate to="/es/habitaciones" replace />} />
        <Route path="/historia" element={<Navigate to="/es/historia" replace />} />
        <Route path="/entorno" element={<Navigate to="/es/entorno" replace />} />

        {/*  Legacy reservar → externo */}
        <Route path="/reservar" element={<Navigate to={BOOKING_URL} replace />} />

        <Route path="/contacto" element={<Navigate to="/es/contacto" replace />} />
        <Route path="/admin" element={<Navigate to="/es/admin/login" replace />} />
        <Route path="/admin/login" element={<Navigate to="/es/admin/login" replace />} />
        <Route path="/privacidad" element={<Navigate to="/es/privacidad" replace />} />
        <Route path="/aviso-legal" element={<Navigate to="/es/aviso-legal" replace />} />
        <Route path="/cookies" element={<Navigate to="/es/cookies" replace />} />

        {/* REDIRECTS ANTIGUOS */}
        <Route path="/rooms" element={<Navigate to="/es/habitaciones" replace />} />
        <Route path="/area" element={<Navigate to="/es/entorno" replace />} />

        {/* 404 GLOBAL */}
        <Route path="*" element={<NotFound />} />

      </Routes>

      <CookieBanner />
      <Footer />
    </BrowserRouter>
  );
}